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
  '*': ['isIntern'],
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
		
		'*': ['isIntern'],
		// '*': true,
		index:true,
		login:true,
	},
	UserController: {
		// '*': true,
		'*': ['isIntern'],
		'editMe': 'ensureAuth',
		'getMe': 'ensureAuth',
		'login': true,
		'add': 'isAdmin'
	},
	AnalyticsController: {
		// '*': true,
		
		// 'users':true
	},
	envoiController: {
		'*': 'ensureAuth',
		'desincription': true,
		'bounce': true,
	}

};

policies = extend(policies, policiesclient); 

console.log(policies);
console.log('-------------------<<<<< policies');
module.exports.policies= policies;