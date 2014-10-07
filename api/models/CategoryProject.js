/**
* Category.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
var async = require('async');
module.exports = {
  schema: true,
  attributes: {
  		// title : {type:'STRING'},
  	images: {
			collection: 'image',
			via: 'project'
		},
    translations: {
        collection: 'categoryProjectTranslation',
        via: 'categoryProject'
    }
  } ,
  beforeDestroy: function (values, cb) {
	
  	sails.log('BEFOREDESTROY Category')
	CategoryProject.findOne(values.where.id).populate('images').populate('translations').exec(function(err,item) {
		
			sails.log(item.images.length)
		async.each(item.images, function(item,callback) {

			console.log('item');
			console.log(item);
			Image.destroy(item.id).exec(function(err, result) {
				callback(err,result)
			})
		}, function(err, results){
			sails.log('FINISH DESTROY ALL IMG')
			 async.each(item.translations, function(item,callback) {
                    console.log('item');
                    console.log(item);
                    CategoryProjectTranslation.destroy(item.id).exec(function(err, result) {
                        callback(err,result)
                })
                }, function(err, results){
                    sails.log('FINISH DESTROY translation')
                    console.log(err);
                    // results is now an array of stats for each file
                    cb();

                });
		});
			

	});



  }
};

