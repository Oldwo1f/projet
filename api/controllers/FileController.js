/**
 * FileController
 *
 * @description :: Server-side logic for managing files
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var fs =require('fs');

module.exports = {
	image:function(req,res) {

		sails.log(req.params)

		var filePath = 'uploads/'+req.params.size+'/'+req.params.name;
		sails.log(filePath);
	    var stat = fs.statSync(filePath);

	    console.log(stat);
	    res.writeHead(200, {
	        // 'Content-Type': 'image/',
	        'Content-Length': stat.size
	    });

	    var readStream = fs.createReadStream(filePath);
	    // We replaced all the event handlers with a simple call to readStream.pipe()
	    readStream.pipe(res);


		// res.pipe()

	}
};

