app.controller('appCtrl',['$scope',
function appCtrl($scope) {

	$scope.maintabs=[
	{'title':'Dashboard','name' :'dashboard','active':false,'viewName':'dashboardView'},
	{'title':'Gestions des utilisateurs','name' :'users','active':false,'viewName':'usersView'},
	{'title':'Gestion du blog','name' :'articles','active':false,'viewName':'allarticlesView'},
	{'title':'Gestion des projets','name' :'projets','active':false,'viewName':'projetsView'},
	];
	$scope.articlestabs=[
	{'title':'Tous mes articles','name' :'articles','active':false},
	// {'name' :'category','active':false},
	{'title':'Gestion des commentaires','name' :'comments','active':false}
	];
	





	$scope.$on('$stateChangeStart', 
	function(event, toState, toParams, fromState, fromParams){
		console.log(toState);
		console.log(toParams);
		var deep = toState.url.split('/');
		console.log(deep);
		for (var i = $scope.maintabs.length - 1; i >= 0; i--) {
			if(typeof toState.data != "undefined"){
				if($scope.maintabs[i]['name']===toState.data.mainTabs)
	    			$scope.maintabs[i].active = true	
			}
		};
		if(toState.data.mainTabs === "articles")
		{

			for (var i = $scope.articlestabs.length - 1; i >= 0; i--) {
				if(typeof toState.data != "undefined"){
					if($scope.articlestabs[i]['name']===toState.data.articlesTabs)
		    			$scope.articlestabs[i].active = true	
				}
			};
		}
	    // if(toState.url)
	})



















}]);