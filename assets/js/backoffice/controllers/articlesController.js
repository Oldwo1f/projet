
app.controller('articlesCtrl',['$scope','filterFilter','articlesService','$filter','$state','articles',
function articlesCtrl($scope,filterFilter,articlesService,$filter,$state,articles) {

	$scope.articles= articles;
	$scope.order='date';
	$scope.reverse=true;
	$scope.filterActif = true;
	$scope.filterInactif = true;
	$scope.filterNew = true;
	$scope.totalChecked = function()
	{
		if(filterFilter($scope.articles,{checked : true}).length == $scope.articles.length)
	 		$scope.allChecked = true;
	 	else
	 		$scope.allChecked = false;
	 	return filterFilter($scope.articles,{checked : true}).length;
	}
	$scope.toggleAllcheck = function()
	{
		allchecked = !$scope.allChecked;
		$scope.articles.forEach(function(article) {
			article.checked = allchecked;
		});
	}
	$scope.linkedit=function(id){
		// console.log(filterFilter($scope.articles,{checked : true}));
		if(id){
			clearSelection()
			$state.go('/.articles.articles.edit',{id: id})
		}
		else
			$state.go('/.articles.articles.edit',{id: filterFilter($scope.articles,{checked : true})[0].id})
	}
	$scope.linkeditimages =function(id){
		if(id){
			clearSelection()
			$state.go('/.articles.articles.editimage',{id: id})
		}
		else
			$state.go('/.articles.articles.editimage',{id: filterFilter($scope.articles,{checked : true})[0].id})
	}
	$scope.linkadd =function(){
			$state.go('/.articles.articles.add')
	}


	$scope.removeselected =function(){
			articlesService.remove(filterFilter($scope.articles,{checked : true}))
	}
	$scope.changestatus = function(status) {
		articlesService.changeStatusArticle(filterFilter($scope.articles,{checked : true}),status)
		
	};

	$scope.sortFunction =function(val){

		if($scope.order === 'category')
		{
			console.log(val[$scope.order]);
			return val[$scope.order].title;
		}else
		{
			return val[$scope.order];
		}
	}
	$scope.getCat =function(val){
		if(!$scope.filterActif)
		{
			if(val.status ==='actif'){
				val.checked=false;
				return false;
			}
		}
		if(!$scope.filterInactif)
		{
			if(val.status ==='inactif'){
				val.checked=false;
				return false;
			}
		}
		if(!$scope.filterNew)
		{
			if(val.status ==='new'){
				val.checked=false;
				return false;
			}
		}
		return true;
	}
	$scope.articlefilter =function(val){
		var patt = new RegExp($scope.slug,'i');
		
		if(patt.test(val.title))
			return true;
		if(patt.test(val.category.title))
			return true;
		if(patt.test($filter('date')(val.date,'dd MMMM')))
			return true;

		val.checked=false;
		return false;
	}




	
	

}]);

