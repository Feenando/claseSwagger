'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
	email : {type : String, required: true, unique: true},
    name : {type : String, required: true},
    position : {type : String},
    location : {type : String},
    avatar : {type : String, default: 'http://escucha.future.com.mx/assets/img/avatars/noavatar.png'},
    devices: [ {type : String} ],
    admin: { type: Boolean, default: false },
    keywe: { type: Schema.Types.Mixed },
    _location : { type: Schema.ObjectId, ref: 'Location' },
    area : {type : String},
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User',UserSchema);