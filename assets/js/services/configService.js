app.factory('configService', ['$http','$q',function ($http,$q) {
    var service = {};
    service.frontConfig=[];
    

    // service.fetchArticles= function() {
    //     var deferred = $q.defer();

    //     $http.get('/article').success(function (data,status) {
    //         service.articles =data;
  
    //         deferred.resolve(data);
    //     }).error(function (data,status) {
    //         deferred.reject('error perso');
    //         console.log('ERROR');
    //     })

    //     return deferred.promise;
    // };



    return service;
}]);