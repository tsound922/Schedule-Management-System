//obtain all the users and send it to front
angular.module('adminController', [])

    .controller('adminCtrl', function (User) {
        var app = this;
        app.names = '';
        app.show = false;


        //get all the users in user schema
        function getUsers() {
            User.getUsers().then(function (data) {
                //console.log(data)
                app.users = data.data;
            });
        }

        getUsers();
        //provide the filter value
        app.showByName = function (name) {
            app.err = false;
            if (name != '') {
                app.names = name;
                app.show = false;
            } else {
                app.show = true;
                app.err = 'Please provide the valid name';
            }
        }

        //delete the content of schedule from users
        app.deleteUser = function (username) {
            User.deleteUser(username).then(function (data) {
                if (data.data.success) {
                    //console.log(data.data)
                    getUsers();
                } else {
                    app.err = data.data.message;
                }
            })
        }
    })
