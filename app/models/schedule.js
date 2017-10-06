var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ScheduleSchema = new Schema({

    schedule:{type: Schema.Types.ObjectId, ref: 'User'},
    content: String,
    created: {type:Date, default: Date.now }
});

module.exports = mongoose.model('Schedule', ScheduleSchema);