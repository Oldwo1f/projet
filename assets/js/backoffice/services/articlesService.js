app.factory('articlesService', ['$http','$q',function ($http,$q) {
    var service = {};
    service.articles=[];


    service.fetchArticles= function() {
        var deferred = $q.defer();

        $http.get('/article').success(function (data,status) {
            service.articles =data;
            deferred.resolve(data);
        }).error(function (data,status) {
            deferred.reject('error perso');
            console.log('ERROR');
        })

        return deferred.promise;
    };
    


    service.fetchArticle= function(id) {
        var deferred = $q.defer();

        $http.get('/article/'+id).success(function (data,status) {
           console.log(data);
            deferred.resolve(data);
        }).error(function (data,status) {
            deferred.reject('error perso');
            console.log('ERROR');
        })

        return deferred.promise;
    };
    



    service.addNew=function(article){
        var deferred = $q.defer();

        $http.post('/article',article).success(function (data2,status2) {
            $http.get('/article/'+data2.id).success(function (data,status) {
                service.articles.unshift(data);
                deferred.resolve(data);
            })
        }).error(function (data,status) {
             deferred.reject(data);
        })
        
        return deferred.promise;      
    }

    service.edit=function(article){
        var deferred = $q.defer();
        $http.put('/article/'+article.id,article).success(function (data2,status) {
            $http.get('/article/'+article.id).success(function (data,status) {
                console.log(data);
                service.articles.splice(getIndexInBy(service.articles,'id',article.id),1,data)
                deferred.resolve(data);
            })
        }).error(function (data,status) {
            deferred.reject(data);
        })
        return deferred.promise;
    }
    service.changeStatusArticle=function(array,status){
        var deferred = $q.defer();
        for(var i in array)
        {
            array[i].status =status;
            $http.put('/article/'+array[i].id,array[i]).success(function (article,status) {
                console.log(article);
                service.articles.splice(getIndexInBy(service.articles,'id',article.id),1,article)
            }).error(function (data,status) {
                console.log('ERROR');
                deferred.reject(data);
            })
        }
    }
    service.remove=function(catArray){

        for(var i in catArray)
        {
            $http.delete('/article/'+catArray[i].id).success(function (article,status) {
                console.log(article);
                 service.articles.splice(getIndexInBy(service.articles,'id',article.id),1)
            }).error(function (data,status) {
                console.log('ERROR');
            })
        }
         
    }
    service.removeimage=function(article,image){
        $http.delete('/image/'+image.id).success(function (data,status) {

            article.images.splice(getIndexInBy(article.images,'id',image.id),1);
            service.articles.splice(getIndexInBy(service.articles,'id',article.id),1,article)


        }).error(function (data,status) {
            console.log('ERROR');
        })
    }

    service.replace=function(article){
        
        service.articles.splice(getIndexInBy(service.articles,'id',article.id),1,article)
        return;
    }
    service.updateImgIndex=function(image,article){
        var deferred = $q.defer();
        console.log(image);
        $http.put('/image/'+image.id,image).success(function (image,status) {
            image.articlearticle = image.articlearticle.id;
            article.images.splice(getIndexInBy(article.images,'id',image.id),1,image);
            service.articles.splice(getIndexInBy(service.articles,'id',article.id),1,article)
            deferred.resolve(image);
        }).error(function (data,status) {
            console.log('ERROR');
            deferred.reject(data);
        })
        return deferred.promise;
    }


    return service;
}]);