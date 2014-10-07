app.controller('loginCtrl',['$scope', '$auth','accountService','$state', function($scope, $auth,accountService,$state) {
  $scope.errormessage='';
    $scope.login = function() {
      $auth.login({ email: $scope.email, password: $scope.password })
        .then(function() {
          // $state.go('/.dashboard')
        })
        .catch(function(response) {
          $scope.errormessage=response.data.message;

        });
    };
    $scope.authenticate = function(provider) {
      $auth.authenticate(provider)
        .then(function() {
        })
        .catch(function(response) {
        });
    };
  }]);