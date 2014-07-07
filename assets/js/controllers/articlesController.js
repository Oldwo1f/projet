app.filter('articlesFilter', function() {
  return function(input,regex,actif,inactif,New) {
      var patt = new RegExp(regex);      
      var out = [];
      var pushOK = false;
      for (var i = 0; i < input.length; i++){
      		pushOK = false;
			if(patt.test(input[i]['title']) || patt.test(input[i]['content']) || patt.test(input[i]['category']))
			{
				if(actif){
					if( input[i]['status'] === "Actif")
						pushOK =true;
			}
			if(inactif){
				if( input[i]['status'] === "Inactif")
					pushOK =true;
			}
			if(New){
				if( input[i]['status'] === "New")
					pushOK =true;	
			}
			if(pushOK)
				out.push(input[i]);
			else
				input[i]['checked'] = false;

			}else{
					input[i]['checked'] = false;
			}
          

      }      
    return out;
  };
});
app.controller('articlesCtrl',['$scope','filterFilter','articlesService','articlescategoryService','$filter','$state',
function articlesCtrl($scope,filterFilter,articlesService,articlescategoryService,$filter,$state) {
console.log('appCtrl');
	$scope.articles= [];
	$scope.categories= [];
	$scope.slug = '';
	$scope.filterActif = true;
	$scope.filterInactif = true;
	$scope.filterNew = true;
	$scope.newArticle={'working':false,'title':'','date':null}
	var filteredArray=$scope.articles;
	// $scope.$watch('maintabs',function  () {
	// 	// console.log($scope.maintabs);
	// },true);

	articlesService.fetchArticles().then(function (data) {
		console.log('.then');
		console.log(data);
         filteredArray = $scope.articles =articlesService.articles = data;
    });


	$scope.$watch('articles',function () {
		// console.log($scope.slug);
		// console.log($scope.filterActif);
		// console.log($scope.filterInactif);
		// console.log($scope.filterNew);
		$scope.nbChecked = filterFilter(filteredArray,{checked : true}).length;
		$scope.allchecked = ($scope.nbChecked == filteredArray.length);

		// if($state.is('/.articles.articles.edit'))
		// {
		// 	$state.go('/.articles.articles')
		// }


	},true);
	// $scope.$watch('slug',function  () {
	// 	// var arrayfiltered = $filter('shearchArticleToRemoveCheck')($scope.articles,$scope.slug)
	// 	// .forEach(function(article) {
	// 	// 	console.log(article);
	// 	// 	article.checked = false;
	// 	// });
	// 	// $scope.nbChecked = filterFilter($scope.articles,{checked : true}).length;

	// 	// $scope.allchecked = ($scope.nbChecked == filterFilter($scope.articles,{'name':$scope.slug}).length);

	// },true);
	$scope.$on('$stateChangeStart',
	function(event, toState, toParams, fromState, fromParams){
	    // event.preventDefault();
	    // console.log(fromParams);
	    // $('tr.ligne[rel="'+fromParams.id+'"]').show();
	    // console.log('herrreeeee');
	})
	$scope.newarticle =function() {
		$scope.newArticle.working = true;
		setTimeout(function(){
			$(document).bind('click',function(e) {
				console.log('newarticle');
			  $scope.exitNew();
			  $scope.$apply();
			  $(document).unbind('click');
			});
		},1);
		$('tr.ligneDajout').click(function  (e) {
		  e.stopPropagation();
		});
	};
	$scope.exitNew=function() {
		$('input[name="title"]').removeClass('bg-danger');
		$scope.newArticle={'working':false,'title':'','date':null};
		$(document).unbind('click');
	};
	$scope.submitNewArticle=function() {
		$(document).unbind('click');
		console.log('submitNewArticle');
		articlesService.addNew($scope.newArticle).then(function success(data) {
			console.log('.thenNew');
			console.log(data);
			$scope.order='false';
			$scope.exitNew();
		},function error(data) {
			console.log('this error');
			console.log(data.error);
			if(data.error.error ==='E_VALIDATION')
			{
				console.log(data.error.invalidAttributes.title);
				if(data.error.invalidAttributes.title)
				{
					console.log('here');
					$('input[name="title"]').addClass('bg-danger');
				}
			}
		});
		
	};



	$scope.filterMainArray=function() {

		filteredArray = $filter('articlesFilter')($scope.articles,$scope.slug,$scope.filterActif , $scope.filterInactif,$scope.filterNew);
		$scope.nbChecked = filterFilter(filteredArray,{checked : true}).length;
		$scope.allchecked =($scope.nbChecked == filteredArray.length)
	};


	$scope.checkAll=function(allchecked) {
		allchecked = !allchecked;
		$filter('articlesFilter')($scope.articles,$scope.slug,$scope.filterActif , $scope.filterInactif,$scope.filterNew).forEach(function(article) {
			article.checked = allchecked;
		});
		$scope.filterMainArray();
	};

	$scope.linkeditProjet =function(id){
			$state.go('/.articles.articles.edit',{id: filterFilter($scope.articles,{checked : true})[0].id})
	}
	$scope.linkeditimages =function(id){
			$state.go('/.articles.articles.editimage',{id: filterFilter($scope.articles,{checked : true})[0].id})
	}
	$scope.dblclick =function(article){
		$scope.checkAll(true);
		article.checked = true;
		clearSelection();
		$scope.linkeditProjet()

	}
	$scope.dblclickimage =function(article){
		$scope.checkAll(true);
		article.checked = true;
		clearSelection();
		$scope.linkeditimages()
	}
	$scope.removeselected=function() {

		filterFilter(filteredArray,{checked : true}).forEach(function(item) {
			articlesService.remove(item);
		})
			
		setTimeout(function() {$scope.nbChecked =0;$scope.$apply();},1)
	};


}]);

