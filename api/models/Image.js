/**
* Image.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
var fs = require('fs'), Writable = require('stream').Writable;
var async = require('async');
module.exports = {
	schema: true,
  	attributes: {
  		filename:{type:'string',required:true},
  		size:{type:'int'},
  		type:{type:'string'},
  		index:{type:'float'},
  		articlecategory: {
			model: 'categoryArticle',
		},
  		user: {
			model: 'user',
		},
  		article: {
			model: 'article',
		},
  		projectcategory: {
			model: 'categoryProject',
		},
  		project: {
			model: 'project',
		},
  		galery: {
			model: 'galery',
		}
	},
  	beforeDestroy: function (values, cb) {
  		console.log(values);
   		Image.findOne(values.where.id).populateAll().exec(function(err,img) {
			console.log('-------------------------------------------------------');
			console.log(img);



			async.parallel([
				function(callback){
			        
			        if(img.articlecategory)
			        {

				        CategoryArticle.findOne(img.articlecategory.id).populate('images').exec(function(err,res) {
				        	async.each(res.images, function( image, cb2) {

				        		if(Number(image.index) > Number(img.index))
				        		{
				        			image.index = Number(image.index)-1;
				        			Image.update(image.id,image,function() {
				        				cb2(null);
				        			})

				        		}else{
							    	cb2(null);
				        		}
							  
							}, function(err){
							    if( err ) {
							      console.log('A file failed to process');
							    } else {
							      	console.log('All files have been processed successfully');
				        			callback(null)

							    }
							});
				        });

			        }else
			        if(img.article)
			        {

				        Article.findOne(img.article.id).populate('images').exec(function(err,res) {
				        	async.each(res.images, function( image, cb2) {

				        		if(Number(image.index) > Number(img.index))
				        		{
				        			image.index = Number(image.index)-1;
				        			Image.update(image.id,image,function() {
				        				cb2(null);
				        			})

				        		}else{
							    	cb2(null);
				        		}
							  
							}, function(err){
							    if( err ) {
							      console.log('A file failed to process');
							    } else {
							      	console.log('All files have been processed successfully');
				        			callback(null)

							    }
							}); 
				        });

			        }
			        else if(img.projectcategory)
			        {
			        	console.log(img.projectcategory);
				        CategoryProject.findOne(img.projectcategory.id).populate('images').exec(function(err,res) {
				        	console.log('hereeeee');
				        	console.log(res);
				        	async.each(res.images, function( image, cb2) {

				        		if(Number(image.index) > Number(img.index))
				        		{
				        			image.index = Number(image.index)-1;
				        			Image.update(image.id,image,function() {
				        				cb2(null);
				        			})
 
				        		}else{
							    	cb2(null);
				        		}
							  
							}, function(err){
							    if( err ) {
							      console.log('A file failed to process');
							    } else {
							      	console.log('All files have been processed successfully');
				        			callback(null)

							    }
							});
				        });

			        }else
			        if(img.project)
			        {

				        Project.findOne(img.project.id).populate('images').exec(function(err,res) {
				        	async.each(res.images, function( image, cb2) {

				        		if(Number(image.index) > Number(img.index))
				        		{
				        			image.index = Number(image.index)-1;
				        			Image.update(image.id,image,function() {
				        				cb2(null);
				        			})

				        		}else{
							    	cb2(null);
				        		}
							  
							}, function(err){
							    if( err ) {
							      console.log('A file failed to process');
							    } else {
							      	console.log('All files have been processed successfully');
				        			callback(null)

							    }
							});
				        });

			        }else
			        if(img.galery) 
			        {

			        	console.log('-------------------------------------------------img.galery');
			        	console.log(img.galery);
				        Galery.findOne(img.galery.id).populate('images').exec(function(err,res) {
				        	console.log(res);
				        	console.log(err);
				        	async.each(res.images, function(image, cb2) {

				        		if(Number(image.index) > Number(img.index))
				        		{
				        			image.index = Number(image.index)-1;
				        			Image.update(image.id,image,function() {
				        				cb2(null);
				        			})

				        		}else{
							    	cb2(null);
				        		}
							  
							}, function(err){
							    if( err ) {
							      console.log('A file failed to process');
							    } else {
							      	console.log('All files have been processed successfully');
				        			callback(null)

							    }
							});
				        });

			        }
			        else
			        if(img.user) 
			        {

			        	console.log('-------------------------------------------------img.user');
			        	console.log(img.user);
			        	console.log(img.user.id);
				        User.findOne(img.user.id).populate('images').exec(function(err,res) {
				        	console.log(res);
				        	console.log(err);
				        	async.each(res.images, function(image, cb2) {

				        		if(Number(image.index) > Number(img.index))
				        		{
				        			image.index = Number(image.index)-1;
				        			Image.update(image.id,image,function() {
				        				cb2(null);
				        			})

				        		}else{
							    	cb2(null);
				        		}
							  
							}, function(err){
							    if( err ) {
							      console.log('A file failed to process');
							    } else {
							      	console.log('All files have been processed successfully');
				        			callback(null)

							    }
							});
				        });

			        }



			    },
			    function(callback){
			        try{
			            fs.unlink('uploads/adminThumbs/'+img.filename)
			        }catch(e){

			        }
			        callback(null)
			    },
			    function(callback){
					try{
			            fs.unlink('uploads/thumbs2/'+img.filename)
			        }catch(e){

			        }
			        callback(null)
			    },
			    function(callback){
					try{
			            fs.unlink('uploads/thumbs/'+img.filename);
			        }catch(e){

			        }
			        callback(null)
			    },
			    function(callback){
					try{
			            fs.unlink('uploads/'+img.filename)
			        }catch(e){

			        }
			        callback(null)
			    },
			    function(callback){
					try{
			            fs.unlink('uploads/homeSlider/'+img.filename)
			        }catch(e){

			        }
			        callback(null)
			    },
			    function(callback){
					try{
			            fs.unlink('uploads/profilepicture/'+img.filename)
			        }catch(e){

			        }
			        callback(null)
			    }
			],
			// optional callback
			function(err, results){
				if (err) {
					console.log('ERRRRRRRROR');
					sails.log(err)
				};
			    // the results array will equal ['one','two'] even though
			    // the second function had a shorter timeout.
			    return cb();
			});

		});
  	}
};

