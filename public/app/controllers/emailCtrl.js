angular.module('emailController', ['userServices'])

    .controller('emailCtrl', function($routeParams, User) {
        
        User.activeAccount($routeParams.token).then(function(data) {
            console.log(data);
        });
    
});