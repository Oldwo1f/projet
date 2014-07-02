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
app.controller('articlesCtrl',['$scope','filterFilter','articlesService','$filter','$state',
function articlesCtrl($scope,filterFilter,articlesService,$filter,$state) {
console.log('appCtrl');
	$scope.articles= articlesService.articles;
	$scope.slug = '';
	$scope.filterActif = true;
	$scope.filterInactif = true;
	$scope.filterNew = true;
	$scope.newArticle={'working':false,'title':'','date':null}
	var filteredArray=$scope.articles;
	// $scope.$watch('maintabs',function  () {
	// 	// console.log($scope.maintabs);
	// },true);


	$scope.$watch('articles',function  () {
		// console.log($scope.slug);
		// console.log($scope.filterActif);
		// console.log($scope.filterInactif);
		// console.log($scope.filterNew);
		$scope.nbChecked = filterFilter(filteredArray,{checked : true}).length;
		$scope.allchecked = ($scope.nbChecked == filteredArray.length);

		if($state.is('/.articles.articles.edit'))
		{
			// $state.go('/.articles.articles')
		}


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

	$scope.submitNewArticle=function() {
		console.log('submitNewArticle');
		articlesService.addNew($scope.newArticle);
		$scope.newArticle={'working':false,'title':'','date':null}
		$scope.order='false';
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

		console.log(filterFilter($scope.articles,{checked : true})[0].id);


		if($state.is('/.articles.articles.edit'))
		{
			$state.go('^.edit',{id: filterFilter($scope.articles,{checked : true})[0].id})
		}
		else
		{
			$state.go('.edit',{id: filterFilter($scope.articles,{checked : true})[0].id})
		}
	}
	$scope.dblclick =function(article){
		$scope.checkAll(true);
		article.checked = true;
		$scope.linkeditProjet()
	}


}]);

app.controller('editarticlesCtrl',['$scope','$stateParams','filterFilter','articlesService','$state',
function editarticlesCtrl($scope,$stateParams,filterFilter,articlesService ,$state) {
	
	
	$scope.article = filterFilter(articlesService.articles,{id:$stateParams.id});
	$scope.article = $scope.article[0];
	$scope.article.checked=false
	setTimeout(function(){
		// console.log($('tr.ligne[rel="'+$stateParams.id+'"]').);
		// var lignemodif = ;

		$('tr.ligne[rel="'+$stateParams.id+'"]').after($('.ligneModif')).hide();
		console.log($('tr.ligneModif'));
		$(document).bind('click',function(e) {
			console.log('hehehereree');
			
			// console.log($('tbody.AppendLine tr:last-child'));
			// console.log($('.ligneModif'));
			// 	console.log($('tbody.AppendLine tr:last-child'));
			// $('tbody.AppendLine tr:last-child').after(lignemodif);
		  $state.go('^')
		  $(document).unbind('click');
		});

		$('tr.ligneModif').click(function  (e) {
		  e.stopPropagation();
			// body...
		});

	},1)



	// console.log($('.ligneModif').html());
	// $('.ligne[rel="'+$stateParams.id+'"]')
	

	// console.log($scope.article);

}]);