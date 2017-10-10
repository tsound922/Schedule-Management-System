angular.module('listController', [])

    .controller('listCtrl', function (Schedule) {
        var app = this;
        app.name = '';
        app.show = false;

        function getApply() {
            Schedule.getApplies().then(function (data) {
                app.applies = data.data;
                 console.log(data.data);
            });
        }

        getApply();
        app.showByName = function (name) {
            app.err = false;
            if (name != '') {
                app.name = name;
                app.show = false;
            } else {
                app.show = true;
                app.err = 'Please provide the valid name';
            }
        }
        //delete the content of schedule from users
     app.deleteApply = function (ID) {
         Schedule.deleteApply(ID).then(function (data) {
             if(data.data.success){
                 getApply();
             }else{
                 console.log(data.data)
                 app.err = data.data.message;
             }
         })
     }
    })