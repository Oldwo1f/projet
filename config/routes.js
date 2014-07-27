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

  '/': 'BackofficeController.index',
  '/home': 'BackofficeController.home',
  '/vid': 'BackofficeController.vid',
  '/dashboard': 'BackofficeController.dashboard',
  '/contact': 'BackofficeController.contact'
  

};
routes = extend(routes, frontroutes);
module.exports.routes = routes;
