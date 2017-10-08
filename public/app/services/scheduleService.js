angular.module('scheduleService',[])

    .factory('Schedule',function ($http) {
      var scheduleFactory = {};

        scheduleFactory.create = function (scheduleData) {
            return $http.post('/api/schedule',scheduleData);
        }
        scheduleFactory.getApplies = function () {
            return $http.get('/api/list');
        }
        return scheduleFactory;
    });
    

    
