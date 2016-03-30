'use strict';

let mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let Area = new Schema({
    services: {
        type: [Schema.Types.ObjectId],
        ref: 'Service'
    }
});

module.exports = mongoose.model('Area', Area);
