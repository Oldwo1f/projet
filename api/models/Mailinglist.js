/**
* Mailinglist.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  schema: true,
  attributes: {

        title : {type:'text',defaultTo:null},
  		users: {
			collection: 'user',
		},
		abonnes: {
			collection: 'abonne',
		},
  } ,
  beforeDestroy: function (values, cb) {
	
  	sails.log('BEFOREDESTROY abonnes')
	Mailinglist.findOne(values.where.id).populate('abonnes').exec(function(err,item) {
		
			// sails.log(item.images.length)
		async.each(item.abonnes, function(item,callback) {

			console.log('item');
			console.log(item);
			Abonne.destroy(item.id).exec(function(err, result) {
				callback(err,result)
			})
		}, function(err, results){
			sails.log('FINISH DESTROY ALL ABONNES')
            cb(err,results)
		});
	});
  }
};

