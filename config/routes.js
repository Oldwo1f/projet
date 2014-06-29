
var extend = require('node.extend');
var frontroutes = require("../front/routes.js");

// var routes 
var routes={

  '/': 'BackofficeController.index'
  

};
routes = extend(routes, frontroutes);
console.log(routes);
module.exports.routes = routes;
