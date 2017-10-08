angular.module('emailController', ['userServices'])

    .controller('usernameCtrl', function(User){
    
        app = this;
    
        app.sendUsername = function(userData){
            User.sendUsername(app.userData.email).then(function(data){
                console.log(data);
            });
        };
    });