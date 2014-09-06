/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
var bcrypt = require('bcryptjs');
module.exports = {

  	attributes: {


	  	comparePassword:function(password, done) {
	  		console.log('comparing');

	  		if(password === this.password){
	  			console.log('ok');
	  			done('', true);
	  		}else
	  		{
	  			done('erreur de password', false);
	  		}

		  // bcrypt.compare(password, this.password, function(err, isMatch) {
		  //   done(err, isMatch);
		  // });
		}
  	}
};

