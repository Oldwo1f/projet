/**
 * BackofficeController
 *
 * @description :: Server-side logic for managing backoffices
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
 var passgen = require('password-generator');

module.exports = {
	
	index:function(req,res) {
		res.locals.layout = 'layout';


		return res.view('admin');
	},
	home:function(req,res) {
		res.locals.layout = 'layout';


		return res.view('homepage');
	},
	login:function(req,res) {
		res.locals.layout = 'layout';
		return res.view('login');
	},
	count:function(req,res) {
		async.parallel({
		    users: function(callback){

		    	User.count({ role: ['user','admin']}).exec(function(error,items) {
		    		if(error)
		    			callback(error)
		            callback(null, items);
		    	})
		        
		    },
		    clients: function(callback){
		        User.count({ role: ['client']}).exec(function(error,items) {
		    		if(error)
		    			callback(error)
		            callback(null, items);
		    	})
		    },
		    articles: function(callback){
		        Article.count().exec(function(error,items) {
		    		if(error)
		    			callback(error)
		            callback(null, items);
		    	})
		    },
		    comments: function(callback){
		       	Coment.count().exec(function(error,items) {
		    		if(error)
		    			callback(error)
		            callback(null, items);
		    	})
		    },
		    commentsToValidate: function(callback){
		       	Coment.count({ status: ['actif']}).exec(function(error,items) {
		    		if(error)
		    			callback(error)
		            callback(null, items);
		    	})
		    },
		    projects: function(callback){
		        Project.count().exec(function(error,items) {
		    		if(error)
		    			callback(error)
		            callback(null, items);
		    	})
		    },
		    goldenbook: function(callback){
		        Goldenbook.count().exec(function(error,items) {
		    		if(error)
		    			callback(error)
		            callback(null, items);
		    	})
		    },
		    mailinglist: function(callback){
		        Mailinglist.count().exec(function(error,items) {
		    		if(error)
		    			callback(error)
		            callback(null, items);
		    	})
		    }
		},
		function(err, results) {
		    // results is now equals to: {one: 1, two: 2}
		    console.log(err);
		    console.log(results);
		    res.send(results);
		});
	},
	init:function(req,res) {
		res.locals.layout = '';
		console.log(req.params.emailClient);
		if(req.params.what ==='admin' && typeof(req.params.emailClient) != 'undefined')
		{

			var user={};
		    user.email = req.params.emailClient;
		    console.log('CREATING USER');
		    user.password = '1234';
		    user.role = 'admin';

		   
		    User.create(user).exec(function (err,created){
			  if(err)
			  {
			  	res.status(400).send({error:err})
			  }else{

				return res.send('results');
			  }
			});
		}else
		if(req.params.what ==='admin' )
		{

			var user={};
			user.name = 'Alexis Momcilovic' ;
		    user.email = 'alexismomcilovic@gmail.com';
		    user.password = 'Lechatrosechope2rat';
		    user.role = 'admin';

		    User.create(user).exec(function (err,created){
			  if(err)
			  {
			  	res.status(400).send({error:err})
			  }else{

				return res.send('results');
			  }
			});
		}else  if(req.params.what ==='galery')
		{
			var galery={};
			galery.title = 'home';
		   

		    Galery.create(galery).exec(function (err,created){
			  if(err)
			  {
			  	res.status(400).send({error:err})
			  }else{

				return res.send('results');
			  }
			});
		}










	},
	vid:function(req,res) {
		res.locals.layout = '';


		return res.view('testplugin');
	},
	contact:function(req,res) {

		return res.view('contact');
	},
	dashboard:function(req,res) {


		return res.view('dashboard');
	}
};

