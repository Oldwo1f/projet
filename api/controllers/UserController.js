/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var jwt = require('jwt-simple');
var moment = require('moment');

module.exports = {

	login:function(req,res) {
		function createToken(req, user) {
			console.log('creatin token');
		  var payload = {
		    iss: req.hostname,
		    sub: user.id,
		    iat: moment().valueOf(),
		    exp: moment().add(14, 'days').valueOf()
		  };
		  return jwt.encode(payload, sails.config.TOKEN_SECRET);
		}
		sails.log('<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>00000000000000000000000000000')

		var toto = req.__('Erreur d\'email ou de mots de passe')
		sails.log(toto)
 		User.findOne({ email: req.body.email }).exec(function(err, user) {
 			console.log(user);
 			console.log(err);
		    if (!user) {
		      return res.status(401).send({ message: req.__('Erreur d\'email ou de mots de passe')});
		    }

		    user.comparePassword(req.body.password, function(err, isMatch) {
		    	console.log('hereereererere');
		      if (!isMatch) {
		        return res.status(401).send({ message: req.__('Erreur d\'email ou de mots de passe')});
		      }
		      res.send({ token: createToken(req, user) });
		      // res.send('COOL');
		    });
	  	});
	},
	getMe:function(req,res) {
		User.findById(req.user, function (err, user) {
		    res.send(user);
		});
	},
	editMe:function(req, res) {
	  User.findById(req.user, function(err, user) {
	    if (!user) {
	      return res.status(400).send({ message: 'User not found' });
	    }
	    user.displayName = req.body.displayName || user.displayName;
	    user.email = req.body.email || user.email;
	    user.save(function(err) {
	      res.status(200).end();
	    });
	  });
	}
	
};

