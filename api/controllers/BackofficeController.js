/**
 * BackofficeController
 *
 * @description :: Server-side logic for managing backoffices
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	
	index:function(req,res) {


		return res.view('admin');
	}
};

