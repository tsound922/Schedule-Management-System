//Configuration of MongoDB connection
module.exports = function () {
    var mongoose = require('mongoose');
    mongoose.connect('mongodb://tsound922:wzy890922@ds117615.mlab.com:17615/aip2017', function (err) {
        if (err) {
            console.log('cannot connect! ' + err);
        }
        else {
            console.log('Successfully connected to database');
        }
    });
}