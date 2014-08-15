/**
* Image.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
var fs = require('fs'), Writable = require('stream').Writable;
var async = require('async');
module.exports = {

  attributes: {
  		filename:{type:'string',required:true},
  		index:{type:'int'},
  		articlecategory: {
			model: 'categoryArticle',
		}
  },
  beforeDestroy: function (values, cb) {
console.log(values);
console.log(values.where.id);
   Image.findOne(values.where.id).exec(function(err,img) {
			console.log(img.filename);

			async.parallel([
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
			    }
			],
			// optional callback
			function(err, results){
				if (err) {
					sails.log(err)
				};
			    // the results array will equal ['one','two'] even though
			    // the second function had a shorter timeout.
			    return cb();
			});

		});
  }
};

