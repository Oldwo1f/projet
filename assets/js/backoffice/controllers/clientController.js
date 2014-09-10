app.controller('clientCtrl',['$scope','filterFilter','userService','$filter','$state','users',
function clientCtrl($scope,filterFilter,userService,$filter,$state,users) {

    $scope.users= users;
    console.log('Client CTRL');
    console.log(users);
    $scope.order='date';
    $scope.reverse=true;
    $scope.filterActif = true;
    $scope.filterInactif = true;
    $scope.filterNew = true;
    $scope.totalChecked = function()
    {
        if(filterFilter($scope.users,{checked : true}).length == $scope.users.length)
            $scope.allChecked = true;
        else
            $scope.allChecked = false;
        return filterFilter($scope.users,{checked : true}).length;
    }
    $scope.toggleAllcheck = function()
    {
        allchecked = !$scope.allChecked;
        $scope.users.forEach(function(user) {
            user.checked = allchecked;
        });
    }
    $scope.linkedit=function(id){
        // console.log(filterFilter($scope.users,{checked : true}));
        if(id){
            clearSelection()
            $state.go('/.users.client.edit',{id: id})
        }
        else
            $state.go('/.users.client.edit',{id: filterFilter($scope.users,{checked : true})[0].id})
    }
    // $scope.linkeditimages =function(id){
    //     if(id){
    //         clearSelection()
    //         $state.go('/.users.users.editimage',{id: id})
    //     }
    //     else
    //         $state.go('/.users.users.editimage',{id: filterFilter($scope.users,{checked : true})[0].id})
    // }
    $scope.linkadd =function(){
        // console.log('tototo');
            $state.go('/.users.client.add');
            console.log($state);
    }


    $scope.removeselected =function(){
            userService.remove(filterFilter($scope.users,{checked : true}))
    }
    // $scope.changestatus = function(status) {
    //     userService.changeStatusUser(filterFilter($scope.users,{checked : true}),status)
        
    // };

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
    $scope.userfilter =function(val){
        var patt = new RegExp($scope.slug,'i');
        
        if(patt.test(val.email))
            return true;
        if(patt.test(val.name))
            return true;
        if(patt.test($filter('date')(val.createdAt,'dd MMMM')))
            return true;

        val.checked=false;
        return false;
    }




    
    

}]);

app.controller('addclientCtrl',['$scope','$stateParams','filterFilter','userService','$state',
function addclientCtrl($scope,$stateParams,filterFilter,userService ,$state) {
    console.log('ADD PROJECT');
    console.log('ADD PROJECT');
    $scope.newUser={};
    
    $scope.newUser.email='';
    
    $('.newModal').modal();
    $('.newModal').on('hidden.bs.modal',function(e) {
        $state.go('/.users.client');
    });

    $scope.timeSet = function() {

        $scope.openDatepicker = false;
    };

    $scope.submitNew=function() {
        $scope.newUser.status='new';
        userService.addClient($scope.newUser).then(function() {
            $scope.newUser.email='';
            $state.go('/.users.client');
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
app.controller('editclientCtrl',['$scope','$stateParams','filterFilter','userService','$state','$filter','user',
function editclientCtrl($scope,$stateParams,filterFilter,userService ,$state,$filter,user) {
    console.log('modalalalalalallalal');
    $('.editModal').modal();
    $('.editModal').on('hidden.bs.modal',function(e) {
        $state.go('/.users.client');
    });
    $scope.editUser = user;
    console.log($scope.editUser);
    // $scope.editUser.category = $scope.editUser.category.id;
    // $scope.$apply();

    $scope.submitEdit = function() {
        console.log($scope.editUser);
        userService.edit($scope.editUser).then(function() {
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
// app.controller('editimageuserCtrl',['$scope','$stateParams','filterFilter','userService','$state','$filter','user',
// function editimageuserCtrl($scope,$stateParams,filterFilter,userService ,$state,$filter,user) {
    
//     $scope.resizeStep = $scope.resizeConfig.user;
//     $('.editimageModal').modal();
//     $('.editimageModal').on('hidden.bs.modal',function(e) {
//         $state.go('/.users.users');
//     });
//     $scope.user = user;
//     $scope.submitEdit = function() {
//         userService.edit(user).then(function() {
//             $('.editimageModal').modal('hide');
//         })
//     };

//     $scope.recupImage = function(data) {
//         user.images.unshift(data.files)
//         userService.replace(user)
//     };

//     $scope.removeimage = function(imagetoremove) {

//         userService.removeimage(user,imagetoremove)
//     };
//     $scope.sortableOptions = {
//         update: function(e, ui) {
//             // console.log(ui); 
//             startIndex = ui.item.sortable.index;
//             dropIndex = ui.item.sortable.dropindex;
//             console.log(startIndex +' ----'+dropIndex);
//             console.log($scope.user.images);
//             if(dropIndex<startIndex)
//             {
//                 for(var i in $scope.user.images)
//                 {
                    
//                     if($scope.user.images[i].index < startIndex && $scope.user.images[i].index >=dropIndex)
//                     {
//                         $scope.user.images[i].index = $scope.user.images[i].index +1;
//                         userService.updateImgIndex($scope.user.images[i],$scope.user);
//                     }
//                     else if($scope.user.images[i].index == startIndex )
//                     {
//                         $scope.user.images[i].index = dropIndex;
//                         userService.updateImgIndex($scope.user.images[i],$scope.user);
//                     }
                    
//                 }

//             }
//             if(dropIndex>startIndex)
//             {
//                 for(var i in $scope.user.images)
//                 {
                    
                    
//                     if($scope.user.images[i].index >startIndex && $scope.user.images[i].index <=dropIndex)
//                     {
//                         $scope.user.images[i].index = $scope.user.images[i].index -1;
//                         userService.updateImgIndex($scope.user.images[i],$scope.user);
//                     }
//                     else if($scope.user.images[i].index == startIndex)
//                     {
//                         $scope.user.images[i].index = dropIndex;
//                         userService.updateImgIndex($scope.user.images[i],$scope.user);
//                     }
                    
//                 }

//             }
//             console.log($scope.user.images);
            

//         },
//         sort:function() {
//             // console.log('sort');
//         },
//         out:function() {
//             // console.log('out');
//         },
//         start:function(e,ui) {
//             // console.log('start');
//             // console.log($(e.target).height($(e.target).height()-100));
//         }
//     };


// }]);