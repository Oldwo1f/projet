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


module.exports = {
	envoiserie:function(req,res) {

		res.setTimeout(0);
		console.log('envoiSERIE');
		console.log(req.body);
		var desti=[];
		// var files = fs.readStream(req.body.pjs);

		// for(i in req.body.pjs)
		// {
		// 	req.body.pjs[i].path = fs.createReadStream(req.body.pjs[i].path)
		// }

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
	      	console.log();
	      	console.log(files);
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
							console.log(list);
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
						console.log(this);
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
					// console.log()
					transporter.use('compile', markdown())
					// transporter.sendMail({
					// 	headers:{'X-Mailgun-Campaign-Id':'yoyo'},
					//     from: sails.config.MAIN_EMAIL,
					//     to: '',
					//     bcc:desti,
					//     subject: req.body.objet || 'replacement',
					//     markdown: req.body.content,
					//     attachments: attach,
					//     encoding:'base64',
					//     // envelope: {
					//     //     bcc:desti
					//     // }
					// },function(err,info) {
					// 	console.log('32err');
					// 	console.log(err);
					// 	console.log(info);
					// 	if(err)
					// 		res.send(err)

					// 	res.send(info)
					// });
			});

			






	    })

		























	}
};

