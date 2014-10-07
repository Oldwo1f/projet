module.exports = {
    schema: true,
    attributes: {
      lang : {type:'string',required:true},
  		title : {type:'string',required:true},
      content : {type:'text',required:true,defaultTo:null},
      shortcontent : {type:'text',defaultTo:null},
      description : {type:'text',defaultTo:null},
      rewriteurl : {type:'string',defaultTo:null},
      keyword : {type:'string',defaultTo:null},
  		place : {type:'string',defaultTo:null},
      article: {
        model: 'article',
      }
    }
}