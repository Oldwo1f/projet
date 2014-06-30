app.controller('appCtrl',['$scope',
function appCtrl($scope) {

	$scope.maintabs=[
	{'name' :'dashboard','active':false},
	{'name' :'user','active':false},
	{'name' :'article','active':false},
	{'name' :'projet','active':false},
	];
	
	$scope.$watch('maintabs',function  () {
		console.log($scope.maintabs);
	},true);




	$scope.$on('$stateChangeStart', 
	function(event, toState, toParams, fromState, fromParams){
		for (var i = $scope.maintabs.length - 1; i >= 0; i--) {
			if($scope.maintabs[i]['name']===toState.url)
	    		$scope.maintabs[i].active = true
		};
	    
	})



















}]);