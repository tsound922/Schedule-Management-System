//Sending data to the users api
angular.module('userServices', [])
    .factory('User', function ($http) {
        userFactory = {};
        userFactory.create = function (regData) {
            return $http.post('/api/users', regData);
        };
        userFactory.getUsers = function () {
            return $http.get('/api/listusers');
        };
        userFactory.deleteUser = function (user) {
            return $http.delete('/api/listusers/' + user);
        };
        userFactory.updateUser = function (userid) {
            return $http.get('/api/update/' + userid);
        };
        userFactory.getUser = function (id) {
            return $http.get('/api/edit/' + id);
        };

        return userFactory;
    });
