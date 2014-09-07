app.controller('loginCtrl',['$scope', '$auth','accountService', function($scope, $auth,accountService) {
  $scope.errormessage='';
    $scope.login = function() {
      console.log('LOGINCTRL LOGIN');
      $auth.login({ email: $scope.email, password: $scope.password })
        .then(function() {
          console.log('successLogin');
          accountService.getProfile().then(function(data) {
            // $scope.$parent.me = data;
          });
        })
        .catch(function(response) {
          $scope.errormessage=response.data.message;

          console.log(response);
          console.log($scope.errormessage);
        });
    };
    $scope.authenticate = function(provider) {
      $auth.authenticate(provider)
        .then(function() {
          console.log('successAuth');
          // $alert({
          //   content: 'You have successfully logged in',
          //   animation: 'fadeZoomFadeDown',
          //   type: 'material',
          //   duration: 3
          // });
        })
        .catch(function(response) {
          console.log('error : ');
          console.log(response);
          // $alert({
          //   content: response.data,
          //   animation: 'fadeZoomFadeDown',
          //   type: 'material',
          //   duration: 3
          // });
        });
    };
  }]);