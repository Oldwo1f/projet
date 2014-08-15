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
	delete:function(req,res,next) {

		console.log('COCOCOCOCOCOCOCOCOOOOOOOOOOOOOOOOOL');
		console.log(req.params.id);

		next();

		
	},
	upload:function(req,res) {

		console.log(req.body.itemId);
		console.log(req.body.itemType);
		res.setTimeout(0);
		sid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@');
		sid.seed(10);
		sails.log('UPLOAD ! ! !')
		var stuff = JSON.parse(req.body.resizeStuff);

		var reciever = new Writable({objectMode: true});
		reciever._write = function(file, enc, cb) {
			console.log('reciever');
			file.filename=safeFilename(sid.generate()+'-'+file.filename)
			var output = require('fs').createWriteStream('.tmp/uploads/'+file.filename);

			var transfert = file.pipe(output);
			transfert.on('finish', function () {
			console.log('endPipe'); 
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
      				sails.log('error mkdir');
      				console.log(e);
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
				        

				        console.log('Resized and cropped success');
	      				cb()

				    },
				    function error(err){
				    	console.log('rescropErr');
				    	console.log(err);
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
      				// console.log(e);
      			}


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
				        
			    		console.log('finishall');
			    		var img = files[0]

			    		
			    		switch(req.body.itemType){

			    			case 'categoryarticle':
			    				console.log('totototototot');
			    				CategoryArticle.findOne(req.body.itemId).populate('images').exec(function(err,categoryarticle) {
console.log(err);
					    			console.log('categoryarticle');
					    			console.log(categoryarticle);
					   				Image.create(img).exec(function(err,img) {
						    			console.log(img);

					   					categoryarticle.images.add(img.id)
					   					categoryarticle.save();
						    			return res.json({
											message: files.length + ' file(s) uploaded successfully!',
											files: img
										});
						    		});




					    		});
			    			break;

			    		}

			    		console.log(item);
				    		// console.log(results[0]);
			    		


						

				    },
				    function error(err){
				    	console.log('rescropErr');
				    	console.log(err);
				    	// if (err) {
				     //    	console.log('resizeError');
				     //    	console.log(err);
				     //    		throw err;
				     //    }
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

