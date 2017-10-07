angular.module('userControllers', ['userServices'])
	.controller('regCtrl', function ($http, $location, $timeout, User) {

		var app = this;

		app.regUser = function (regData) {
			app.loading = true;
			app.errorMsg = false;
			User.create(app.regData).then(function (data) {
					if (data.data.success) {
						app.loading = false;
						//Create successful message
						app.successMsg = data.data.message + '...Redirecting';
						//Redirect to home page
						$timeout(function () {
							$location.path('/home');
						}, 2000);

					} else {
						//create error message
						app.loading = false;
						app.errorMsg = data.data.message;
					}
				});
		};
	});

//router.post('/users', function(req, res){
