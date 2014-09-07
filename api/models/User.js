/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
var bcrypt = require('bcryptjs');
module.exports = {

  	attributes: {
  		email : {type:'string',required:true,email:true},
        password : {type:'string',required:true},
        name : {type:'string',defaultTo:null},
        role : {type:'string',required:true},

	  	comparePassword:function(password, done) {
		  bcrypt.compare(password, this.password, function(err, isMatch) {
		    done(err, isMatch);
		  });
		}
  	},
	beforeCreate:function(values,cb) {

		var salt = bcrypt.genSaltSync(10);
		var hash = bcrypt.hashSync(values.password, salt);
		console.log(values);
		values.password = hash;
		cb();

	}
};

