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
  'put /api/me': 'UserController.getMe',
  'post /user' : 'UserController.add',

};
routes = extend(routes, frontroutes); 
module.exports.routes = routes;
