/**
 * EnvoiController
 *
 * @description :: Server-side logic for managing envois
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var nodemailer = require('nodemailer');
var smtpPool = require('nodemailer-smtp-pool');
var markdown = require('nodemailer-markdown').markdown;
var fs = require('fs'), Writable = require('stream').Writable;
var https = require('https');
var http = require('http');


var mailgun = require('mailgun-js')({apiKey: sails.config.MG_API_KEY, domain: sails.config.MG_DOMAIN});

module.exports = {
	envoiserie:function(req,res) {

		res.setTimeout(0);
		console.log('envoiSERIE');
		// console.log(req.body);
		var desti=[];

		if(!req.body.title || !req.body.destinataire || !req.body.objet)
		{
			res.status(400).send('notitle');
		}

		var reciever = new Writable({objectMode: true});
		reciever._write = function(file, enc, cb) {
			console.log('start');
			var output = fs.createWriteStream('.tmp/uploads/'+file.filename);

			var transfert = file.pipe(output);
			transfert.on('finish', function () {


				console.log('finish');
				cb();

			}); 
		};
		// var pat=new RegExp('image')
		// console.log(req.file('pjs'));

		req.file('pjs').upload(reciever,function (err, files) {
	      if (err) return res.serverError(err);
	      	console.log('files');
	      	console.log(err);
	      	var usedlists ={};
	      	usedlists.list =[];
	      	// console.log();
	      	// console.log(files);
		    async.parallel([
				function fetchClient(cb) {
					if(req.body.client!='false')
					{
						User.find({role:'client'}).exec(function (err, users) {
					    	res.send(users);
					    	for( i in users)
					    	{
					    		desti.push(users[i].email)
					    	}
					    	cb(null,'')
						});
					}else
					{cb(null,'')}
				},
				function fetchList(callback) {
					
					async.map(JSON.parse(req.body.destinataire),function(item,cb) {

						Mailinglist.findOne(item).populate('abonnes').exec(function (err, list) {
							console.log('CL');
							// console.log(list);
							usedlists.list.push(list.id)
					    	for( i in list.abonnes)
					    	{
					    		console.log('COOOL');
					    		if(list.abonnes[i].email)
					    			desti.push(list.abonnes[i].email)
					    	}
					    	cb(null,'')
						});

					},function(err, results) {

						console.log('finish');
						// console.log(this);
						callback(null,'')
					})
						
				}],function(err,results) {
					console.log('finishfinishfinish');
					console.log(desti);

					attach =null;
					if(typeof(files[0])!='undefined'){
						attach = [{  
				            filename: files[0].filename,
				            content: fs.createReadStream('.tmp/uploads/'+ files[0].filename)
			        	}]
			        }	

			        var monenvoi={};

			        if(desti.length > 0)
			        {
			        	console.log();
			        	//CREER CAMPAGNE
						var campagne = {
						 	name: req.body.title
						}
			        	
			        	mailgun.post('/'+sails.config.MG_DOMAIN+'/campaigns', campagne, function (error, body) {
							console.log(error);
							console.log(body);
							if(body.message ==="Campaign created")
							{
								console.log('Campaign created');
								var envoi = {};
								envoi.name= body.campaign.name;
								envoi.cId= body.campaign.id;
								envoi.subject= req.body.objet;
								Envoi.create(envoi).exec(function(err,data) {
									console.log(data);
									monenvoi = data

									var transporter = nodemailer.createTransport(smtpPool({
									    service: 'Mailgun',
									    auth: {
									        user: sails.config.MG_LOGIN,
									        pass: sails.config.MG_PASS
									    },
									     // service: 'gmail',
									    // auth: {
									    //     user: 'alexismomcilovic@gmail.com',
									    //     pass: 'Alexis09'
									    // },
									    maxConnections: 5,
									    maxMessages: 10
									}));
									// console.log(sails.config)
									console.log(data.cId)
									console.log(usedlists)
									console.log(JSON.stringify(usedlists));
									transporter.use('compile', markdown())
									transporter.sendMail({
										headers:{'X-Mailgun-Campaign-Id':String(data.cId),
										'X-Mailgun-Variables':JSON.stringify(usedlists)},
									    from: sails.config.MAIN_EMAIL,
									    to: '',
									    bcc:desti,
									    subject: req.body.objet || '',
									    markdown: req.body.content,
									    attachments: attach,
									    encoding:'base64',
									    // envelope: {
									    //     bcc:desti
									    // }
									},function(err,info) {
										console.log(err);
										console.log(info);
										if(err)
											res.send(err)
										envoi.submitted_count = info.accepted.length
										res.send(envoi)
									});	



								})
							}
						});
			        }
			});
	    })
	},
	fetchEnvois:function(req,res) {

		Envoi.find().exec(function(err,data) {

			async.map(data,
			function(item,cb) {

				console.log(item.cId);
				mailgun.get('/'+sails.config.MG_DOMAIN+'/campaigns/'+item.cId, function (error, body) {
					console.log(body);
					console.log(error);
					if(error)
					{
						cb(error)
					}
					body.createdAt = item.createdAt;
					body.cid = body.id;
					body.id = item.id;
					cb(null,body)
				})
			},
			function(err,results) {
				res.send(results)
			})
		})

	},
	deletecampagne:function(req,res) {

console.log('deleteCampagne');
console.log(req.params.id);
		Envoi.findOne(req.params.id).exec(function(err,data) {
				console.log(data.cId);
				mailgun.delete('/'+sails.config.MG_DOMAIN+'/campaigns/'+data.cId, function (error, body) {
					if(error)
						res.status(400).send(error);

					Envoi.destroy(req.params.id).exec(function(err,dat) {
						res.send(dat[0])
					})
				})
			
		})

	},
	desincription:function(req,res) {

console.log('deinscription');
console.log(req.body);
		if(req.body.event ==='unsubscribed')
		{
			var list = JSON.parse(req.body.list)
			console.log(list);
			console.log(req.body.recipient);

			for(var i in list)
			{
				Mailinglist.findOne(list[i]).populate('abonnes').exec(function(err,mailinglist) {

					console.log(mailinglist.abonnes)
					var unsubID;
					for(var j in mailinglist.abonnes)
					{
						if(mailinglist.abonnes[j].email === req.body.recipient)
						{
							unsubID= req.body.recipient;
							mailinglist.abonnes.remove(mailinglist.abonnes[j].id)
							mailinglist.save(function(e,result) {
								console.log('---------------------------------');
								console.log("fin");
							})
						}	
					}
					mailgun.delete('/'+sails.config.MG_DOMAIN+'/unsubscribes/'+unsubID, function (error, body) {
					if(error)
						res.status(400).send(error);

					res.status(200).send('');
					})
				})
					
			}



		}else{
			res.send('')	
		}
	},
	bounce:function(req,res) {

console.log('bounced');
console.log(req.body);
		if(req.body.event ==='bounced' && req.body.list)
		{
			var list = JSON.parse(req.body.list)
			console.log(list);
			console.log(req.body.recipient);

			for(var i in list)
			{
				Mailinglist.findOne(list[i]).populate('abonnes').exec(function(err,mailinglist) {

					console.log(mailinglist.abonnes)
					var unsubID;
					for(var j in mailinglist.abonnes)
					{
						if(mailinglist.abonnes[j].email === req.body.recipient)
						{
							unsubID= req.body.recipient;
							mailinglist.abonnes.remove(mailinglist.abonnes[j].id)
							mailinglist.save(function(e,result) {
								console.log('---------------------------------');
								console.log("fin");
							})
						}	
					}
					mailgun.delete('/'+sails.config.MG_DOMAIN+'/bounced/'+unsubID, function (error, body) {
					if(error)
						res.status(400).send(error);

					res.status(200).send('');
					})
				})
					
			}



		}else{
			res.send('')	
		}
	}
};

