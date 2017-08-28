angular.module('authServices', [])
	.factory('Auth',function ($http) {
		var authFactory  = {};

		//send data to back end
		authFactory.login = function (loginData) {
			return $http.post('/api/authenticate', loginData);
		}
		return authFactory;
	})

.factory('AuthToken', function () {
	var authTokenFactory = {};
	return authTokenFactory;
});