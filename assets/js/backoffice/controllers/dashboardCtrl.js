app.controller('dashboardCtrl',['$scope','$stateParams','filterFilter','$state','$filter','count',
function dashboardCtrl($scope,$stateParams,filterFilter ,$state,$filter,count) {
	
	console.log('DASHBOARD CTRL');

	$scope.count=count;

	console.log($scope.count);
	console.log(getIndexInBy($scope.maintabs,'name','projects'));
	$scope.showProject = (typeof(getIndexInBy($scope.maintabs,'name','projects')) === 'undefined') ? false : true;
	$scope.showAvis= (typeof(getIndexInBy($scope.maintabs,'name','newsletters')) === 'undefined') ? false : true;
	$scope.showClient= (typeof(getIndexInBy($scope.userstabs,'name','client')) === 'undefined') ? false : true;
	console.log($scope.showProject);
	console.log($scope.showAvis);
	console.log($scope.showClient);
// 	console.log($scope.maintabs);
// console.log($scope.articlestabs);
// console.log($scope.projectstabs);
	console.log($scope.userstabs);

}]);