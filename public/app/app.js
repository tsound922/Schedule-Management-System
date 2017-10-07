//the app(modules) you use. Like a app functions/modules index
/*---------------------
* This fill will map all the controller and modules using in the system
* ---------------------*/
angular.module('userApp',['appRoutes','userControllers','userServices','ngAnimate','loginController','authServices','scheduleService','scheduleCtrl'])

.config(function ($httpProvider) {
    $httpProvider.interceptors.push('AuthIntercept');
});