app.controller('editarticlesCtrl',['$scope','$stateParams','filterFilter','articlesService','articlescategoryService','$state','$filter',
function editarticlesCtrl($scope,$stateParams,filterFilter,articlesService,articlescategoryService ,$state,$filter) {
	
	
	$scope.article = filterFilter(articlesService.articles,{id:$stateParams.id});
	$scope.article = $scope.article[0];

	articlescategoryService.fetchCategories().then(function (data) {
		console.log('.then');
		console.log(data);
         $scope.categories = data;
    });
	// $scope.article.checked=false;

	$scope.articleToEdit = angular.copy($scope.article);
	$scope.articleToEdit.date =  $filter("date")($scope.articleToEdit.date, 'yyyy-MM-dd');

	$scope.currentCatId = $scope.articleToEdit.category[0].id;
console.log($scope.articleToEdit.category);
console.log($scope.currentCatId);
	//GESTION CLICK OUT
	setTimeout(function(){
		$('tr.ligne[rel="'+$stateParams.id+'"]').after($('.ligneModif')).hide();
		console.log($('tr.ligneModif'));
		$(document).bind('click',function(e) {
		  $scope.exit()
		  $(document).unbind('click');
		});

		$('tr.ligneModif').click(function  (e) {
		  e.stopPropagation();
		});

	},1)
	$scope.exit=function() {
		$state.go('/.articles.articles')
	}

	$scope.submitEditArticle=function(stay) {
		console.log('submitNewArticle');
		console.log(stay);
console.log($scope.articleToEdit);
		articlesService.edit($scope.articleToEdit).then(function success(data) {
			if(stay==='leave')
				console.log(data);
				// $scope.article = $scope.articleToEdit = data;
				// $scope.articles.findBy('')
				$scope.exit()
		},function error(data) {
			console.log('this error');
			console.log(data.error);
			if(data.error.error ==='E_VALIDATION')
			{
				console.log(data.error.invalidAttributes);
				
			}
		});

		// $('tr.ligne[rel="'+$stateParams.id+'"]').after($('.ligneModif')).hide();
	};


}]);
app.controller('editimagearticlesCtrl',['$scope','$stateParams','filterFilter','articlesService','$state','$filter',
function editimagearticlesCtrl($scope,$stateParams,filterFilter,articlesService ,$state,$filter) {
	
	console.log('editimagearticlesCtrl');
	$scope.article = filterFilter(articlesService.articles,{id:$stateParams.id});
	$scope.article = $scope.article[0];
	$scope.article.checked=false;

	$scope.articleToEdit = angular.copy($scope.article);
	// $scope.articleToEdit.date =  $filter("date")($scope.articleToEdit.date, 'yyyy-MM-dd');
	//GESTION CLICK OUT
	setTimeout(function(){
		$('tr.ligne[rel="'+$stateParams.id+'"]').after($('.ligneModifIMG')).addClass('bg-info');
		$(document).bind('click',function(e) {
		  $scope.exit()
		  $(document).unbind('click');
		});

		$('tr.ligneModifIMG').click(function  (e) {
		  e.stopPropagation();
		});
		$('tr.ligne[rel="'+$stateParams.id+'"]').click(function  (e) {
		  e.stopPropagation();
		});

	},1)
	$scope.exit=function() {
		$('tr.ligne[rel="'+$stateParams.id+'"]').removeClass('bg-info');

		$state.go('^')
	}	

	$scope.addImg=function() {
		articlesService.addImg($scope.articleToEdit);
	}

	// $scope.submitEditArticle=function(stay) {
	// 	console.log('submitNewArticle');
	// 	console.log(stay);

	// 	articlesService.edit($scope.articleToEdit);
	// 	if(stay==='leave')
	// 		$scope.exit()
	// 	// $('tr.ligne[rel="'+$stateParams.id+'"]').after($('.ligneModif')).hide();
	// };


}]);