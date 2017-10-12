angular.module('scheduleCtrl',['scheduleService'])

.controller('ScheduleController',function ($http, $location, $timeout, Schedule) {
    var app = this;
    
    app.addSchedule = function (scheduleData) {
        app.loading = true;
        app.errorMsg = false;
        Schedule.create(app.scheduleData).then(function (data) {
                //console.log(data.data);
            if (data.data.success) {
                app.loading = false;
                //Create successful message
                app.successMsg = data.data.message + '......Updating and redirecting';
                //Redirect to home page
                $timeout(function () {
                    $location.path('/home');
                }, 2000);

            } else {
                //create error message
                app.loading = false;
                app.errorMsg = data.data.message;
            }
        })
    }
});


