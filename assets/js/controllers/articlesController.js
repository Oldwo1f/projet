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
app.controller('articlesCtrl',['$scope','filterFilter','articlesService','$filter',
function articlesCtrl($scope,filterFilter,articlesService,$filter,articlesFilter) {
console.log('appCtrl');
	$scope.articles= articlesService.articles;
	$scope.slug = '';
	$scope.filterActif = true;
	$scope.filterInactif = true;
	$scope.filterNew = true;
	$scope.newArticle={'working':false,'title':'','date':null}
	var filteredArray;
	// $scope.$watch('maintabs',function  () {
	// 	// console.log($scope.maintabs);
	// },true);


	$scope.$watch('articles',function  () {
		// console.log($scope.slug);
		// console.log($scope.filterActif);
		// console.log($scope.filterInactif);
		// console.log($scope.filterNew);
		
		// $scope.allchecked = ($scope.nbChecked == filteredArray.length);

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

}]);