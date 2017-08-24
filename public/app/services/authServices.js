angular.module('authServices', [])
	.factory('Auth',function ($http) {
		var authFactory  = {};

		//send data to back end
		authFactory.login = function (regData) {
			return $http.post('/api/users', regData);
		}
		return userFactory;
	});