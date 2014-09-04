app.controller('goldenbookCtrl',['$scope','filterFilter','goldenbookService','$filter','$state','goldenbooks',
function goldenbookCtrl($scope,filterFilter,goldenbookService,$filter,$state,goldenbooks) {

console.log('goldenbookCTRL');
console.log(goldenbooks);
	$scope.goldenbooks= goldenbooks;
	$scope.order='date';
	$scope.reverse=true;
	$scope.filterActif = true;
	$scope.filterInactif = true;
	$scope.filterNew = true;
	$scope.totalChecked = function()
	{
		if(filterFilter($scope.goldenbooks,{checked : true}).length == $scope.goldenbooks.length)
	 		$scope.allChecked = true;
	 	else
	 		$scope.allChecked = false;
	 	return filterFilter($scope.goldenbooks,{checked : true}).length;
	}
	$scope.toggleAllcheck = function()
	{
		allchecked = !$scope.allChecked;
		$scope.goldenbooks.forEach(function(goldenbook) {
			goldenbook.checked = allchecked;
		});
	}
	// $scope.linkedit=function(id){
	// 	// console.log(filterFilter($scope.goldenbook,{checked : true}));
	// 	if(id){
	// 		clearSelection()
	// 		$state.go('/.goldenbook.goldenbook.edit',{id: id})
	// 	}
	// 	else
	// 		$state.go('/.goldenbook.goldenbook.edit',{id: filterFilter($scope.goldenbook,{checked : true})[0].id})
	// }
	// $scope.linkeditimages =function(id){
	// 	if(id){
	// 		clearSelection()
	// 		$state.go('/.goldenbook.goldenbook.editimage',{id: id})
	// 	}
	// 	else
	// 		$state.go('/.goldenbook.goldenbook.editimage',{id: filterFilter($scope.goldenbook,{checked : true})[0].id})
	// }
	// $scope.linkadd =function(){
	// 		$state.go('/.goldenbook.goldenbook.add')
	// }


	$scope.removeselected =function(){
			goldenbookService.remove(filterFilter($scope.goldenbooks,{checked : true}))
	}
	$scope.changestatus = function(status) {
		goldenbookService.changeStatusGoldenbook(filterFilter($scope.goldenbooks,{checked : true}),status)
		
	};

	$scope.sortFunction =function(val){

		if($scope.order === 'article')
		{
			console.log(val[$scope.order]);
			return val[$scope.order].title;
		}else
		{
			return val[$scope.order];
		}
	}
	$scope.getCat =function(val){
		if(!$scope.filterActif)
		{
			if(val.status ==='actif'){
				val.checked=false;
				return false;
			}
		}
		if(!$scope.filterInactif)
		{
			if(val.status ==='inactif'){
				val.checked=false;
				return false;
			}
		}
		if(!$scope.filterNew)
		{
			if(val.status ==='new'){
				val.checked=false;
				return false;
			}
		}
		return true;
	}
	$scope.goldenbookfilter =function(val){
		var patt = new RegExp($scope.slug,'i');
		
		if(patt.test(val.content))
			return true;
		// if(patt.test(val.article.title))
			// return true;
		if(patt.test(val.author))
			return true;
		if(patt.test($filter('date')(val.createdAt,'dd MMMM')))
			return true;

		val.checked=false;
		return false;
	}




	
	

}]);