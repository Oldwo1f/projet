/**
 * ImageController
 *
 * @description :: Server-side logic for managing images
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var fs = require('fs'), Writable = require('stream').Writable;
var easyimg = require('easyimage');
var async = require('async');
var sid = require('shortid');
module.exports = {
	test:function(req,res) {

			console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$');
			console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$    TEST    $$$$$$$$$$$$$$$$$$$$$$$$');
			console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$');
			Galery.findOne('5406c79fa015780c3c2e40de').populate('images').exec(function(err,galery) {
						console.log(err);
						console.log(galery);
					    			
					    			// var lastIndex= -1;
					    			// for( var i in galery.images )
					    			// {
					    			// 	if(Number(galery.images[i].index) >lastIndex)
					    			// 		lastIndex = galery.images[i].index;
					    			// }
					    			// img.index = Number(lastIndex+1);
					   				// Image.create(img).exec(function(err,img) {
					   					// console.log(err);
					   					// console.log(img);
					   					// console.log(img.id);
					   					// console.log('rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr');
					   					// console.log(galery);
					   					console.log(galery.images.add);
					   					console.log(galery.images.add());
					   					galery.images.add('540dc7f7dbab7d093a065328');
					   					// console.log(galery);
					   					galery.save().then(function(err,data) {
					   						console.log('save');
					   						console.log(err);
					   						console.log(data);
					   					});
						    // 			return res.json({
										// 	message: files.length + ' file(s) uploaded successfully!',
										// 	files: img
										// });
						    		// });




					    		});
	},
	upload:function(req,res) {

		res.setTimeout(0);
		sid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@');
		sid.seed(10);
		var stuff = JSON.parse(req.body.resizeStuff);

		var reciever = new Writable({objectMode: true});
		reciever._write = function(file, enc, cb) {
			file.filename=safeFilename(sid.generate()+'-'+file.filename)
			var output = require('fs').createWriteStream('.tmp/uploads/'+file.filename);

			var transfert = file.pipe(output);
			transfert.on('finish', function () {
				cb();
			});
		};
		var pat=new RegExp('image')

		req.file('imgs').upload(reciever,function (err, files) {
	      if (err) return res.serverError(err);


	      if(pat.test(files[0].type))
	      {
	      	async.each(stuff,function(item,cb) {

	      		// console.log(item.originalWidth*item.zoom);
	      		// console.log(item.originalHeight*item.zoom);
	      		// console.log(item.cropWidth);
	      		// console.log(item.cropHeight);
	      		// console.log(item.x);
	      		// console.log(fs.exists('.tmp/uploads/'+item.folder));
      			try{
	      			fs.mkdirSync('uploads/'+item.folder)

      			}
      			catch(e){
      			}


	      		easyimg.rescrop(
				    {
				        src:'.tmp/uploads/'+files[0].filename,
				        dst:'uploads/'+item.folder+'/'+files[0].filename,
				        width:item.originalWidth*item.zoom, height:item.originalHeight*item.zoom,
				        cropwidth:item.cropWidth, cropheight:item.cropHeight,
				        x:item.x, y:item.y,
				        gravity: 'NorthWest',fill:true
				    }).then(
				    function success(image) {
				        

	      				cb()

				    },
				    function error(err){
				    	// console.log(err);
				    	// if (err) {
				     //    	console.log('resizeError');
				     //    	console.log(err);
				     //    		throw err;
				     //    }
				    }
				);




	      	}, function(err){
			    // results is now an array of stats for each file


			    try{
	      			fs.mkdirSync('uploads/adminThumbs');
      			}
      			catch(e){
      			}

      			console.log('BEFORE THIUMNAIL');
	      		easyimg.thumbnail(
				    {
				        src:'.tmp/uploads/'+files[0].filename,
				        dst:'uploads/adminThumbs/'+files[0].filename,
				        width:200, height:200
				        // cropwidth:item.cropWidth, cropheight:item.cropHeight,
				        // x:item.x, y:item.y,
				        // gravity: 'NorthWest',fill:true
				    }).then(
				    function success(image) {
				        	

				        	console.log('THEN THIUMNAIL');
			    		var img = files[0]

			    		
			    			console.log(req.body);


			    		switch(req.body.itemType){

			    			case 'categoryarticle':
			    				CategoryArticle.findOne(req.body.itemId).populate('images').exec(function(err,categoryarticle) {
					    			
					    			var lastIndex= -1;
					    			for( var i in categoryarticle.images )
					    			{
					    				if(Number(categoryarticle.images[i].index) >lastIndex)
					    					lastIndex = categoryarticle.images[i].index;
					    			}
					    			img.index = Number(lastIndex+1);
					   				Image.create(img).exec(function(err,img) {
					   					// console.log(err);

					   					categoryarticle.images.add(img.id)
					   					categoryarticle.save();
						    			return res.json({
											message: files.length + ' file(s) uploaded successfully!',
											files: img
										});
						    		});




					    		});
			    			break;
			    			case 'article':
			    				Article.findOne(req.body.itemId).populate('images').exec(function(err,article) {
					    			
					    			var lastIndex= -1;
					    			for( var i in article.images )
					    			{
					    				if(Number(article.images[i].index) >lastIndex)
					    					lastIndex = article.images[i].index;
					    			}
					    			img.index = Number(lastIndex+1);
					   				Image.create(img).exec(function(err,img) {
					   					// console.log(err);

					   					console.log(img);
					   					article.images.add(img.id)
					   					article.save();
						    			return res.json({
											message: files.length + ' file(s) uploaded successfully!',
											files: img
										});
						    		});




					    		});
			    			break;
			    			case 'categoryproject':
			    				CategoryProject.findOne(req.body.itemId).populate('images').exec(function(err,categoryproject) {
					    			
					    			var lastIndex= -1;
					    			for( var i in categoryproject.images )
					    			{
					    				if(Number(categoryproject.images[i].index) >lastIndex)
					    					lastIndex = categoryproject.images[i].index;
					    			}
					    			img.index = Number(lastIndex+1);
					   				Image.create(img).exec(function(err,img) {
					   					console.log(err);

					   					categoryproject.images.add(img.id)
					   					categoryproject.save();
						    			return res.json({
											message: files.length + ' file(s) uploaded successfully!',
											files: img
										});
						    		});




					    		});
			    			break;
			    			case 'project':
			    				Project.findOne(req.body.itemId).populate('images').exec(function(err,project) {
					    			
					    			var lastIndex= -1;
					    			for( var i in project.images )
					    			{
					    				if(Number(project.images[i].index) >lastIndex)
					    					lastIndex = project.images[i].index;
					    			}
					    			img.index = Number(lastIndex+1);
					   				Image.create(img).exec(function(err,img) {
					   					console.log(err);

					   					project.images.add(img.id)
					   					project.save();
						    			return res.json({
											message: files.length + ' file(s) uploaded successfully!',
											files: img
										});
						    		});




					    		});
			    			break;
			    			case 'galery':
			    			console.log('GALERY GALERY GALERYGALERY GALERY GALERY');
			    				Galery.findOne(req.body.itemId).populate('images').exec(function(err,galery) {
console.log(err);
					    			
					    			var lastIndex= -1;
					    			for( var i in galery.images )
					    			{
					    				if(Number(galery.images[i].index) >lastIndex)
					    					lastIndex = galery.images[i].index;
					    			}
					    			img.index = Number(lastIndex+1);
					   				Image.create(img).exec(function(err,img) {
					   					
					   					galery.images.add(img.id);
					   					galery.save();
						    			return res.json({
											message: files.length + ' file(s) uploaded successfully!',
											files: img
										});
						    		});




					    		});
			    			break;
			    			case 'user':
			    			console.log('---------------------------------------------');
			    				User.findOne(req.body.itemId).populate('images').exec(function(err,user) {

					    			var lastIndex= -1;
					    			for( var i in user.images )
					    			{
					    				if(Number(user.images[i].index) >lastIndex)
					    					lastIndex = user.images[i].index;
					    			}
					    			img.index = Number(lastIndex+1);
					   				Image.create(img).exec(function(err,img) {
					   					
					   					user.images.add(img.id)

					   					user.save();
						    			return res.json({
											message: files.length + ' file(s) uploaded successfully!',
											files: img
										});
						    		});




					    		});
			    			break;

			    		}

				    		// console.log(results[0]);
			    		


						

				    },
				    function error(err){
				    	console.log('err');
				    	console.log(err);
				    }
				);




			   
			});






	   

	      }else
	      {
	      	//NOT an IMAGE
	      	return res.json({
		        message: 'Ce fichier n\'est pas une image',
		        files: files
		      });
	      }








	      
	    });




		function safeFilename(name) {
			name = name.replace(/ /g, '-');
			name = name.replace(/[^A-Za-z0-9-_\.]/g, '');
			name = name.replace(/\.+/g, '.');
			name = name.replace(/-+/g, '-');
			name = name.replace(/_+/g, '_');
			return name;
		}

	}
};

