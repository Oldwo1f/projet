app.factory('accountService',['$http','$q', function($http,$q) {
    var service = {};
    service.me={};

      service.getProfile= function () {
        var deferred = $q.defer();
        $http.get('/api/me').success(function (data,status) {
          console.log(status);
          console.log(data);
            service.me =data;
            deferred.resolve(data);
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
    service.removeimage=function(user,image){
        $http.delete('/image/'+image.id).success(function (data,status) {

            user.images.splice(getIndexInBy(user.images,'id',image.id),1);
            service.me.splice(getIndexInBy(service.me,'id',user.id),1,user)


        }).error(function (data,status) {
            console.log('ERROR');
        })
    }

    // service.replace=function(user){
        
    //     service.me.splice(getIndexInBy(service.me,'id',user.id),1,user)
    //     return;
    // }
    // service.updateImgIndex=function(image,user){
    //     var deferred = $q.defer();
    //     console.log(image);
    //     $http.put('/image/'+image.id,image).success(function (image,status) {
    //         image.articlearticle = image.articlearticle.id;
    //         article.images.splice(getIndexInBy(article.images,'id',image.id),1,image);
    //         service.articles.splice(getIndexInBy(service.articles,'id',article.id),1,article)
    //         deferred.resolve(image);
    //     }).error(function (data,status) {
    //         console.log('ERROR');
    //         deferred.reject(data);
    //     })
    //     return deferred.promise;
    // }

    return service;
  }]);