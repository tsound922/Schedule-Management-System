//Configuration of MongoDB connection
module.exports = function () {
    var mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost/aip2017', function (err) {
        if (err) {
            console.log('cannot connect! ' + err);
        }
        else {
            console.log('Successfully connected to database');
        }
    });
}