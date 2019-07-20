'use strict'

var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

mongoose.connect('mongodb://localhost:27017/meanstack', (err,res) => {
	if(err){
		throw err;
	} else {
		console.log('connected');
	}
})

/* GET home page. */
router.get('/', function(req, res, next) {
	res.status(200).send({message:'welcome to the API'});
});


//modules
require('./users')(router);
require('./locations')(router)

module.exports = router;
