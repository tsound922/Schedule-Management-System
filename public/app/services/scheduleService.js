angular.module('scheduleService',[])

    .factory('Schedule',function ($http) {
      var scheduleFactory = {};

        scheduleFactory.create = function (scheduleData) {
            return $http.post('/api/schedule',scheduleData);
        };
        scheduleFactory.getApplies = function () {
            return $http.get('/api/list');
        };
        scheduleFactory.deleteApply = function (ID) {
            return $http.delete('/api/list/' + ID);
        }
        return scheduleFactory;
    });
    

    
