/**
 * BackofficeController
 *
 * @description :: Server-side logic for managing backoffices
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	
	index:function(req,res) {
		res.locals.layout = 'layout';


		return res.view('admin');
	},
	home:function(req,res) {
		res.locals.layout = 'layout';


		return res.view('homepage');
	},
	contact:function(req,res) {

		return res.view('contact');
	},
	dashboard:function(req,res) {


		return res.view('dashboard');
	}
};

