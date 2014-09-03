app.controller('appCtrl',['$scope','configService','$state',
function appCtrl($scope,configService,$state) {

	$scope.maintabs=configService.maintabs;
	$scope.articlestabs=configService.articlestabs;
	$scope.projectstabs=configService.projectstabs;
	$scope.galerytabs=configService.galerytabs;
	$scope.resizeConfig=configService.frontConfig.imageResize;
	moment.locale('fr');


	// $scope.articleResizeImageSteps= configService.frontConfig.imageResize.articleCategory;

	console.log($scope.articleResizeImageSteps);


	$scope.$on('$stateChangeSuccess', 
	function(event, toState, toParams, fromState, fromParams){
		console.log(toState);
		// console.log(toParams);
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
		if(toState.data.mainTabs === "projects")
		{
			for (var i = $scope.projectstabs.length - 1; i >= 0; i--) {
				if(typeof toState.data != "undefined"){
					if($scope.projectstabs[i]['name']===toState.data.projectsTabs)
		    			$scope.projectstabs[i].active = true
		    		else	
		    			$scope.projectstabs[i].active = false
				}
			};
		}
		if(toState.name === "/.articles.category")
		{
			$('.modal-backdrop').remove();
		}
		if(toState.name === "/.articles.articles")
		{
			$('.modal-backdrop').remove();
		}
		if(fromState.name === "/.articles.category.editimage")
		{
			console.log('here');
			
		}
		if(toState.name === "/.projects.category")
		{
			$('.modal-backdrop').remove();
		}
		if(toState.name === "/.projects.projects")
		{
			$('.modal-backdrop').remove();
		}
		if(fromState.name === "/.projects.category.editimage")
		{
			console.log('here');
			
		}

		
	})
	
	

















}]);