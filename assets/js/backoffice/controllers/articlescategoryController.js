
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
	$scope.linkedit=function(id){
		// console.log(filterFilter($scope.categories,{checked : true}));
		if(id){
			clearSelection()
			$state.go('/.articles.category.edit',{id: id})
		}
		else
			$state.go('/.articles.category.edit',{id: filterFilter($scope.categories,{checked : true})[0].id})
	}
	$scope.linkeditimages =function(id){
		if(id){
			clearSelection()
			$state.go('/.articles.category.editimage',{id: id})
		}
		else
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
	     				articlescategoryService.updateImgIndex($scope.category.images[i],$scope.category);
	     			}
	     			else if($scope.category.images[i].index == startIndex )
	     			{
	     				$scope.category.images[i].index = dropIndex;
	     				articlescategoryService.updateImgIndex($scope.category.images[i],$scope.category);
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
	     				articlescategoryService.updateImgIndex($scope.category.images[i],$scope.category);
	     			}
	     			else if($scope.category.images[i].index == startIndex)
	     			{
	     				$scope.category.images[i].index = dropIndex;
	     				articlescategoryService.updateImgIndex($scope.category.images[i],$scope.category);
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