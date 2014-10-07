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
var mailgun = require('mailgun-js')({apiKey: sails.config.MG_API_KEY, domain: sails.config.MG_DOMAIN});

module.exports = {

	login:function(req,res) {
		function createToken(req, user,data) {
		  var payload = {
		    iss: req.hostname,
		    data:data,
		    sub: user.id,
		    iat: moment().valueOf(),
		    exp: moment().add(14, 'days').valueOf()
		  };
		  return jwt.encode(payload, sails.config.TOKEN_SECRET);
		}
		var errormes = res.__('Erreur d\'email ou de mots de passe');
 		User.findOne({ email: req.body.email }).exec(function(err, user) {
		    if (!user) {
		      return res.status(401).send({ message: errormes});
		    }
		    user.comparePassword(req.body.password, function(err, isMatch) {
		      if (!isMatch) {
		        return res.status(401).send({ message: errormes});
		      }
		      var d={};
		      d.intern=true;
		      d.role=user.role;
		      res.send({ token: createToken(req, user,d) });
		    });
	  	});
	},
	getMe:function(req,res) {
		User.findOne(req.user).populate('images').exec(function (err, user) {
		    res.send(user);
		});
	},
	client:function(req,res) {
		
		User.find({role:'client'}).populate('images').exec(function (err, users) {
		    res.send(users);
		});
	},
	intern:function(req,res) {
		
		User.find({ role: ['user','admin']} ).populate('images').exec(function (err, users) {
		    res.send(users);
		});
	},
	editMe:function(req, res) {
		
	  User.findOneById(req.user, function(err, user) {
	    if (!user) {
	      return res.status(400).send({ message: 'User not found' });
	    }
	    user.name = req.body.name || user.name;
	    user.email = req.body.email || user.email;
	    user.phone = req.body.phone || user.phone;
	    user.fb = req.body.fb || user.fb;
	    user.twitter = req.body.twitter || user.twitter;
	    user.gplus = req.body.gplus || user.gplus;
	  	user.save(function(err,user) {
	    	if(err)
	     		return res.status(301).send(err);
	      res.status(200).end();
	    });
	  });
	},
	editpasswordMe:function(req, res) {
		User.findOneById(req.user, function(err, user) {
		    if (!user) {
		      return res.status(400).send({ message: 'User not found' });
		    }
		    user.comparePassword(req.body.oldpassword, function(err, isMatch) {
		      if (!isMatch || req.body.password !== req.body.comfirmpassword) {
		        return res.status(400).send({ message: 'Bad credential'});
		      }
		      user.password = req.body.password ;
		      user.comfirmpassword = req.body.password;
			  	user.save(function(err,user) {
			    	if(err)
			     		return res.status(400).send(err);
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
	    var salt = passgen();
	    sails.log(salt)
	    user.password = salt;
	    user.role = 'user';

	    User.create(user).exec(function (err,created){
		  if(err)
		  {
		  	res.status(400).send({error:err})
		  }else{

		  	//ENVOI DU MDP PAR EMAIL
		  	var transporter = nodemailer.createTransport({
			    service: 'Mailgun',
			    auth: {
			        user: sails.config.MG_LOGIN,
			        pass: sails.config.MG_PASS
			    },
			});

			// NB! No need to recreate the transporter object. You can use
			// the same transporter object for all e-mails

			// setup e-mail data with unicode symbols
			var mailOptions = {
			    from: sails.config.CAMPANY_NAME+' <'+sails.config.MAIN_EMAIL+'>', // sender address
			    to: created.email, // list of receivers
			    subject: 'Votre mot de passe est arrivé', // Subject line
			    text: 'Voici le mot de passe qui vous servira pour vots premières connexions.Pensez à le changer rapidement \n \nMot de passe: '+ salt+'\n \nCordialement, votre nouvel outil web'// html body
			};

			// send mail with defined transport object
			transporter.sendMail(mailOptions, function(error, info){
			    if(error){
			        res.status(200).send(created);
			    }else{
			    	res.status(200).send(created);
			    }
			});

		  	
		  }
		});

	}
	
};

