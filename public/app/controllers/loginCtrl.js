// put the dependency in []
angular.module('loginController', ['authServices'])

.controller('loginCtrl', function (Auth, $timeout, $location,$rootScope) {
	var app = this;
	app.loaded = false;
	$rootScope.$on('$routeChangeStart',function () {
        if(Auth.loggedIn()){
            console.log('Success: login already');
            app.loggedIn = true;
            Auth.getUser().then(function (data) {
                //console.log(data.data);
                app.username = data.data.username;
                app.admin = data.data.admin;
                app.loaded = true;
            })
        }else {
            console.log('Falied: login failed');
            app.username = '';
            app.loggedIn = false;
            app.loaded = true;
        }
	});
	this.doLogin = function (loginData) {
		app.loading = true;
		app.errorMsg = false;
		Auth.login(app.regData).then(function (data) {
			if (data.data.success) {
				//console.log(data.data)
				app.loading = false;
				//Create successful message
				app.successMsg = data.data.message + '...Redirecting';
				//Redirect to home page
				$timeout(function () {
					if(data.data.admin == false){
						$location.path('/home');
                        app.loginData = '';
                        app.successMsg = false;
					}else{
                        $location.path('/admin');
                        app.loginData = '';
                        app.successMsg = false;
					}

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
        app.admin = false;
		$location.path('/logout');
		$timeout(function () {
			$location.path('/');
        }, 2000);
    };
});



