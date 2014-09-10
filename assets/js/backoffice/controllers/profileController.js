app.controller('profileCtrl',['$scope','$location','$stateParams','$state','filterFilter','accountService','$state','$filter','myself',
function profileCtrl($scope,$location,$stateParams,$state,filterFilter,accountService ,$state,$filter,myself) {
    
    $scope.myself = myself;
    console.log($scope.myself);
    $scope.resizeStep = $scope.resizeConfig.profilepicture;
    // $scope.editUser.category = $scope.editUser.category.id;
    // $scope.$apply();

    $scope.back = function() {
        if($scope.$parent.$previousState.name)
            $state.go($scope.$parent.$previousState.name)
        else
            $state.go('/.dashboard')
    };

    $scope.submitEdit = function() {
        console.log($scope.myself);
        accountService.updateProfile($scope.myself).then(function() {
            // $('.editModal').modal('hide');
            $('.has-error').removeClass('has-error');
            console.log('EDITED');
        },function(err) {
            console.log(err.invalidAttributes);
            if(err.invalidAttributes)
            {
                invalAttrs = err.invalidAttributes;
                console.log(invalAttrs);
                for(var i in invalAttrs)
                {
                    console.log(i);
                    $('[name="'+i+'"]').parent().addClass('has-error');
                }
            }
        })
    };
    $scope.editpasswordMe = function() {
        console.log($scope.myself);
        accountService.editpasswordMe({
            oldpassword: $scope.oldpassword,
            password: $scope.password,
            comfirmpassword: $scope.comfirmpassword
        }).then(function() {
            // $('.editModal').modal('hide');
            $('.has-error').removeClass('has-error');
            console.log('EDITED');
        },function(err) {
            
                    $('[name$="password"]').parent().addClass('has-error');
        
        })
    };

    $scope.recupImage = function(data) {
       $scope.myself.images.unshift(data.files)
        // accountService.me.images.unshift(data.files)
       console.log(data);
    };

    $scope.removeimage = function(imagetoremove) {

        accountService.removeimage($scope.myself,imagetoremove)
    };

}]);