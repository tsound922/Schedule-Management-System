// put the dependency in []
angular.module('loginController', ['authServices'])

.controller('loginCtrl', function (Auth, $timeout, $location,$rootScope) {
	var app = this;

	$rootScope.$on('$routeChangeStart',function () {
        if(Auth.loggedIn()){
            console.log('Success: login already');
            Auth.getUser().then(function (data) {
                console.log(data.data.username);
                app.username = data.data.username;
            })
        }else {
            console.log('Falied: login failed');
            app.username = '';
        }
	});

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
					$location.path('/home');
					app.loginData = '';
					app.successMsg = false;
				}, 2000);

			} else {
				//create error message
				app.loading = false;
				app.errorMsg = data.data.message;
			}
		});
	};
	this.logout = function () {
		Auth.logout();
		$location.path('/logout');
		$timeout(function () {
			$location.path('/');
        }, 2000);
    };
});



