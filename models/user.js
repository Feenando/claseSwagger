'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
    f_Name:{type:String,required: true},
    l_Name: {type:String,required: true},
    email: {type:String,required: true, unique:true},
    birth_date: {type:Date,required: true},
    n_user: {type:String,required: true},
    tel: {type:Number},
    devices: [new Schema({
        marca : {type: String, required: true},
        n_serie: {type: String, required: true, unique:true},
        modelo: {type: String, required: true},
        f_asign: {type: Date, required: true},
    })],
    extra_data: {type: Schema.Types.Mixed},
    create_at:{type:Date,default:Date.now},
    active:{type: Boolean, default:true},
   // location:{type: Schema.ObjectId,required:true, ref:"Location"},
   // _puesto:{type: Schema.ObjectId,required:true, ref:"Puesto"},
   //_jefe:{type: Schema.ObjectId,required:false, ref:"User"}

});

module.exports = mongoose.model('User',UserSchema);