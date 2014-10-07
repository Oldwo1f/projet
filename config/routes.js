var extend = require('node.extend');
try {
   var frontroutes = require("./front/routesclients.js");
}
catch (e) {
	console.log(e);
   frontroutes={};
}
// var routes 
var routes={

  '/admin': 'BackofficeController.index',
  '/login': 'BackofficeController.login',
  '/dashboardcount': 'BackofficeController.count',
  '/init/:what': 'BackofficeController.init',
  '/init/:what/:emailClient': 'BackofficeController.init',
  // '/dashboard': 'BackofficeController.dashboard',
  // '/contact': 'BackofficeController.contact',
  '/file/image/:size/:name': 'FileController.image',
  
  '/auth/login': 'UserController.login',
  '/api/me': 'UserController.getMe',
  'put /edit/me': 'UserController.editMe',
  'put /editpassword/me': 'UserController.editpasswordMe',
  'post /user' : 'UserController.add',
  'get /intern' : 'UserController.intern',
  'get /client' : 'UserController.client',
  'get /anatytics/login' : 'AnalyticsController.login',

  //PROJECT
  'get /project' : 'ProjectController.getAll',
  'get /project/:id' : 'ProjectController.get',
  'post /project' : 'ProjectController.add',
  'put /project/:id' : 'ProjectController.edit',
  //PROJECTCategory
  'post /categoryProject' : 'CategoryProjectController.add',
  'put /categoryProject/:id' : 'CategoryProjectController.edit',

  //Article
  'get /article' : 'ArticleController.getAll',
  'get /article/:id' : 'ArticleController.get',
  'post /article' : 'ArticleController.add',
  'put /article/:id' : 'ArticleController.edit',
  //ArticleCategory
  'post /categoryArticle' : 'CategoryArticleController.add',
  'put /categoryArticle/:id' : 'CategoryArticleController.edit',

  //Abonne
  'post /abonne/:id' : 'abonneController.add',
  'post /mailinglist/:id/addList' : 'abonneController.addlist',
  'post /envoiserie' : 'envoiController.envoiserie',
  'get /getenvoi' : 'envoiController.fetchEnvois',
  'delete /campagne/:id' : 'envoiController.deletecampagne',
  'post /desincription' : 'envoiController.desincription',
  'post /bounce' : 'envoiController.bounce',
  // /mailinglist/'+listId+'/addList
  // 'put /categoryProject/:id' : 'CategoryProjectController.edit',

};
routes = extend(routes, frontroutes); 

console.log(routes);
module.exports.routes = routes;
