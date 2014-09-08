app.controller('navbarCtrl',['$scope','configService','$state','$location','$auth','accountService','me',
function navbarCtrl($scope,configService,$state,$location,$auth,accountService,me) {

	console.log(me);
	$scope.me= me;
	// if($auth.isAuthenticated())
	// {
	// 	// setTimeout(function() {
	// 	accountService.getProfile().then(function(data) {
	// 		console.log(data);
	// 		$scope.me = data
	// 	});
	// 	// },3000)
	// 		console.log('IS AUTHENTICATED');
		
	// }
	// console.log($scope.me);
	// $scope.me = accountService.me
	// $scope.$apply()
	// console.log($scope.me);
	// console.log();
	// $scope.backState=function() {
	// 	$location.path('/profile')
	// };

	$scope.profile=function() {
		$location.path('/profile')
	};

	// console.log($scope.me);

	// $scope.articleResizeImageSteps= configService.frontConfig.imageResize.articleCategory;
	$scope.logout=function() {
		$auth.logout();
		$state.go('/login')
	};
	// console.log($scope.articleResizeImageSteps);

























}]);