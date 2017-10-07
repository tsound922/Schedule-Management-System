angular.module('listController',[])

.controller('listCtrl',function (Schedule) {
    var app = this;
    Schedule.getApplies().then(function (data) {
        app.applies = data.data;
        console.log(data.data);
    })
})