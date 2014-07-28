module.exports = {

  attributes: {
  		title : {type:'string',required:true},
  		content : {type:'text'},
  		date : {type:'datetime'},
  		rank : {type:'int'},
  		status : {type:'string'},
  		categories: {
			collection: 'categoryProject',
			// via: 'projects',
   //          dominant:true
		}
  }
};
