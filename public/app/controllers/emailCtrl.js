angular.module('emailController', ['userServices'])

    .controller('usernameCtrl', function(User){
    
        app = this;
    
        app.sendUsername = function(userData, valid){
            app.erroMsg = false;
            app.loading = true;
            app.disabled = true;
            
            if (valid) {
                User.sendUsername(app.userData.email).then(function(data){  
                    app.loading = false;
                    if (data.data.success) {
                        app.successMsg = data.data.message; 
                    } else {
                        app.disabled = false; 
                        app.errorMsg = data.data.message; 
                    }
                });
            } else {
                app.disabled = false; 
                app.loading = false; 
                app.errorMsg = 'Please enter a valid e-mail'; 
            }
        };
    })

    .controller('passwordCtrl', function(User){

        app = this;

        app.sendPassword = function(resetData, valid) {
            app.errorMsg = false;
            app.loading = true;
            app.disabled = true;

            if (valid) {
                User.sendPassword(app.resetData).then(function(data) {
                    app.loading = false;
                    if (data.data.success) {
                        app.successMsg = data.data.message; 
                    } else {
                        app.disabled = false;
                        app.errorMsg = data.data.message; 
                    }
                });
            } else {
                app.disabled = false; 
                app.loading = false;
                app.errorMsg = 'Please enter a valid username';  
            }
        };
    });