var User = require('../models/user');
var jwt = require('jsonwebtoken');
var Schedule = require('../models/schedule');
var security = 'security';
var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');

module.exports = function (router) {
  
    var options = {
        auth: {
            api_user: 'neo_mai_kuraki',
            api_key: 'Aip12345'
        }
    }

    var client = nodemailer.createTransport(sgTransport(options));
//User register
    router.post('/users', function (req, res) {
        var user = new User();
        user.username = req.body.username;
        user.password = req.body.password;
        user.email = req.body.email;

        if (req.body.username == null || req.body.username == '' | req.body.password == null || req.body.password == '' || req.body.email == null || req.body.email == '') {
            //res.send('Ensure username,email and password were provided');
            res.json({success: false, message: 'Ensure username,email and password were provided'});
        } else {
            user.save(function (err) {
                if (err) {
                    res.json({success: false, message: 'Username or email already exist.'});
                } else {
                    res.json({success: true, message: 'User created!'});
                }
            });
        }








    
    
//localhost:8000/api/users
//User register
	router.post('/users', function(req, res){
	var user = new User();
	user.username = req.body.username;
	user.password = req.body.password;
	user.email = req.body.email;
    user.temporarytoken = jwt.sign({id: user._id, username: user.username, email:user.email, admin:user.admin}, security, {expiresIn: '12h'});
	if(req.body.username == null || req.body.username == '' |req.body.password ==null|| req.body.password =='' || req.body.email ==null || req.body.email ==''){
		//res.send('Ensure username,email and password were provided');
		res.json({ success: false, message: 'Ensure username,email and password were provided'});
	}else{
		user.save(function (err) {
			if(err){
				//res.send('Username or email already exist.');
				res.json({success:false, message:'Username or email already exist.'});
			}else{
                //sending confirmation email using sendgrid
                var email = {
                from: 'no-reply@easyschedule.com',
                to: user.email,
                subject: 'Welcome to Easy Schedule.',
                text: 'Welcome ' + user.username,
                html: 'Hello ' + user.username + ',<br><br> Thank you for registering.' 
                };

                client.sendMail(email, function(err, info){
                    if (err ){
                        console.log(err);
                    }
                    else {
                        console.log('Message sent: ' + info.response);
                    }
                });
				//res.send('User created!');
				res.json({success:true,message: 'Congratulations! You are registered!'});
			}
		});
	}


    });

    //User login check and put the data in the json package
    router.post('/authenticate', function (req, res) {
        User.findOne({username: req.body.username}).select('email username password admin').exec(function (err, user) {
            if (err) throw err;
            if (!user) {
                res.json({success: false, message: 'Login failed, please check your input'});
            }
            else {
                if (req.body.password != null) {
                    var validatePassword = user.comparePassword(req.body.password);
                    if (!validatePassword) {
                        res.json({success: false, message: 'Invalid password or username'})
                    } else {
                        var admin = user.admin;
                        var token = jwt.sign({
                            id: user._id,
                            username: user.username,
                            email: user.email,
                            admin: user.admin
                        }, security, {expiresIn: '12h'});
                        res.json({success: true, message: "Login Successful!", token: token, admin: admin});
                    }

                } else {
                    res.json({success: false, message: 'Please input your password'});
                }


            }
        });
    });
     
// Retrieve username    
    router.get('/resetusername/:email', function(req,res){
        User.findOne({ email: req.params.email }).select('email name username').exec(function(err, user){
            if(err){
                res.json({ success: false, message: err });
            } else {
                if (!user){
                    res.json({ success: false, message: 'Email not found.'});
                } else {
                    var email = {
                        from: 'no-reply@easyschedule.com',
                        to: user.email,
                        subject: 'This is your username.',
                        text: 'Hello ' + user.username,
                        html: 'Hello ' + user.username + ',<br><br> This is your username. Keep it well.' 
                    };

                    client.sendMail(email, function(err, info){
                        if (err) console.log(err);
                    });
                    res.json({ success: true, message: 'Username has been sent to email.' }); 
                }
            }
        });
    });
    
// Send reset password link
    
    router.put('/resetpassword', function(req,res){
        User.findOne({ username: req.body.username }).select('username active email resettoken name').exec(function(err, user) {
			if (err) throw err;
			if (!user) {
                res.json({ success: false, message: 'Username was not found' }); 
//			} else if (!user.active) {
//				res.json({ success: false, message: 'Account has not yet been activated' }); 
			} else {
				user.resettoken = jwt.sign({ username: user.username, email: user.email }, security, { expiresIn: '24h' }); 
				user.save(function(err) {
					if (err) {
						res.json({ success: false, message: err }); 
					} else {
						var email = {
							from: 'no-reply@easyschedule.com',
							to: user.email,
							subject: 'Reset Your Password',
							text: 'Hello ' + user.username + ', You requested a password reset link. Please click on the link below to reset your password:<br><br><a href="http://localhost:8000/reset/' + user.resettoken,
							html: 'Hello<strong> ' + user.username + '</strong>,<br><br>You requested a password reset link. Please click on the link below to reset your password:<br><br><a href="http://localhost:8000/reset/' + user.resettoken + '">http://localhost:8000/reset/</a>'
						};
						client.sendMail(email, function(err, info) {
							if (err) console.log(err);
						});
						res.json({ success: true, message: 'Please check your e-mail for password reset link' }); 
					}
				});
			}
		});
    });
    
    router.get('/resetpassword/:token', function(req, res) {
		User.findOne({ resettoken: req.params.token }).select().exec(function(err, user) {
			if (err) throw err; 
			var token = req.params.token;
			jwt.verify(token, security, function(err, decoded) {
				if (err) {
					res.json({ success: false, message: 'Password link has expired' }); 
				} else {
					if (!user) {
						res.json({ success: false, message: 'Password link has expired' }); 
					} else {
						res.json({ success: true, user: user }); 
					}
				}
			});
		});
	});
    
    router.put('/savepassword', function(req, res) {
		User.findOne({ username: req.body.username }).select('username email name password resettoken').exec(function(err, user) {
			if (err) throw err;
			if (req.body.password == null || req.body.password == '') {
				res.json({ success: false, message: 'Password not provided' });
			} else {
				user.password = req.body.password; 
				user.resettoken = false;  
				user.save(function(err) {
					if (err) {
						res.json({ success: false, message: err });
					} else {
						var email = {
							from: 'no-reply@easyschedule.com',
							to: user.email,
							subject: 'Password Has Been Reset',
							text: 'Hello ' + user.username + ', You are receiving this email is because your EasySchedule password has been reset.',
							html: 'Hello<strong> ' + user.username + '</strong>,<br><br>You are receiving this email is because your EasySchedule password has been reset.'
						};
						client.sendMail(email, function(err, info) {
							if (err) console.log(err);
						});
						res.json({ success: true, message: 'Password has been reset!' });
					}
				});
			}
		});
	});
	//this module is to filter the user who does not have a valid token, it will deny the access if the token is not given or invalid
	router.use(function (req,res,next) {
		var token = req.body.token || req.param('token') || req.body.query || req.headers['x-access-token'];

        if (token) {
            //verify the token
            jwt.verify(token, security, function (err, decoded) {
                if (err) {
                    res.json({success: false, message: 'Invalid Token!'});
                } else {
                    req.decoded = decoded;
                    next();
                }
            });
        } else {
            res.json({success: false, message: 'No token provided'});
        }
    });

    
    router.post('/me', function (req,res) {
        res.send(req.decoded);
    });

	//Create the schedule
	router.route('/schedule')
		.post(function (req,res) {
			var schedule = new Schedule({
				creator: req.decoded.id,
				content: req.body.content,
			});
			schedule.save(function (err) {
				if(err){
					res.send(err);
					return
				}
				res.json({success:true, message:"New schedule is added"});

            });
            schedule.save(function (err) {
                if (err) {
                    res.send(err);
                    return
                }
                res.json({success: true, message: "New schedule is added", creator: req.decoded.username});
            });
        });
    //list all the schedules in the database
    router.get('/list', function (req, res) {
        Schedule.find({}, function (err, schedules) {
            if (err) throw err;
            if (!schedules) {
                res.json({success: false, message: 'No schedule found'});
            } else {
                res.json(schedules);
            }
        })
    });
    //delete the schedule based on the id in schedule collection
    router.delete('/list/:_id', function (req, res) {
        Schedule.findOneAndRemove({_id: req.params._id}, function (err) {
            if (err) throw err;
            res.json({success: true, message: 'Content deleted'});
        })
    });
    //list all the users
    router.get('/listusers/', function (req, res) {
        User.find({}, function (err, users) {
            if (err) throw err;
            if (!users) {
                res.json({success: false, message: 'No users found'})
            } else {
                res.json(users);
            }
        })
    });
    router.delete('/listusers/:username', function (req, res) {
        User.findOneAndRemove({username: req.params.username}, function (err) {
            if (err) throw err;
            res.json({success: true, message: 'User deleted'})
        })


    });
    return router;
}

