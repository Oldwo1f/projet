/**
 * CategoryController
 *
 * @description :: Server-side logic for managing categories
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	add:function(req,res) {
		sails.log('HERE  NEW ADD catPROJ FUNCTION')


		console.log(req.body);
		var catProj={
			// title : req.body.title,
		};
		var translation ={
			lang : 'fr',
			title : req.body.title,
		}


		CategoryArticle.create(catProj).exec(function(err,item) {

			console.log('COCOCOCOCOCOCOCOCOOOCOCOCOCOCCOOCOCOCOCCOCOCOCOOCOCO');
			console.log(item);
			if(err)
			{
				console.log(err);
				return res.status(400).send({ error: err });
			}
			console.log(item);
			console.log('thisthisthisthisthisthisthisthisthisthis');
			CategoryArticleTranslation.create(translation).exec(function(err,trans) {
				if(err)
				{
					// console.log(err);
					return res.status(400).send({ error: err });
				}
				item.translations.add(trans)
				console.log(trans);
				console.log('sucess');
				item.save(function(err,item) {
					console.log(err);
					console.log('-----');
					console.log(item);
					return res.status(200).send(item);
				});

			});

		});

	},
	edit:function(req,res) {
		sails.log('HERE  EDIT Cat FUNCTION')

		CategoryArticle.findOne(req.body.id).exec(function(err,item) {

			if(err)
			{
				console.log(err);
				return res.status(400).send({ error: err });
			}
			// console.log(item);

			item.category = req.body.category;
			item.date = req.body.date;
		
			async.map(req.body.translations, function(translation, cb) {
				
				CategoryArticleTranslation.findOrCreate({id: translation.id}, translation,function(err, result) {
					console.log('RESRESRESRESRESRESRESRESRESRESRESRESR');
					// console.log(translation);
					CategoryArticleTranslation.update(result.id,translation).exec(function(err,result) {
						if (err) {return res.status(400).send({ error:err})}
						sails.log(result); 
						console.log(result[0].categoryArticle);
						if(result[0].categoryArticle)
						{
							console.log('ALlREADY');
							cb(err,result[0]);
						}else{
							item.translations.add(result[0])
							item.save(cb)
						}
					})
					
				});
			}, function done (err, tagRecords) {
				if (err) {return res.status(400).send({ error:err})}

				return res.status(200).send(item);
			});
		});
	}
};

