'use strict'

var User = require('../models/user');

/***************************************
*
*
*	Users functions
*
*
***************************************/

//Request body cuando hacemos un post o path
//Requuest params cuando hacemos peticion desde la url
exports.getUsers = function(req,res){
	/**
	* Return a list of KIO user
	*
	* returns User
	**/
	User.find({}).sort({f_Name: 1}).exec(function(err, data){
		res.send({data: data});
	});
}
exports.getUserById = function(req,res,next){
	/**
	* Return a KIO user information
	*
	* id Long Id of the user to retrive information
	* returns User
	**/
	User.findById(req.params.id).exec((err, user) => {
		if(err){
			next({status: 200, message: 'User doesnt exists.'});
		} else {
			if(user)
				res.send(user);
			else{
				next({status: 200, message: 'Error retriving user.'});
			}
		}
	});
	
}
exports.addUser = function(req,res,next){
	/**
	* Creates a new user.
	*
	* user User 
	* returns User
	**/
	var user = new User();
	Object.keys(req.body).forEach(key => { 
        user[key] = req.body[key];
	});
	user.save( (err, userStored) => {
		if(err){
			console.log(err);
			next({status: 200, message: 'User already exists.'});
		} else {
			if(userStored)
				res.send(userStored);
			else{
				next({status: 200, message: 'Error saving user.'});
			}
		}
	});
}
exports.updateUserById = function(req,res,next){
	/**
	* Delete KIO user.
	*
	* id Long ID of th KIO user to update
	* returns User
	**/
	var user = {};
	Object.keys(req.body).forEach( (key) => {
		user[key] = req.body[key];
	} );
	
	User.findByIdAndUpdate(req.params.id, {$set: user}, {new: true} ).exec((err, user) => {
		if(err){
			next({status: 200, message: 'Error updating user.'});
		} else {
			if(user)
				res.send(user);
			else{
				next({status: 200, message: 'Error updating user.'});
			}
		}
	});
}
exports.deleteUserById = function(req,res,next){
	/**
	* Delete user.
	*
	* id Long ID of th KIO user to delete
	* returns User
	**/
	User.remove({_id:req.params.id}, (err, userRemoved) => {
		if(err){
			next({status: 200, message: 'User doesnt exists.'});
		} else {
			if(userRemoved)
				res.send(userRemoved);
			else{
				next({status: 200, message: 'Error deleting user.'});
			}
		}
	});
	
}
exports.addUserDevice = function(req,res,next){
	var device = req.body;
	//Buscar a los usuario
	User.findByIdAndUpdate(req.params.id_usuario, {$push: {devices: device}}, {new: true} ).exec((err, user) => {
			if(err){ console.log(err);
				next({status: 200, message: 'Error adding device.'});
			} else {
				if(user)
					res.send(device);
				else{
					next({status: 200, message: 'Error ading device.'});
				}
			}
		});
}
exports.deleteUserDevice = function(req,res,next){
	User.findByIdAndUpdate(req.params.id_usuario,{$pull: {devices: {_id:req.params.id}}},{ new: true }).exec((err, user) => {
		if(err){ console.log(err);
			next({status: 200, message: 'Error deleting device.'});
		} else {
			if(user)
				res.send(user);
			else{
				next({status: 200, message: 'Error deleting device.'});
			}
		}
	});	
}
exports.UpdateUserDevice = function(req,res,next){
	User.update({'devices._id': req.params.id}, {$set: {'devices.$.marca': 'QWERTY'}}).exec((err, user) => {
		if(err){ console.log(err);
			next({status: 200, message: 'Error updatin device.'});
		} else {
			if(user)
				res.send(user);
			else{
				next({status: 200, message: 'Error updating device.'});
			}
		}
	});	
}