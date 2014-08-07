/**
* Article.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  		title : {type:'string',required:true},
  		content : {type:'text'},
  		date : {type:'datetime'},
  		rank : {type:'int'},
  		category : {type:'string'},
  		status : {type:'string'},
  		category: {
			collection: 'category',
		}
  }
};
