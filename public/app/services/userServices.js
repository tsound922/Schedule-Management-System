//Sending data to the users api
angular.module('userServices', [])
.factory('User',function ($http) {
	userFactory  = {};
	userFactory.create = function (regData) {
		return $http.post('/api/users', regData);
	}
	/*userFactory.all = function () {
		return $http.get('/api/user');
    }
    */
 /*   userFactory.activeAccount = function(token){
        return $http.put('/api/activate/' + token);
    }  
*/

    userFactory.sendUsername = function(userData) {
        return $http.get('/api/resetusername/' + userData);
    };
    
    userFactory.sendPassword = function(resetData) {
        return $http.put('/api/resetpassword', resetData);
    };
    
    userFactory.resetUser = function(token) {
        return $http.get('/api/resetpassword/' + token);
    };
    
    userFactory.savePassword = function(regData) {
        return $http.put('/api/savepassword', regData)
    }
    
    return userFactory;
});
