/**
* Project.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
    schema: true,
    attributes: {
        
        date : {type:'datetime',required:true},
        rank : {type:'int'},
        status : {type:'string',required:true},
        category: {
            model: 'categoryProject',
        },
        translations: {
            collection: 'projectTranslation',
            via: 'project'
        },
        images: {
            collection: 'image',
            via: 'project'
        }
    },
    beforeDestroy: function (values, cb) {
        sails.log('BEFOREDESTROY USER')
        Project.findOne(values.where.id).populate('images').populate('translations').exec(function(err,item) {
            console.log(item);
            console.log(item.images);
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
                    ProjectTranslation.destroy(item.id).exec(function(err, result) {
                        callback(err,result)
                })
                }, function(err, results){
                    sails.log('FINISH DESTROY ALL IMG')
                    console.log(err);
                    // results is now an array of stats for each file
                    cb();

                });


            });
        });
    }
};

