//Sending data to the users api
angular.module('userServices', [])
.factory('User',function ($http) {
	userFactory  = {};
	userFactory.create = function (regData) {
		return $http.post('/api/users', regData);
	};
	userFactory.getUsers = function () {
		return $http.get('/api/listusers');
    }
    userFactory.deleteUser = function (user) {
		return $http.delete('/api/listusers/' + user);
    }
	return userFactory;
});
