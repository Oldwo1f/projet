/**
* ProjectTranslation.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
      schema: true,
  attributes: {

  		lang : {type:'string',required:true},
        title : {type:'text',defaultTo:null},
        content : {type:'text',defaultTo:null},
        shortcontent : {type:'text',defaultTo:null},
        description : {type:'text',defaultTo:null},
        rewriteurl : {type:'string',defaultTo:null},
        keyword : {type:'string',defaultTo:null},
  		project: {
			model: 'project',
		},
  }
};

