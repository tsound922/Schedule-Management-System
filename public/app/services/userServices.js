//userServices is the name of the augular module you made, '[]' means dependencies
angular.module('userServices', [])
	//The name of factory is User
	.factory('User',function ($http) {
		userFactory  = {};


		userFactory.create = function (regData) {
			return $http.post('/api/users', regData);
		}
		
		return userFactory;
	});
