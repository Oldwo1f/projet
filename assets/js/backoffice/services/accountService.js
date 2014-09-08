app.factory('accountService',['$http','$q', function($http,$q) {
    var service = {};
    service.me={};

      service.getProfile= function () {
        var deferred = $q.defer();
        $http.get('/api/me').success(function (data,status) {
          console.log(status);
          console.log(data);
            service.me =data[0];
            deferred.resolve(data[0]);
        }).error(function (data,status) {
            deferred.reject('error perso');
            console.log('ERROR');
        })
        console.log(service.me);
        return deferred.promise;
      };
      service.updateProfile= function(profileData) {
        console.log(profileData);
        var deferred = $q.defer();
        $http.put('/edit/me',profileData).success(function (data,status) {
            // $http.get('/api/me').success(function (data,status) {
                console.log(data[0]);
                service.me = data[0]
                deferred.resolve(data[0]);
            // })
        }).error(function (data,status) {
            deferred.reject(data);
        })
        return deferred.promise;
      }
      service.editpasswordMe= function(profileData) {
        console.log(profileData);
        var deferred = $q.defer();
        $http.put('/editpassword/me',profileData).success(function (data,status) {
            // $http.get('/api/me').success(function (data,status) {
              console.log(data);
                console.log(data[0]);
                service.me = data[0]
                deferred.resolve(data[0]);
            // })
        }).error(function (data,status) {
            console.log(data);
            
            deferred.reject(data);
        })
        return deferred.promise;
      }

    return service;
  }]);