angular.module('commendController',[])
	.controller('recommCtrl',function ($http){
	this.recommAdd = function(recommData, userName){
		console.log('Test: recommend and name are submitted');
		console.log(this.recommData, this.userName);
		//check about the recommendation message and name

	}
	}

//This js is try to put the recommendation into mongoDB, work as a controller
