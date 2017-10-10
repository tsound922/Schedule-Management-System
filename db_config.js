//Configuration of MongoDB connection
module.exports = function () {
    var mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost:27017/tutorial', function (err) {
        if (err) {
            console.log('cannot connect! ' + err);
        }
        else {
            console.log('Successfully connected to database');
        }
    });
}