//define the controller for user edit
angular.module('editCtrl',[])
.controller('editController', function ($scope, $routeParams, User) {
    var app = this;
    app.showUser = true;
    app.showEmail = false;

    User.getUser($routeParams.id).then(function(data) {
        console.log(data)
        // Check if the user's _id was found in database
        if (data.data.success) {
            $scope.newEmail = data.data.user.email;
            $scope.newUsername = data.data.user.username;
        } else {
            app.errorMsg = data.data.message; // Set error message
        }
    });
    app.usernameEdit = function () {
        app.showUser = true;
        app.showEmail = false;
    }
    app.emailEdit = function () {
        app.showUser = false;
        app.showEmail = true;
    }

    app.updateUsername = function (newUsername) {

    }


});