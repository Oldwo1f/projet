/**
* Project.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
    schema: true,
    attributes: {
      title : {type:'string',required:true},
        content : {type:'text',required:true,defaultTo:null},
        shortcontent : {type:'text',defaultTo:null},
        description : {type:'text',defaultTo:null},
        rewriteurl : {type:'string',defaultTo:null},
      keyword : {type:'string',defaultTo:null},
      date : {type:'datetime',required:true},
      rank : {type:'int'},
      // category : {type:'string'},
      status : {type:'string',required:true},
      category: {
      model: 'categoryProject',
            required:true
    },
        images: {
            collection: 'image',
            via: 'project'
        }
    },
    beforeDestroy: function (values, cb) {
        sails.log('BEFOREDESTROY USER')
        Project.findOne(values.where.id).populate('images').exec(function(err,cat) {
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

