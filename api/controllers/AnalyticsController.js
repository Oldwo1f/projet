/**
 * AnalitycsController
 *
 * @description :: Server-side logic for managing analitycs
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var GA = require('googleanalytics');

module.exports = {
	login:function(req,res) {
		console.log('ANNALYTICS LOGIN');
	    util = require('util'),
	    config = {
	        "user": "alexismomcilovic@gmail.com",
	        "password": "Alexis09"
	    },
	    ga = new GA.GA(config);

		ga.login(function(err, token) {
			console.log(err);
			if(err)
			{ res.status(401).end()}
		console.log('TOKEN='+ token);

			var dimensions = [
			  'ga:date',
			  'ga:month',
			  'ga:isoYear'
			];

			var metrics = [
			  'ga:pageviews',
			  'ga:visitors',
			];
		    var options = {
		        'ids': 'ga:78972001',
		        'start-date': '2014-08-01',
		        'end-date': '2014-09-01',
		        'dimensions': dimensions.join(','),
		        'metrics':  metrics.join(','),
		    };

		    ga.get(options, function(err, entries) {
		    	console.log('fin get');
		    	console.log(err);
		    	console.log(JSON.stringify(entries));
		       res.send(JSON.stringify(entries));
		    });
		});

	}
};

