/**
 * AbonneController
 *
 * @description :: Server-side logic for managing abonnes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	add:function(req,res) {
		console.log(req.params.id);
		console.log(req.body);
		Mailinglist.findOne(req.params.id).exec(function(err,list) {
			console.log(list);
			console.log(err);
			
			Abonne.create(req.body).exec(function(err,abonne) {
				console.log(abonne);
				if(err)
				{
					// console.log(err);
					return res.status(400).send({ error: err });
				}
				list.abonnes.add(abonne)
				list.save(function() {

					res.send(abonne)
				});

			})

		})

	},
	addlist:function(req,res) {
		console.log(req.params.id);
		console.log(req.body);
		Mailinglist.findOne(req.params.id).exec(function(err,list) {
			console.log(list);
			// console.log(err);
			async.map(req.body,
			function(item,callback) {
				Abonne.create({email:item}).exec(function(err,abonne) {
					if(err)
						callback(err);
					list.abonnes.add(abonne)
					list.save(function() {
						callback(null,abonne)
					});
				})
			}
			,function(err,results) {
				if(err)
					return res.status(400).send({ error: err });


				res.send(results)
			})

			

		})

	}
};

