/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var jwt = require('jwt-simple');
var moment = require('moment');
// var bcrypt = require('bcryptjs');
var passgen = require('password-generator');
var nodemailer = require('nodemailer');

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
		console.log(req.body.password);
		console.log(req.body.email);
		// console.log(req);
		var errormes = res.__('Erreur d\'email ou de mots de passe');
		console.log(errormes);
 		User.findOne({ email: req.body.email }).exec(function(err, user) {
 			console.log(user);
 			console.log(err);
		    if (!user) {
		      return res.status(401).send({ message: errormes});
		    }
		    console.log(req.body.password);
		    user.comparePassword(req.body.password, function(err, isMatch) {
		    	console.log('hereereererere');
		    	console.log(isMatch);
		      if (!isMatch) {
		        return res.status(401).send({ message: errormes});
		      }
		      res.send({ token: createToken(req, user) });
		      // res.send('COOL');
		    });
	  	});
	},
	getMe:function(req,res) {
		// console.log('getme');
		// console.log(req.user);
		// console.log('--------');
		User.findById(req.user, function (err, user) {
			// console.log(user);
		    res.send(user);
		});
	},
	editMe:function(req, res) {
		console.log('editMe');
		// console.log(req.user.id);
		// console.log(req.user);
		// console.log(req.body);
	  User.findOneById(req.user, function(err, user) {
	    if (!user) {
	      return res.status(400).send({ message: 'User not found' });
	    }
	    console.log(req.body);
	    user.name = req.body.name || user.name;
	    user.email = req.body.email || user.email;
	    user.phone = req.body.phone || user.phone;
	    user.fb = req.body.fb || user.fb;
	    user.twitter = req.body.twitter || user.twitter;
	    user.gplus = req.body.gplus || user.gplus;
	  	user.save(function(err,user) {
	    	console.log('tototototo');
	    	console.log(err);
	    	if(err)
	     		return res.status(301).send(err);
	    	console.log(user);
	      res.status(200).end();
	    });
	  });
	},
	editpasswordMe:function(req, res) {
		console.log('editMe');
		User.findOneById(req.user, function(err, user) {
		    if (!user) {
		      return res.status(400).send({ message: 'User not found' });
		    }
		    console.log(req.body);
		    user.comparePassword(req.body.oldpassword, function(err, isMatch) {
		    	console.log('hereereererere');
		      if (!isMatch || req.body.password !== req.body.comfirmpassword) {
		        return res.status(400).send({ message: 'Bad credential'});
		      }
		      user.password = req.body.password ;
		      user.comfirmpassword = req.body.password;
			  	user.save(function(err,user) {
			    	console.log('tototototo');
			    	console.log(err);
			    	if(err)
			     		return res.status(400).send(err);
			    	console.log(user);
			      res.status(200).end();
			    });
		      
		      // res.send('COOL');
		    });
		    
		});
	},
	add:function(req,res) {
		var user={};
		user.name = req.body.name ;
	    user.email = req.body.email;
	    console.log('CREATING USER');
	    var salt = passgen();
	    sails.log(salt)
	    user.password = salt;
	    user.password = 'toto';
	    user.role = 'user';

	    User.create(user).exec(function (err,created){
		  if(err)
		  {
		  	console.log(err);
		  	res.status(400).send({error:err})
		  }else{

		  	//ENVOI DU MDP PAR EMAIL
		  	var transporter = nodemailer.createTransport({
			    service: 'Gmail',
			    auth: {
			        user: 'alexismomcilovic@gmail.com',
			        pass: 'Alexis09'
			    }
			});

			// NB! No need to recreate the transporter object. You can use
			// the same transporter object for all e-mails

			// setup e-mail data with unicode symbols
			var mailOptions = {
			    from: 'NUTRIMARKETING <foo@blurdybloop.com>', // sender address
			    to: 'alexismomcilovic@gmail.com', // list of receivers
			    subject: 'Votre mot de passe est arrivé', // Subject line
			    html: '<p>Voici le mot de passe qui vous servira pour vots premières connexions.</p><p>Pensez à le changer rapidement</p><p><b>mot de passe: '+ salt+'</b></p><p>Cordialement, votre nouvel outil web</p>'// html body
			};

			// send mail with defined transport object
			transporter.sendMail(mailOptions, function(error, info){
			    if(error){
			        console.log(error);
			        res.status(200).send(created);
			    }else{
			    	res.status(200).send(created);
			        console.log('Message sent: ' + info.response);
			    }
			});

		  	
		  }
		});

	}
	
};

