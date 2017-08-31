// put the dependency in []
angular.module('loginController', ['authServices'])

.controller('loginCtrl', function (Auth, $timeout, $location) {
	var app = this;

	if(Auth.loggedIn()){
		console.log('Success: login already');
	}else {
		console.log('Falied: login failed');
	}

	this.doLogin = function (loginData) {
		app.loading = true;
		app.errorMsg = false;
		Auth.login(app.regData).then(function (data) {
			if (data.data.success) {
				app.loading = false;
				//Create successful message
				app.successMsg = data.data.message + '...Redirecting';
				//Redirect to home page
				$timeout(function () {
					$location.path('/about');
				}, 2000);

			} else {
				//create error message
				app.loading = false;
				app.errorMsg = data.data.message;
			}
		});
	};
});



