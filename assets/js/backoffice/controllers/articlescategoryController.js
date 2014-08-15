
app.controller('articlescategoryCtrl',['$scope','filterFilter','articlescategoryService','$filter','$state','categories',
function articlescategoryCtrl($scope,filterFilter,articlescategoryService,$filter,$state,categories) {

	$scope.categories= categories;
	$scope.order='title';
	$scope.reverse=false;
	$scope.totalChecked = function()
	{
		if(filterFilter($scope.categories,{checked : true}).length == $scope.categories.length)
	 		$scope.allChecked = true;
	 	else
	 		$scope.allChecked = false;
	 	return filterFilter($scope.categories,{checked : true}).length;
	}
	$scope.toggleAllcheck = function()
	{
		allchecked = !$scope.allChecked;
		$scope.categories.forEach(function(category) {
			category.checked = allchecked;
		});
	}
	$scope.linkedit=function(){
		// console.log(filterFilter($scope.categories,{checked : true}));
			$state.go('/.articles.category.edit',{id: filterFilter($scope.categories,{checked : true})[0].id})
	}
	$scope.linkeditimages =function(id){
			$state.go('/.articles.category.editimage',{id: filterFilter($scope.categories,{checked : true})[0].id})
	}
	$scope.linkadd =function(){
			$state.go('/.articles.category.add')
	}


	$scope.removeselected =function(){
			articlescategoryService.remove(filterFilter($scope.categories,{checked : true}))
	}



	
	

}]);

app.controller('addarticlescategoryCtrl',['$scope','$stateParams','filterFilter','articlescategoryService','$state',
function addarticlescategoryCtrl($scope,$stateParams,filterFilter,articlescategoryService ,$state) {
	$('.newModal').modal();
	$('.newModal').on('hidden.bs.modal',function(e) {
		$state.go('/.articles.category');
	});

	$scope.submitNew=function() {
		articlescategoryService.addNew($scope.newCategory).then(function() {
			$scope.newCategory.title='';
			$state.go('/.articles.category');
		})
		
	};
}]);
app.controller('editarticlescategoryCtrl',['$scope','$stateParams','filterFilter','articlescategoryService','$state','$filter','category',
function editarticlescategoryCtrl($scope,$stateParams,filterFilter,articlescategoryService ,$state,$filter,category) {

	$('.editModal').modal();
	$('.editModal').on('hidden.bs.modal',function(e) {
		$state.go('/.articles.category');
	});
	$scope.category = category;
	$scope.submitEdit = function() {
		articlescategoryService.edit(category).then(function() {
			$('.editModal').modal('hide');
		})
	};


}]);
app.controller('editimagearticlescategoryCtrl',['$scope','$stateParams','filterFilter','articlescategoryService','$state','$filter','category',
function editimagearticlescategoryCtrl($scope,$stateParams,filterFilter,articlescategoryService ,$state,$filter,category) {
	
	$('.editimageModal').modal();
	$('.editimageModal').on('hidden.bs.modal',function(e) {
		$state.go('/.articles.category');
	});
	$scope.category = category;
	$scope.submitEdit = function() {
		articlescategoryService.edit(category).then(function() {
			$('.editimageModal').modal('hide');
		})
	};

	$scope.recupImage = function(data) {
		category.images.unshift(data.files)
		articlescategoryService.replace(category)
	};

	$scope.removeimage = function(imagetoremove) {

		articlescategoryService.removeimage(category,imagetoremove)
	};

	$scope.sortableOptions = {
	    update: function(e, ui) {
	     	console.log(ui); 
	     	

		}
  	};


}]);