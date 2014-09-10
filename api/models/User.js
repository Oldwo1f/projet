/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
var bcrypt = require('bcryptjs');
module.exports = {
	schema:true,
  	attributes: {
  		email : {type:'string',required:true,email:true},
        password : {type:'string',required:true},
        name : {type:'string',defaultTo:null},
        phone : {type:'string',defaultTo:null},
        fb : {type:'string',defaultTo:null},
        twitter : {type:'string',defaultTo:null},
        gplus : {type:'string',defaultTo:null},
        role : {type:'string',required:true},
        images: {
            collection: 'image',
            via: 'user'
        },
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

	},
	beforeUpdate:function(values,cb) {
		console.log('BEFORE UPDATE');
		
		if(values.comfirmpassword)
		{
		var salt = bcrypt.genSaltSync(10);
		var hash = bcrypt.hashSync(values.password, salt);
		values.password = hash;
		}
		cb();

	}
};

