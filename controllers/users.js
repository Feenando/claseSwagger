'use strict'

var User = require('../models/user');
var getSlug = require('speakingurl');
var config = require('config');

/***************************************
*
*
*	Users functions
*
*
***************************************/

exports.getUsers = function(req,res){
	/**
	* Return a list of KIO user
	*
	* returns User
	**/
	User.find({}).sort({name: 1}).exec(function(err, data){
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
	var params = req.body;

	
	user.save( (err, userStored) => {
		if(err){
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
	var params = req.body;
	if(params.email)
		user.email = params.email;
	if(params.name)
		user.name = params.name;
	if(params.position)
		user.position = params.position;
	if(params.location)
		user.location = params.location;
	if(params._location)
		user._location = params._location;
	if(params.area)
		user.area = params.area;
	if(params.avatar)
		user.avatar = params.avatar;
	//if(params.admin)
		//user.admin = params.admin;

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

