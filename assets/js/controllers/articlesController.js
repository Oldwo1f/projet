app.filter('shearchArticle', function() {
  return function(input, field, regex) {
      var patt = new RegExp(regex);      
      var out = [];
      for (var i = 0; i < input.length; i++){
          if(patt.test(input[i]['title']) || patt.test(input[i]['content']))
              out.push(input[i]);
      }      
    return out;
  };
});
app.filter('shearchArticleToRemoveCheck', function() {
  return function(input, field, regex) {
      var patt = new RegExp(regex);      
      var out = [];
      for (var i = 0; i < input.length; i++){
          if(!patt.test(input[i]['title']) && !patt.test(input[i]['content']))
              out.push(input[i]);
      }      
    return out;
  };
});

app.controller('articlesCtrl',['$scope','filterFilter','articlesService',
function articlesCtrl($scope,filterFilter,articlesService) {
console.log('appCtrl');
	$scope.articles= articlesService.articles;

	// $scope.$watch('maintabs',function  () {
	// 	// console.log($scope.maintabs);
	// },true);


	$scope.$watch('articles',function  () {
		console.log(articlesService.articles);

		$scope.nbChecked = filterFilter($scope.articles,{checked : true}).length;
		$scope.allchecked = ($scope.nbChecked == filterFilter($scope.articles,$scope.slug).length);

	},true);
	$scope.$watch('slug',function  () {
console.log(filterFilter($scope.articles,'shearchArticleToRemoveCheck:'+$scope.slug));
		filterFilter($scope.articles,'shearchArticleToRemoveCheck').forEach(function(article) {
			console.log(article);
			article.checked = false;
		});
		$scope.nbChecked = filterFilter($scope.articles,{checked : true}).length;

		$scope.allchecked = ($scope.nbChecked == filterFilter($scope.articles,{'name':$scope.slug}).length);

	},true);






	$scope.checkAll=function(allchecked) {
		allchecked = !allchecked;
		$scope.articles.forEach(function(article) {
			article.checked = allchecked;
		});
	};

}]);