var User =  require('../models/user');
var jwt = require('jsonwebtoken');
var security = 'security';
module.exports = function(router){
//localhost:8000/api/users
//User register
	router.post('/user', function(req, res){
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
				//res.send('Username or email already exist.');
				res.json({success:false, message:'Username or email already exist.'});
			}else{
				//res.send('User created!');
				res.json({success:true,message: 'User created!'});
			}
		});
	}

});

	//User login route
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
                        var token = jwt.sign({username: user.username, email:user.email, admin:user.admin}, security, {expiresIn: '12h'});
                        res.json({success:true, message:"Login Successful!", token: token,admin: admin});
                    }

                }else{
                    res.json({success: false, message: 'Please input your password'});
				}

			}
		});
	});
	
	router.use(function (req,res,next) {
		var token = req.body.token || req.body.query || req.headers['x-access-token'];

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
	
	return router;
}

