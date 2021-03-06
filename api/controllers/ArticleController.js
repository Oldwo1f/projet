/**
 * ArticleController
 *
 * @description :: Server-side logic for managing articles
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	get:function(req,res,next) {
		console.log('GET');
		Article.findOne(req.params.id).populateAll().exec(function(err,item) {
			console.log(err);

			// async.each(allitems,function(item,cb) {
			// 	console.log(item);
				if(typeof(item.category)!='undefined')
				{
					console.log('TYPEOF item.category'+ item.category);
					CategoryArticle.find(item.category.id).populateAll().exec(function(err,object) {
						console.log('objectobjectobject');
						var  deep = _.cloneDeep(item.category)
						delete item.category
						item.category = _.merge(deep,object[0])
						if(err)
							return res.status(400).send(err)
						return res.send(item);
					})	
				}else{
					return res.send(item);
				}
			


		})
		// next();

	},getAll:function(req,res,next) {
		console.log('GETALL');
		Article.find().populateAll().exec(function(err,allitems) {
			console.log(err);

			async.each(allitems,function(item,cb) {
				console.log(item);
				if(typeof(item.category)!='undefined')
				{
					CategoryArticle.find(item.category.id).populateAll().exec(function(err,object) {
						console.log('objectobjectobject');
						var  deep = _.cloneDeep(item.category)
						delete item.category
						item.category = _.merge(deep,object[0])
						cb(null,object);
					})	
				}else
				{
					cb(null,'noCategory');
				}
			},function(err) {
				if(err)
					return res.status(400).send(err)
				return res.send(allitems)

			})


		})
		// next();

	},
	add:function(req,res) {
		sails.log('HERE  NEW ADD USER FUNCTION')


		console.log(req.body);
		var article={
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
			place : req.body.translationFR.place,
		}
		console.log(translation);

		Article.create(article).exec(function(err,proj) {

			if(err)
			{
				// console.log(err);
				return res.status(400).send({ error: err });
			}
			console.log(proj);
			ArticleTranslation.create(translation).exec(function(err,trans) {
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
		sails.log('HERE  EDIT ARTICLE FUNCTION')
		console.log(req.body);
		Article.findOne(req.body.id).exec(function(err,proj) {

			if(err)
			{
				console.log(err);
				return res.status(400).send({ error: err });
			}
			// console.log(proj);

			proj.category = req.body.category;
			proj.date = req.body.date;
			proj.status = req.body.status;
			console.log(proj);
			console.log('--------------');
			proj.save(function(err,proj2) {
				async.map(req.body.translations, function(translation, cb) {
					
					ArticleTranslation.findOrCreate({id: translation.id}, translation,function(err, ress) {
						console.log('RESRESRESRESRESRESRESRESRESRESRESRESR');
						if(err)
							return res.status(400).send({ error:err})
						// console.log(translation);
						ArticleTranslation.update(ress.id,translation).exec(function(err,result) {
							if (err) {return res.status(400).send({ error:err})}
							sails.log(result); 
							console.log(result[0].article);
							if(result[0].article)
							{
								console.log('ALlREADY');
								cb(err,result[0]);
							}else{
								proj2.translations.add(result[0])
								proj2.save(cb)


								console.log(this);
							}
						})
						
					});
				}, function done (err, tagRecords) {
					if (err) {return res.status(400).send({ error:err})}

						console.log(proj);
					// return res.status(200).send(proj);
					Article.findOne(proj.id).populateAll().exec(function(err,proj2) {

						if(typeof(proj2.category)!='undefined')
						{
							CategoryArticle.find(proj.category.id).populateAll().exec(function(err,object) {
								console.log('objectobjectobject');
								var  deep = _.cloneDeep(proj2.category)
								console.log(proj2.category);
								delete proj2.category
								proj2.category = _.merge(deep,object[0])
								console.log(proj2);
								var deep2 = _.cloneDeep(proj2)
								console.log(JSON.stringify(proj2));
								console.log('*********************************************************');
								console.log(JSON.stringify(deep2));
								return res.status(200).send(JSON.stringify(deep2));
							})	
						}else{
							return res.status(200).send(proj2);

						}


					});	

				});
			})
		});
	}


};