app.controller('addarticlesCtrl',['$scope','$stateParams','filterFilter','articlesService','$state','categories',
function addarticlesCtrl($scope,$stateParams,filterFilter,articlesService ,$state,categories) {
	$scope.categories= categories;
	$scope.newArticle={};
	$scope.newArticle.description='';
	$scope.newArticle.content='';
	$scope.newArticle.shortcontent='';
	$scope.newArticle.title='';
	$scope.newArticle.place='';
	$scope.newArticle.keyword='';
	$scope.newArticle.accroche='';
	$scope.newArticle.rewriteurl='';
	$scope.newArticle.date=new Date();
	$('.newModal').modal();
	$('.newModal').on('hidden.bs.modal',function(e) {
		$state.go('/.articles.articles');
	});

	$scope.timeSet = function() {

		$scope.openDatepicker = false;
	};

	$scope.submitNew=function() {
		$scope.newArticle.status='new';
		articlesService.addNew($scope.newArticle).then(function() {
			$scope.newArticle.title='';
			$state.go('/.articles.articles');
		},function(err) {
			console.log(err);
			console.log(err.error.invalidAttributes);
			if(err.error.invalidAttributes)
			{
				invalAttrs = err.error.invalidAttributes;
				console.log(invalAttrs);
				for(var i in invalAttrs)
				{
					console.log(i);
					$('[name="'+i+'"]').parent().addClass('has-error');
				}
			}
		})
		
	};
}]);
app.controller('editarticlesCtrl',['$scope','$stateParams','filterFilter','articlesService','$state','$filter','article','categories',
function editarticlesCtrl($scope,$stateParams,filterFilter,articlesService ,$state,$filter,article,categories) {
	$scope.categories= categories;
	console.log('modalalalalalallalal');
	$('.editModal').modal();
	$('.editModal').on('hidden.bs.modal',function(e) {
		$state.go('/.articles.articles');
	});
	$scope.editArticle = article;
	console.log($scope.editArticle);
	$scope.editArticle.category = $scope.editArticle.category.id;
	// $scope.$apply();

	$scope.submitEdit = function() {
		articlesService.edit($scope.editArticle).then(function() {
			$('.editModal').modal('hide');
		},function(err) {
			console.log(err);
			console.log(err.error.invalidAttributes);
			if(err.error.invalidAttributes)
			{
				invalAttrs = err.error.invalidAttributes;
				console.log(invalAttrs);
				for(var i in invalAttrs)
				{
					console.log(i);
					$('[name="'+i+'"]').parent().addClass('has-error');
				}
			}
		})
	};


}]);
app.controller('editimagearticlesCtrl',['$scope','$stateParams','filterFilter','articlesService','$state','$filter','article',
function editimagearticlesCtrl($scope,$stateParams,filterFilter,articlesService ,$state,$filter,article) {
	


	$scope.resizeStep = $scope.resizeConfig.article;
	$('.editimageModal').modal();
	$('.editimageModal').on('hidden.bs.modal',function(e) {
		$state.go('/.articles.articles');
	});
	$scope.article = article;
	$scope.submitEdit = function() {
		articlesService.edit(article).then(function() {
			$('.editimageModal').modal('hide');
		})
	};

	$scope.recupImage = function(data) {
		article.images.unshift(data.files)
		articlesService.replace(article)
	};

	$scope.removeimage = function(imagetoremove) {

		articlesService.removeimage(article,imagetoremove)
	};
	$scope.sortableOptions = {
	    update: function(e, ui) {
	     	// console.log(ui); 
	     	startIndex = ui.item.sortable.index;
	     	dropIndex = ui.item.sortable.dropindex;
	     	console.log(startIndex +' ----'+dropIndex);
	     	console.log($scope.article.images);
	     	if(dropIndex<startIndex)
	     	{
	     		for(var i in $scope.article.images)
	     		{
	     			
	     			if($scope.article.images[i].index < startIndex && $scope.article.images[i].index >=dropIndex)
	     			{
	     				$scope.article.images[i].index = $scope.article.images[i].index +1;
	     				articlesService.updateImgIndex($scope.article.images[i],$scope.article);
	     			}
	     			else if($scope.article.images[i].index == startIndex )
	     			{
	     				$scope.article.images[i].index = dropIndex;
	     				articlesService.updateImgIndex($scope.article.images[i],$scope.article);
	     			}
	     			
	     		}

	     	}
	     	if(dropIndex>startIndex)
	     	{
	     		for(var i in $scope.article.images)
	     		{
	     			
	     			
	     			if($scope.article.images[i].index >startIndex && $scope.article.images[i].index <=dropIndex)
	     			{
	     				$scope.article.images[i].index = $scope.article.images[i].index -1;
	     				articlesService.updateImgIndex($scope.article.images[i],$scope.article);
	     			}
	     			else if($scope.article.images[i].index == startIndex)
	     			{
	     				$scope.article.images[i].index = dropIndex;
	     				articlesService.updateImgIndex($scope.article.images[i],$scope.article);
	     			}
	     			
	     		}

	     	}
	     	console.log($scope.article.images);
	     	

		},
		sort:function() {
			// console.log('sort');
		},
		out:function() {
			// console.log('out');
		},
		start:function(e,ui) {
			// console.log('start');
			// console.log($(e.target).height($(e.target).height()-100));
		}
  	};


}]);