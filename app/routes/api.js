var User = require('../models/user');
var jwt = require('jsonwebtoken');
var Schedule = require('../models/schedule');
var security = 'security';

var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');

module.exports = function (router) {

    //configuration of nodemailer-sendgrid
    var options = {
        auth: {
            api_user: 'tsound922',
            api_key: 'Wzy890922',
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
    //provide a email with a temporary token for user
    router.put('/reset', function (req, res) {
        User.findOne({username: req.body.username}).select('username email temporary').exec(function (err, user) {
            if (err) throw err;
            if (!user) {
                res.json({success: false, message: 'This username is not available'});
            }
            else {
                user.temporary = jwt.sign({username: user.username, email: user.email}, security, {expiresIn: '12h'});
                user.save(function (err) {
                    if (err) {
                        res.json({success: false, message: err});
                    }
                    else {
                        var email = {
                            //sometimes this email function is not working with MSN mail, but it works quite weill with gmail.
                            from: 'noreply@easyschedule.com',
                            to: user.email,
                            subject: 'The request for reset your password',
                            text: 'Here is you reset link ' +
                            '<a href="https://aipeasyschedule.herokuapp.com/reset/' + user.temporary + '">Reset you password</a>',
                            html: 'Dear ' + req.body.username + ', you have requested a reset password. Please click on the link to reset your password:<br>' +
                            '<a href="https://https://aipeasyschedule.herokuapp.com/reset/' + user.temporary + '">Reset Password</a>'
                        };

                        client.sendMail(email, function (err, info) {
                            if (err) {
                                console.log(err);
                            }
                            else {
                                console.log('Message sent: ' + info.response);
                            }
                        });
                        res.json({
                            success: true,
                            message: 'A mail for password reset is sending to your email, please check it.'
                        });
                    }
                });
            }
        });
    });
    //Check the token which is only for the users' email
    router.get('/reset/:token', function (req, res) {
        User.findOne({temporary: req.params.token}).select().exec(function (err, user) {
            if (err) console.log(err);
            var temporaryToken = req.params.token;
            jwt.verify(temporaryToken, security, function (err, decoded) {
                if (err) {
                    res.json({success: false, message: 'The reset link has expired'});
                } else {
                    res.json({success: true, user: user});
                }
            });
        });
    });
    //Update the password
    router.put('/passwordupdate', function (req, res) {
        User.findOne({username: req.body.username}).select('username email password temporary').exec(function (err, user) {
            if (err) throw err;
            if (req.body.password != null && req.body.password != '') {
                user.password = req.body.password;
                user.temporary = false;
                user.save(function (err) {
                    if (err) {
                        res.json({success: false, message: err});
                    } else {
                        res.json({success: true, message: 'Your password has been reset'})
                    }
                });
            } else {
                res.json({success: false, message: 'Please provide valid password'})
            }

        })
    });
    //this module is to filter the user who does not have a valid token, it will deny the access if the token is not given or invalid
    router.use(function (req, res, next) {
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
    router.post('/me', function (req, res) {
        res.send(req.decoded);
    });

    //Create and get the schedule
    router.route('/schedule')
        .post(function (req, res) {
            var schedule = new Schedule({
                creator: req.decoded.username,
                refId: req.decoded.id,
                content: req.body.content,
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
    //delete the user
    router.delete('/listusers/:username', function (req, res) {
        User.findOneAndRemove({username: req.params.username}, function (err) {
            if (err) throw err;
            res.json({success: true, message: 'User deleted'})
        })

    });
    //locate the user you want to update

    router.get('/edit/:id', function (req, res) {
        var editUser = req.params.id;
        User.findOne({_id: editUser}, function (err, user) {
            if (err) {
                throw err;
            }
            if (!user) {
                res.json({success: false, message: 'No user found'});
            }
            else {
                res.json({success: true, user: user});
            }
        });

    });


    return router;
}

