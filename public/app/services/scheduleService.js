angular.module('scheduleService',[])

    .factory('Schedule',function ($http) {
      var scheduleFactory = {};

        scheduleFactory.createSchedule = function (scheduleData) {
            return $http.post('/api',scheduleData);
        }
        scheduleFactory.getSchedule = function () {
            return $http.get('/api');
        }
        return scheduleFactory;
    })
    

    
