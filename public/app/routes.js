//router for all the pages with injection
angular.module('appRoutes', ['ngRoute'])
	.config(function ($routeProvider, $locationProvider) {
		$routeProvider
			.when('/home', {
				templateUrl: 'app/views/pages/home.html',
				controller:'ScheduleController'

			})
			.when('/about', {
				templateUrl: 'app/views/pages/about.html'
			})
			.when('/register', {
				templateUrl: 'app/views/pages/users/register.html',
				controller:'regCtrl',
				controllerAs:'register'
			})
            .when('/login', {
                templateUrl: 'app/views/pages/users/login.html'
            })
            .when('/admin', {
                templateUrl: 'app/views/pages/users/admin.html'
            })
			.when('/reset', {
            templateUrl: 'app/views/pages/users/reset.html'
        	})
            .when('/profile', {
                templateUrl: 'app/views/pages/users/profile.html'
            })
            .when('/schedule', {
                templateUrl: 'app/views/pages/users/schedule.html',
				controller:'listCtrl',
				controllerAs:'listall'
            })

			      .when('/profile', {
				        templateUrl: 'app/views/pages/users/profile.html'
			      })
			      .when('/logout',{
				        templateUrl: 'app/views/pages/users/logout.html'
			      })
            .when('/resetusername', {
                templateUrl: 'app/views/pages/users/reset/username.html',
                controller: 'usernameCtrl',
                controllerAs: 'username',
                authenticated: false
        	  })
            .when('/resetpassword', {
                templateUrl: 'app/views/pages/users/reset/password.html',
                controller: 'passwordCtrl',
                controllerAs: 'password',
                authenticated: false
        	})
            .when('/reset/:token', {
                templateUrl: 'app/views/pages/users/reset/newpassword.html',
                controller: 'resetCtrl',
                controllerAs: 'reset',
                authenticated: false
        	})
			.otherwise({redirectTo: '/'});
                $locationProvider.html5Mode({
                enabled: true,
			    requireBase: false
		});
	});
