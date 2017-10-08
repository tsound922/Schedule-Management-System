var User =  require('../models/user');
var jwt = require('jsonwebtoken');
var Schedule = require('../models/schedule');
var security = 'security';
module.exports = function(router){

//User register
	router.post('/users', function(req, res){
	var user = new User();
	user.username = req.body.username;
	user.password = req.body.password;
	user.email = req.body.email;

	if(req.body.username == null || req.body.username == '' |req.body.password ==null|| req.body.password =='' || req.body.email ==null || req.body.email ==''){
		//res.send('Ensure username,email and password were provided');
		res.json({ success: false, message: 'Ensure username,email and password were provided'});
	}else{
		user.save(function (err) {
			if(err){
				res.json({success:false, message:'Username or email already exist.'});
			}else{
				res.json({success:true,message: 'User created!'});
			}
		});
	}

});

	//User login check and put the data in the json package
	router.post('/authenticate', function (req, res) {
		User.findOne({ username: req.body.username}).select('email username password admin').exec(function (err, user) {
			if (err) throw err;
			if(!user){
				res.json({success: false, message:'Login failed, please check your input'});
			}
			else{
                if(req.body.password != null){
                    var validatePassword = user.comparePassword(req.body.password);
                    if(!validatePassword){
                        res.json({success: false, message: 'Invalid password or username'})
                    }else{
                    	var admin = user.admin;
                        var token = jwt.sign({id: user._id, username: user.username, email:user.email, admin:user.admin}, security, {expiresIn: '12h'});
                        res.json({success:true, message:"Login Successful!", token: token,admin: admin});
                    }

                }else{
                    res.json({success: false, message: 'Please input your password'});
				}

			}
		});
	});
	//this module is to filter the user who does not have a valid token, it will deny the access if the token is not given or invalid
	router.use(function (req,res,next) {
		var token = req.body.token || req.param('token') || req.body.query || req.headers['x-access-token'];

		if(token){
			//verify the token
			jwt.verify(token, security, function (err,decoded) {
				if(err){
                    res.json({success: false, message:'Invalid Token!'});
				} else{
					req.decoded = decoded;
					next();
				}
            });
		}else{
			res.json({success: false,message: 'No token provided'});
		}
    });
    router.post('/me', function (req,res) {
        res.send(req.decoded);
    });

	//Create and get the schedule
	router.route('/schedule')
		.post(function (req,res) {
			var schedule = new Schedule({
				creator: req.decoded.username,
				refId: req.decoded.id,
				content: req.body.content,
			});
			schedule.save(function (err) {
				if(err){
					res.send(err);
					return
				}
				res.json({success:true, message:"New schedule is added",creator: req.decoded.username});
            });
        });
    router.get('/list',function (req,res) {
        Schedule.find({},function (err,schedules) {
            if(err) throw err;
            if(!schedules){
                res.json({success: false, message: 'No schedule found'});
            }else{
                res.json(schedules);
            }
        })
    })




	return router;
}

