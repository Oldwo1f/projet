/**
 * ProjectController
 *
 * @description :: Server-side logic for managing projects
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	getAll:function(req,res,next) {
		// console.log('GETALL');
		// Project.find().populateAll().exec(function(err,allitems) {
		// 	console.log(err);

		// 	async.each(allitems,function(item,cb) {
		// 		console.log(item);
		// 		if(typeof(item.category))
		// 		{
		// 			CategoryProject.find(item.category.id).populateAll().exec(function(err,object) {
		// 				console.log('objectobjectobject');
		// 				var  deep = _.cloneDeep(item.category)
		// 				delete item.category
		// 				item.category = _.merge(deep,object[0])
		// 				cb(null,object);
		// 			})	
		// 		}else
		// 		{
		// 			cb(null,'noCategory');
		// 		}
		// 	},function(err) {
		// 		if(err)
		// 			return res.status(400).send(err)
		// 		return res.send(allitems)

		// 	})


		// })
	next();

	},
	add:function(req,res) {
		sails.log('HERE  NEW ADD USER FUNCTION')


		console.log(req.body);
		var project={
			status:'new',
			category: req.body.category,
			date: req.body.date
		};
		var translation ={
			lang : req.body.lang || 'fr',
			content : req.body.translationFR.content,
			shortcontent : req.body.translationFR.shortcontent,
			title : req.body.translationFR.title,
			keyword : req.body.translationFR.keyword,
			description : req.body.translationFR.description,
			rewriteurl : req.body.translationFR.rewriteurl,
		}


		Project.create(project).exec(function(err,proj) {

			if(err)
			{
				// console.log(err);
				return res.status(400).send({ error: err });
			}
			console.log(proj);
			ProjectTranslation.create(translation).exec(function(err,trans) {
				if(err)
				{
					// console.log(err);
					return res.status(400).send({ error: err });
				}
				proj.translations.add(trans)
				console.log(trans);
				console.log('sucess');
				proj.save(function(err,item) {
					console.log(err);
					console.log('-----');
					console.log(item);
					return res.status(200).send(item);
				});

			});

		});

	},
	edit:function(req,res) {
		sails.log('HERE  EDIT USER FUNCTION')

		Project.findOne(req.body.id).exec(function(err,proj) {

			if(err)
			{
				console.log(err);
				return res.status(400).send({ error: err });
			}
			// console.log(proj);

			proj.category = req.body.category;
			proj.date = req.body.date;
			console.log(proj);
			proj.save(function(err,proj) {
				async.map(req.body.translations, function(translation, cb) {
					
					ProjectTranslation.findOrCreate({id: translation.id}, translation,function(err, ress) {
						console.log('RESRESRESRESRESRESRESRESRESRESRESRESR');
						// console.log(translation);
						ProjectTranslation.update(ress.id,translation).exec(function(err,result) {
							if (err) {return res.status(400).send({ error:err})}
							sails.log(result); 
							console.log(result[0].project);
							if(result[0].project)
							{
								console.log('ALlREADY');
								cb(err,result[0]);
							}else{
								proj.translations.add(result[0])
								proj.save(cb)


								console.log(this);
							}
						})
						
					});
				}, function done (err, tagRecords) {
					if (err) {return res.status(400).send({ error:err})}
					return res.status(200).send(proj);
					// Project.findOne(proj.id).populateAll().exec(function(err,proj2) {

					// 	if(typeof(proj2.category))
					// 	{
					// 		CategoryProject.find(proj.category.id).populateAll().exec(function(err,object) {
					// 			console.log('objectobjectobject');
					// 			var  deep = _.cloneDeep(proj2.category)
					// 			console.log(proj2.category);
					// 			delete proj2.category
					// 			proj2.category = _.merge(deep,object[0])
					// 			console.log(proj2);
					// 			var deep2 = _.cloneDeep(proj2)
					// 			console.log(JSON.stringify(proj2));
					// 			console.log('*********************************************************');
					// 			console.log(JSON.stringify(deep2));
					// 			return res.status(200).send(JSON.stringify(deep2));
					// 		})	
					// 	}else{
					// 		return res.status(200).send(proj2);

					// 	}


					// });	

				});
			})
		});
	}


};

