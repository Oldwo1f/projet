/**
* Category.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
var async = require('async');
module.exports = {

  attributes: {
  		title : {type:'string',required:true},
  		lang : {type:'string',required:true},
  		categoryProject: {
			model: 'categoryProject',
		},
  } ,
 
};

