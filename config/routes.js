var extend = require('node.extend');
try {
   var frontroutes = require("../front/routes.js");
}
catch (e) {
   frontroutes={};
}
// var routes 
var routes={

  '/': 'BackofficeController.index',
  '/home': 'BackofficeController.home',
  '/dashboard': 'BackofficeController.dashboard',
  '/contact': 'BackofficeController.contact'
  

};
routes = extend(routes, frontroutes);
console.log(routes);
module.exports.routes = routes;
