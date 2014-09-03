app.controller('projectsCtrl',['$scope','filterFilter','projectsService','$filter','$state','projects',
function projectsCtrl($scope,filterFilter,projectsService,$filter,$state,projects) {

    $scope.projects= projects;
    $scope.order='date';
    $scope.reverse=true;
    $scope.filterActif = true;
    $scope.filterInactif = true;
    $scope.filterNew = true;
    $scope.totalChecked = function()
    {
        if(filterFilter($scope.projects,{checked : true}).length == $scope.projects.length)
            $scope.allChecked = true;
        else
            $scope.allChecked = false;
        return filterFilter($scope.projects,{checked : true}).length;
    }
    $scope.toggleAllcheck = function()
    {
        allchecked = !$scope.allChecked;
        $scope.projects.forEach(function(project) {
            project.checked = allchecked;
        });
    }
    $scope.linkedit=function(id){
        // console.log(filterFilter($scope.projects,{checked : true}));
        if(id){
            clearSelection()
            $state.go('/.projects.projects.edit',{id: id})
        }
        else
            $state.go('/.projects.projects.edit',{id: filterFilter($scope.projects,{checked : true})[0].id})
    }
    $scope.linkeditimages =function(id){
        if(id){
            clearSelection()
            $state.go('/.projects.projects.editimage',{id: id})
        }
        else
            $state.go('/.projects.projects.editimage',{id: filterFilter($scope.projects,{checked : true})[0].id})
    }
    $scope.linkadd =function(){
        console.log('tototo');
            $state.go('/.projects.projects.add');
            console.log($state);
            console.log('totot2');
    }


    $scope.removeselected =function(){
            projectsService.remove(filterFilter($scope.projects,{checked : true}))
    }
    $scope.changestatus = function(status) {
        projectsService.changeStatusProject(filterFilter($scope.projects,{checked : true}),status)
        
    };

    $scope.sortFunction =function(val){

        if($scope.order === 'category')
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
    $scope.projectfilter =function(val){
        var patt = new RegExp($scope.slug,'i');
        
        if(patt.test(val.title))
            return true;
        if(patt.test(val.category.title))
            return true;
        if(patt.test($filter('date')(val.date,'dd MMMM')))
            return true;

        val.checked=false;
        return false;
    }




    
    

}]);

app.controller('addprojectsCtrl',['$scope','$stateParams','filterFilter','projectsService','$state','categories',
function addprojectsCtrl($scope,$stateParams,filterFilter,projectsService ,$state,categories) {
    console.log('ADD PROJECT');
    console.log('ADD PROJECT');
    $scope.categories= categories;
    $scope.newProject={};
    $scope.newProject.description='';
    $scope.newProject.content='';
    $scope.newProject.shortcontent='';
    $scope.newProject.title='';
    $scope.newProject.keyword='';
    $scope.newProject.accroche='';
    $scope.newProject.rewriteurl='';
    $scope.newProject.date=new Date();
    $('.newModal').modal();
    $('.newModal').on('hidden.bs.modal',function(e) {
        $state.go('/.projects.projects');
    });

    $scope.timeSet = function() {

        $scope.openDatepicker = false;
    };

    $scope.submitNew=function() {
        $scope.newProject.status='new';
        projectsService.addNew($scope.newProject).then(function() {
            $scope.newProject.title='';
            $state.go('/.projects.projects');
        },function(err) {
            console.log(err);
            console.log(err.error.invalidAttributes);
            if(err.error.invalidAttributes)
            {
                invalAttrs = err.error.invalidAttributes;
                console.log(invalAttrs);
                for(var i in invalAttrs)
                {
                    console.log(i);
                    $('[name="'+i+'"]').parent().addClass('has-error');
                }
            }
        })
        
    };
}]);
app.controller('editprojectsCtrl',['$scope','$stateParams','filterFilter','projectsService','$state','$filter','project','categories',
function editprojectsCtrl($scope,$stateParams,filterFilter,projectsService ,$state,$filter,project,categories) {
    $scope.categories= categories;
    console.log('modalalalalalallalal');
    $('.editModal').modal();
    $('.editModal').on('hidden.bs.modal',function(e) {
        $state.go('/.projects.projects');
    });
    $scope.editProject = project;
    console.log($scope.editProject);
    $scope.editProject.category = $scope.editProject.category.id;
    // $scope.$apply();

    $scope.submitEdit = function() {
        projectsService.edit($scope.editProject).then(function() {
            $('.editModal').modal('hide');
        },function(err) {
            console.log(err);
            console.log(err.error.invalidAttributes);
            if(err.error.invalidAttributes)
            {
                invalAttrs = err.error.invalidAttributes;
                console.log(invalAttrs);
                for(var i in invalAttrs)
                {
                    console.log(i);
                    $('[name="'+i+'"]').parent().addClass('has-error');
                }
            }
        })
    };


}]);
app.controller('editimageprojectsCtrl',['$scope','$stateParams','filterFilter','projectsService','$state','$filter','project',
function editimageprojectsCtrl($scope,$stateParams,filterFilter,projectsService ,$state,$filter,project) {
    
    $scope.resizeStep = $scope.resizeConfig.project;
    $('.editimageModal').modal();
    $('.editimageModal').on('hidden.bs.modal',function(e) {
        $state.go('/.projects.projects');
    });
    $scope.project = project;
    $scope.submitEdit = function() {
        projectsService.edit(project).then(function() {
            $('.editimageModal').modal('hide');
        })
    };

    $scope.recupImage = function(data) {
        project.images.unshift(data.files)
        projectsService.replace(project)
    };

    $scope.removeimage = function(imagetoremove) {

        projectsService.removeimage(project,imagetoremove)
    };
    $scope.sortableOptions = {
        update: function(e, ui) {
            // console.log(ui); 
            startIndex = ui.item.sortable.index;
            dropIndex = ui.item.sortable.dropindex;
            console.log(startIndex +' ----'+dropIndex);
            console.log($scope.project.images);
            if(dropIndex<startIndex)
            {
                for(var i in $scope.project.images)
                {
                    
                    if($scope.project.images[i].index < startIndex && $scope.project.images[i].index >=dropIndex)
                    {
                        $scope.project.images[i].index = $scope.project.images[i].index +1;
                        projectsService.updateImgIndex($scope.project.images[i],$scope.project);
                    }
                    else if($scope.project.images[i].index == startIndex )
                    {
                        $scope.project.images[i].index = dropIndex;
                        projectsService.updateImgIndex($scope.project.images[i],$scope.project);
                    }
                    
                }

            }
            if(dropIndex>startIndex)
            {
                for(var i in $scope.project.images)
                {
                    
                    
                    if($scope.project.images[i].index >startIndex && $scope.project.images[i].index <=dropIndex)
                    {
                        $scope.project.images[i].index = $scope.project.images[i].index -1;
                        projectsService.updateImgIndex($scope.project.images[i],$scope.project);
                    }
                    else if($scope.project.images[i].index == startIndex)
                    {
                        $scope.project.images[i].index = dropIndex;
                        projectsService.updateImgIndex($scope.project.images[i],$scope.project);
                    }
                    
                }

            }
            console.log($scope.project.images);
            

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