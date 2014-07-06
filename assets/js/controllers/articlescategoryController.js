
app.controller('articlescategoryCtrl',['$scope','filterFilter','articlescategoryService','$filter','$state',
function articlescategoryCtrl($scope,filterFilter,articlescategoryService,$filter,$state) {
	$scope.categories= [];
	$scope.newCat={'working':false,'title':'','date':null}
	var filteredArray=$scope.categories;
	// $scope.$watch('maintabs',function  () {
	// 	// console.log($scope.maintabs);
	// },true);

	articlescategoryService.fetchCategories().then(function (data) {
         filteredArray = $scope.categories =articlescategoryService.categories = data;
         $scope.filterMainArray();
    });

	$scope.$watch('articles',function () {

		$scope.nbChecked = filterFilter(filteredArray,{checked : true}).length;
		$scope.allchecked = ($scope.nbChecked == filteredArray.length);

		// if($state.is('/.articles.articles.edit'))
		// {
		// 	$state.go('/.articles.articles')
		// }


	},true);


	$scope.newCategory =function() {
		$scope.newCat.working = true;
		setTimeout(function(){
			$(document).bind('click',function(e) {
			  $scope.exitNew();
			  $scope.$apply();
			  $(document).unbind('click');
			});
		},1);
		$('tr.ligneDajout').click(function  (e) {
		  e.stopPropagation();
		});
	};
	$scope.exitNew=function() {
		$('input[name="title"]').removeClass('bg-danger');
		$scope.newCat={'working':false,'title':'','date':null};
		$(document).unbind('click');
	};
	$scope.submitNewArticle=function() {
		$(document).unbind('click');
		console.log('submitNewArticle');
		articlescategoryService.addNew($scope.newCat).then(function success(data) {
			console.log('.thenNew');
			console.log(data);
			$scope.order='false';
			$scope.exitNew();
		},function error(data) {
			console.log('this error');
			console.log(data.error);
			if(data.error.error ==='E_VALIDATION')
			{
				console.log(data.error.invalidAttributes.title);
				if(data.error.invalidAttributes.title)
				{
					console.log('here');
					$('input[name="title"]').addClass('bg-danger');
				}
			}
		});
	};



	$scope.filterMainArray=function() {

		$scope.nbChecked = filterFilter(filteredArray,{checked : true}).length;
		$scope.allchecked =($scope.nbChecked == filteredArray.length)
	};


	$scope.checkAll=function(allchecked) {
		console.log('checkALLLLL '+ allchecked);
		allchecked = !allchecked;
		filteredArray.forEach(function(category) {
			category.checked = allchecked;
		});

	};

	$scope.linkeditCat =function(id){

		console.log(filterFilter($scope.categories,{checked : true})[0].id);


		if($state.is('/.articles.category.edit') || $state.is('/.articles.category.editimage'))
		{
			$state.go('^.edit',{id: filterFilter($scope.categories,{checked : true})[0].id})
		}
		else
		{
			$state.go('.edit',{id: filterFilter($scope.categories,{checked : true})[0].id})
		}
	}
	$scope.linkeditimages =function(id){

		console.log(filterFilter($scope.categories,{checked : true})[0].id);


		if($state.is('/.articles.category.edit') || $state.is('/.articles.category.editimage'))
		{
			$state.go('^.editimage',{id: filterFilter($scope.categories,{checked : true})[0].id})
		}
		else
		{
			$state.go('.editimage',{id: filterFilter($scope.categories,{checked : true})[0].id})
		}
	}
	$scope.dblclick =function(category){
		$scope.checkAll(true);
		category.checked = true;
		clearSelection();
		$scope.linkeditCat()

	}
	$scope.dblclickimage =function(category){
		$scope.checkAll(true);
		category.checked = true;
		clearSelection();
		$scope.linkeditimages()
	}
	$scope.removeselected=function() {

		filterFilter(filteredArray,{checked : true}).forEach(function(item) {
			articlescategoryService.remove(item);
		})
			
		setTimeout(function() {$scope.nbChecked =0;$scope.$apply();},1)
		// $scope.$apply();
	};


}]);

app.controller('editarticlescategoryCtrl',['$scope','$stateParams','filterFilter','articlescategoryService','$state','$filter',
function editarticlescategoryCtrl($scope,$stateParams,filterFilter,articlescategoryService ,$state,$filter) {
	
	
	$scope.category = filterFilter(articlescategoryService.categories,{id:$stateParams.id});
	$scope.category = $scope.category[0];
	// $scope.category.checked=false;

	$scope.categoryToEdit = angular.copy($scope.category);
	//GESTION CLICK OUT
	setTimeout(function(){
		$('tr.ligne[rel="'+$stateParams.id+'"]').after($('.ligneModif')).hide();
		console.log($('tr.ligneModif'));
		$(document).bind('click',function(e) {
		  $scope.exit()
		  $(document).unbind('click');
		});

		$('tr.ligneModif').click(function  (e) {
		  e.stopPropagation();
		});

	},1)
	$scope.exit=function() {
		$state.go('^')
	}

	$scope.submitEditCategory=function(stay) {
		console.log('submitNewArticle');
		console.log(stay);

		articlescategoryService.edit($scope.categoryToEdit).then(function success(data) {
			if(stay==='leave')
				$scope.exit()
		},function error(data) {
			console.log('this error');
			console.log(data.error);
			if(data.error.error ==='E_VALIDATION')
			{
				console.log(data.error.invalidAttributes);
				
			}
		});

		// $('tr.ligne[rel="'+$stateParams.id+'"]').after($('.ligneModif')).hide();
	};


}]);
app.controller('editimagearticlescategoryCtrl',['$scope','$stateParams','filterFilter','articlescategoryService','$state','$filter',
function editimagearticlescategoryCtrl($scope,$stateParams,filterFilter,articlescategoryService ,$state,$filter) {
	
	console.log('editimagearticlesCtrl');
	$scope.category = filterFilter(articlescategoryService.categories,{id:$stateParams.id});
	$scope.category = $scope.category[0];
	// $scope.category.checked=false;

	$scope.categoryToEdit = angular.copy($scope.category);
	// $scope.articleToEdit.date =  $filter("date")($scope.articleToEdit.date, 'yyyy-MM-dd');
	//GESTION CLICK OUT
	setTimeout(function(){
		$('tr.ligne[rel="'+$stateParams.id+'"]').after($('.ligneModifIMG')).addClass('bg-info');
		$(document).bind('click',function(e) {
		  $scope.exit()
		  $(document).unbind('click');
		});

		$('tr.ligneModifIMG').click(function  (e) {
		  e.stopPropagation();
		});
		$('tr.ligne[rel="'+$stateParams.id+'"]').click(function  (e) {
		  e.stopPropagation();
		});

	},1)
	$scope.exit=function() {
		$('tr.ligne[rel="'+$stateParams.id+'"]').removeClass('bg-info');

		$state.go('^')
	}	

	$scope.addImg=function() {
		articlescategoryService.addImg($scope.categoryToEdit);
	}


}]);