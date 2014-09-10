var extend = require('node.extend');
try {
   var frontroutes = require("./front/routesclients.js");
   console.log(frontroutes);
}
catch (e) {
	console.log(e);
   frontroutes={};
}
// var routes 
var routes={

  '/admin': 'BackofficeController.index',
  '/login': 'BackofficeController.login',
  '/home': 'BackofficeController.home',
  '/vid': 'BackofficeController.vid',
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
  'post /project' : 'ProjectController.add',
  'put /project/:id' : 'ProjectController.edit',
  //PROJECTCategory
  'post /categoryProject' : 'CategoryProjectController.add',
  'put /categoryProject/:id' : 'CategoryProjectController.edit',

};
routes = extend(routes, frontroutes); 
module.exports.routes = routes;
