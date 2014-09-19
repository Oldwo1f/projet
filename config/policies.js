/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your controllers.
 * You can apply one or more policies to a given controller, or protect
 * its actions individually.
 *
 * Any policy file (e.g. `api/policies/authenticated.js`) can be accessed
 * below by its filename, minus the extension, (e.g. "authenticated")
 *
 * For more information on configuring policies, check out:
 * http://sailsjs.org/#!documentation/
 */
var extend = require('node.extend');
try {
   var policiesclient = require("./front/policiesclient.js");
}
catch (e) {
	console.log(e);
   policiesclient={};
}

var policies = {

  // Default policy for all controllers and actions
  // (`true` allows public access)
  '*': 'ensureAuth', 
  // '*': true,
	// Here's an example of mapping some policies to run before
  // a controller and its actions
	'front/FrontController': {
		
		'*': true,
		// tendance:'ensureAuth',
	},
	FileController: {
		
		'*': true,
	},
	BackofficeController: {
		
		'*': 'ensureAuth',
		index:true,
		login:true,
	},
	UserController: {
		// '*': true,
		'*': 'ensureAuth',
		'editMe': 'ensureAuth',
		'getMe': 'ensureAuth',
		'login': true,
	},
	AnalyticsController: {
		'*': true,
		
		// 'users':true
	},
	// projectController: {
	// 	'*': 'ensureAuth',
	// 	'getAll': true,
	// 	'get': true
	// }

};

policies = extend(policies, policiesclient); 

console.log(policies);
console.log('-------------------<<<<< policies');
module.exports.policies= policies;