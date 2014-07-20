app.controller('appCtrl',['$scope','configService',
function appCtrl($scope,configService) {

	$scope.maintabs=configService.maintabs;
	$scope.articlestabs=configService.articlestabs;
	$scope.projectstabs=configService.projectstabs;
	


	$scope.articleResizeImageSteps= configService.frontConfig.imageResize.articleCategory;

	console.log($scope.articleResizeImageSteps);


	$scope.$on('$stateChangeStart', 
	function(event, toState, toParams, fromState, fromParams){
		console.log(toState);
		console.log(toParams);
		var deep = toState.url.split('/');
		for (var i = $scope.maintabs.length - 1; i >= 0; i--) {
			if(typeof toState.data != "undefined"){
				if($scope.maintabs[i]['name']===toState.data.mainTabs)
	    			$scope.maintabs[i].active = true
	    		else	
	    			$scope.maintabs[i].active = false
			}
		};
		if(toState.data.mainTabs === "articles")
		{
				console.log('-----------------------------------------');
			for (var i = $scope.articlestabs.length - 1; i >= 0; i--) {
				if(typeof toState.data != "undefined"){
					if($scope.articlestabs[i]['name']===toState.data.articlesTabs)
		    			$scope.articlestabs[i].active = true
		    		else	
		    			$scope.articlestabs[i].active = false
				}
			};
		}
	    // if(toState.url)
	})



















}]);