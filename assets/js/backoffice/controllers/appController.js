app.controller('appCtrl',['$scope','configService','$state','$location','$auth','accountService',
function appCtrl($scope,configService,$state,$location,$auth,accountService) {

	$scope.h1=configService.h1;
	$scope.maintabs=configService.maintabs;
	$scope.articlestabs=configService.articlestabs;
	$scope.projectstabs=configService.projectstabs;
	$scope.newsletterstabs=configService.newsletterstabs;
	$scope.galerytabs=configService.galerytabs;
	$scope.userstabs=configService.userstabs;
	$scope.resizeConfig=configService.frontConfig.imageResize;
	$scope.me="";
	moment.locale('fr');
	$scope.navbarOff=false;

	if($auth.isAuthenticated())
	{
		accountService.getProfile().then(function(data) {
			$scope.me = data
		});
		
	}

	$scope.profile=function() {
		$location.path('/profile')
	};

	$scope.logout=function() {
		$auth.logout();
	};








	$scope.$on("$stateChangeStart", function (event, toState, toParams,fromState, fromParams) {

    	$scope.navbarOff=false;
		if(toState.name === "/login"){
			$scope.navbarOff=true;
		}
		if($auth.isAuthenticated())
		{
			if(toState.name === "/")
					$location.path('/dashboard')
			return true;
		}else
		{
			$scope.navbarOff=true;
			// $state.go('/login');
			$location.path('/login')
			return false
		}
    
	});

	$scope.$on('$stateChangeSuccess',function (event, toState, toParams, fromState, fromParams){
		$scope.$previousState = fromState;
		$scope.navbarOff=false;
		if(toState.name === "/login"){
			$scope.navbarOff=true;
			return true;
		}
		var deep = toState.url.split('/');
		for (var i = $scope.maintabs.length - 1; i >= 0; i--) {
			if(typeof toState.data != "undefined"){
				if($scope.maintabs[i]['name']===toState.data.mainTabs)
	    			$scope.maintabs[i].active = true
	    		else	
	    			$scope.maintabs[i].active = false
			}
		};
		if(typeof(toState.data)==='undefined')
			return true
		if(toState.data.mainTabs === "articles")
		{
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
		if(toState.data.mainTabs === "users")
		{
			for (var i = $scope.userstabs.length - 1; i >= 0; i--) {
				if(typeof toState.data != "undefined"){
					if($scope.userstabs[i]['name']===toState.data.usersTabs)
		    			$scope.userstabs[i].active = true
		    		else	
		    			$scope.userstabs[i].active = false
				}
			};
		}
		if(toState.data.mainTabs === "galery")
		{
			for (var i = $scope.galerytabs.length - 1; i >= 0; i--) {
				if(typeof toState.data != "undefined"){
					if($scope.galerytabs[i]['name']===toState.data.galeryTabs)
		    			$scope.galerytabs[i].active = true
		    		else	
		    			$scope.galerytabs[i].active = false
				}
			};
		}
		if(toState.data.mainTabs === "newsletters")
		{
			for (var i = $scope.newsletterstabs.length - 1; i >= 0; i--) {
				if(typeof toState.data != "undefined"){
					if($scope.newsletterstabs[i]['name']===toState.data.newslettersTabs)
		    			$scope.newsletterstabs[i].active = true
		    		else	
		    			$scope.newsletterstabs[i].active = false
				}
			};
		}
		if(toState.name === "/.newsletters.list")
		{
			$('.modal-backdrop').remove();
		}
		if(toState.name === "/.newsletters.envoi")
		{
			$('.modal-backdrop').remove();
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
			
		}
		if(toState.name === "/.projects.category")
		{
			$('.modal-backdrop').remove();
		}
		if(toState.name === "/.projects.projects")
		{
			$('.modal-backdrop').remove();
		}
		if(toState.name === "/.users.user")
		{
			$('.modal-backdrop').remove();
		}
		if(toState.name === "/.users.client")
		{
			$('.modal-backdrop').remove();
		}
		if(fromState.name === "/.projects.category.editimage")
		{
			
		}

		
	})
	
	

















}]);