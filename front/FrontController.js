module.exports = {
	
	index:function(req,res) {
		res.locals.layout = false;


		return res.view('about');
	},	
	index2:function(req,res) {
		res.locals.layout = false;

		return res.view('contact');
	}
};

