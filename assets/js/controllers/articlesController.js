app.controller('articlesCtrl',['$scope','articlesService',
function articlesCtrl($scope,articlesService) {
console.log('appCtrl');
	$scope.articles= articlesService.articles;

	// $scope.$watch('maintabs',function  () {
	// 	// console.log($scope.maintabs);
	// },true);


	$scope.$watch('articles',function  () {
		console.log(articlesService.articles);
	},true);

	// $scope.$on('$stateChangeStart', 
	// function(event, toState, toParams, fromState, fromParams){
	// 	for (var i = $scope.maintabs.length - 1; i >= 0; i--) {
	// 		if($scope.maintabs[i]['name']===toState.url)
	//     		$scope.maintabs[i].active = true
	// 	};
	    
	// })



















}]);