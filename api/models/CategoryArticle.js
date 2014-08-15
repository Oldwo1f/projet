/**
* Category.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
var async = require('async');
module.exports = {

  attributes: {
  		title : {type:'STRING',required:true},
  		images: {
			collection: 'image',
			via: 'articlecategory'
		}
  } ,
  beforeDestroy: function (values, cb) {
	
  	sails.log('BEFOREDESTROY USER')
	CategoryArticle.findOne(values.where.id).populate('images').exec(function(err,cat) {
		console.log(cat);
		console.log(cat.images);
			sails.log(cat.images.length)
		async.each(cat.images, function(item,callback) {

			console.log('item');
			console.log(item);
			Image.destroy(item.id).exec(function(err, result) {
				callback(err,result)
			})
		}, function(err, results){
			sails.log('FINISH DESTROY ALL IMG')
			console.log(err);
    		// results is now an array of stats for each file
    		cb();
		});
			

	});



  }
};

