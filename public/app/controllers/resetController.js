angular.module('resetCtrl', ['userServices'])

    .controller('passwordCtrl', function (User, $location, $timeout) {
        app = this;
        app.sendPassword = function (resetData, valid) {
            app.error = false;

            if (valid) {
                User.sendPassword(app.resetData).then(function (data) {
                    app.loading = false;

                    if (data.data.success) {
                        // console.log(data)
                        app.success = data.data.message;
                        //If the mail is send to users successfully, it will redirect to login page after 2 seconds
                        $timeout(function () {
                            $location.path('/home');
                            app.resetData = '';
                            app.success = false;
                        }, 2000);
                    }
                    else {
                        app.error = data.data.message;
                    }
                });
            }
            else {
                app.error = 'The username is not available';
            }
        };
    })
    .controller('resetController', function ($routeParams, User) {
        var app = this;
        app.expired = true;
        app.error = false;
        User.resetPassword($routeParams.token).then(function (data) {

            if (data.data.success) {
                console.log(data)
                app.expired = false;
                app.success = 'Please enter your new password'
            } else {
                console.log(data)
                app.error = data.data.message;
            }
        })

        app.passwordUpdate = function (regData, $valid, confirmed) {
            app.error = false;
            if (valid && confirmed) {
                User.passwordUpdate(app.regData).then(function (data) {
                    if (data.data.success) {
                        app.success = data.data.message;
                    } else {
                        app.error = data.data.message;
                    }
                })
            }else{
                app.error = 'Password does not match'
            }
        }

    })
