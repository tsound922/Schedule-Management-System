angular.module('userControllers',[])
.controller('regCtrl',function ($http) {

	this.regUser = function(regData){
		console.log('submitted');
		console.log(this.regData);
		$http.post('/api/users',this.regData).then(function (data) {
			console.log(data);
		});
	};
});

//router.post('/users', function(req, res){
