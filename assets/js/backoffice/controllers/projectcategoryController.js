
app.controller('projectscategoryCtrl',['$scope','filterFilter','projectscategoryService','$filter','$state','categories',
function projectscategoryCtrl($scope,filterFilter,projectscategoryService,$filter,$state,categories) {
console.log('CTRL');
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
	$scope.linkedit=function(id){
		// console.log(filterFilter($scope.categories,{checked : true}));
		if(id){
			clearSelection()
			$state.go('/.projects.category.edit',{id: id})
		}
		else
			$state.go('/.projects.category.edit',{id: filterFilter($scope.categories,{checked : true})[0].id})
	}
	$scope.linkeditimages =function(id){
		if(id){
			clearSelection()
			$state.go('/.projects.category.editimage',{id: id})
		}
		else
			$state.go('/.projects.category.editimage',{id: filterFilter($scope.categories,{checked : true})[0].id})
	}
	$scope.linkadd =function(){
			$state.go('/.projects.category.add')
	}


	$scope.removeselected =function(){
			projectscategoryService.remove(filterFilter($scope.categories,{checked : true}))
	}



	
	

}]);

app.controller('addprojectscategoryCtrl',['$scope','$stateParams','filterFilter','projectscategoryService','$state',
function addprojectscategoryCtrl($scope,$stateParams,filterFilter,projectscategoryService ,$state) {
	$('.newModal').modal();
	$('.newModal').on('hidden.bs.modal',function(e) {
		$state.go('/.projects.category');
	});

	$scope.submitNew=function() {
		projectscategoryService.addNew($scope.newCategory).then(function() {
			$scope.newCategory.title='';
			$state.go('/.projects.category');
		})
		
	};
}]);
app.controller('editprojectscategoryCtrl',['$scope','$stateParams','filterFilter','projectscategoryService','$state','$filter','category',
function editprojectscategoryCtrl($scope,$stateParams,filterFilter,projectscategoryService ,$state,$filter,category) {

	$('.editModal').modal();
	$('.editModal').on('hidden.bs.modal',function(e) {
		$state.go('/.projects.category');
	});
	$scope.category = category;
	$scope.submitEdit = function() {
		projectscategoryService.edit(category).then(function() {
			$('.editModal').modal('hide');
		})
	};


}]);
app.controller('editimageprojectscategoryCtrl',['$scope','$stateParams','filterFilter','projectscategoryService','$state','$filter','category',
function editimageprojectscategoryCtrl($scope,$stateParams,filterFilter,projectscategoryService ,$state,$filter,category) {
	
	$('.editimageModal').modal();
	$('.editimageModal').on('hidden.bs.modal',function(e) {
		$state.go('/.projects.category');
	});
	$scope.category = category;
	$scope.submitEdit = function() {
		projectscategoryService.edit(category).then(function() {
			$('.editimageModal').modal('hide');
		})
	};

	$scope.recupImage = function(data) {
		category.images.unshift(data.files)
		projectscategoryService.replace(category)
	};

	$scope.removeimage = function(imagetoremove) {

		projectscategoryService.removeimage(category,imagetoremove)
	};
console.log($scope.category.images);
	$scope.sortableOptions = {
	    update: function(e, ui) {
	     	// console.log(ui); 
	     	startIndex = ui.item.sortable.index;
	     	dropIndex = ui.item.sortable.dropindex;
	     	console.log(startIndex +' ----'+dropIndex);
	     	console.log($scope.category.images);
	     	if(dropIndex<startIndex)
	     	{
	     		for(var i in $scope.category.images)
	     		{
	     			
	     			if($scope.category.images[i].index < startIndex && $scope.category.images[i].index >=dropIndex)
	     			{
	     				$scope.category.images[i].index = $scope.category.images[i].index +1;
	     				projectscategoryService.updateImgIndex($scope.category.images[i],$scope.category);
	     			}
	     			else if($scope.category.images[i].index == startIndex )
	     			{
	     				$scope.category.images[i].index = dropIndex;
	     				projectscategoryService.updateImgIndex($scope.category.images[i],$scope.category);
	     			}
	     			
	     		}

	     	}
	     	if(dropIndex>startIndex)
	     	{
	     		for(var i in $scope.category.images)
	     		{
	     			
	     			
	     			if($scope.category.images[i].index >startIndex && $scope.category.images[i].index <=dropIndex)
	     			{
	     				$scope.category.images[i].index = $scope.category.images[i].index -1;
	     				projectscategoryService.updateImgIndex($scope.category.images[i],$scope.category);
	     			}
	     			else if($scope.category.images[i].index == startIndex)
	     			{
	     				$scope.category.images[i].index = dropIndex;
	     				projectscategoryService.updateImgIndex($scope.category.images[i],$scope.category);
	     			}
	     			
	     		}

	     	}
	     	console.log($scope.category.images);
	     	

		},
		sort:function() {
			// console.log('sort');
		},
		out:function() {
			// console.log('out');
		},
		start:function(e,ui) {
			// console.log('start');
			// console.log($(e.target).height($(e.target).height()-100));
		}
  	};


}]);