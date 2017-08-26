var User =  require('../models/user');
var jwt = require('jsonwebtoken');
module.exports = function(router){
//localhost:8000/api/users
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
		User.findOne({ username: req.body.username}).select('email username password').exec(function (err, user) {
			if (err) throw err;

			if(!user){
				res.json({success: false, message:'Login failed, please check your input'});
			}else{
				var validatePassword = user.comparePassword(req.body.password);
				if(!validatePassword){
					res.json({success: false, message: 'Please input your password'})
				}else{
					res.json({success:true, message:"Login Successful!"});
				}
			}
		});
	});
	return router;
}

/*jwt.sign({
	data: ''
}, 'secret', {});
*/