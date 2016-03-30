'use strict';

let mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let MlsLookup = new Schema({
    mlsId: {
        type: Number,
        unique: true,
        index: true
    },
    area: {
        type: Schema.Types.ObjectId,
        ref: 'Area'
    }
});

module.exports = mongoose.model('MlsLookup', MlsLookup);
