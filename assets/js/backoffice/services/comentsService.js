app.factory('comentsService', ['$http','$q',function ($http,$q) {
    var service = {};
    service.coments=[];


    service.fetchComents= function() {
        var deferred = $q.defer();

        $http.get('/coment').success(function (data,status) {
            service.coments =data;
            deferred.resolve(data);
        }).error(function (data,status) {
            deferred.reject('error perso');
            console.log('ERROR');
        })

        return deferred.promise;
    };
    


    service.fetchComent= function(id) {
        var deferred = $q.defer();

        $http.get('/coment/'+id).success(function (data,status) {
           console.log(data);
            deferred.resolve(data);
        }).error(function (data,status) {
            deferred.reject('error perso');
            console.log('ERROR');
        })

        return deferred.promise;
    };
    



    service.addNew=function(coment){
        var deferred = $q.defer();

        $http.post('/coment',coment).success(function (data2,status2) {
            $http.get('/coment/'+data2.id).success(function (data,status) {
                service.coments.unshift(data);
                deferred.resolve(data);
            })
        }).error(function (data,status) {
             deferred.reject(data);
        })
        
        return deferred.promise;      
    }

    service.edit=function(coment){
        var deferred = $q.defer();
        $http.put('/coment/'+coment.id,coment).success(function (data2,status) {
            $http.get('/coment/'+coment.id).success(function (data,status) {
                console.log(data);
                service.coments.splice(getIndexInBy(service.coments,'id',coment.id),1,data)
                deferred.resolve(data);
            })
        }).error(function (data,status) {
            deferred.reject(data);
        })
        return deferred.promise;
    }
    service.changeStatusComent=function(array,status){
        var deferred = $q.defer();
        for(var i in array)
        {
            array[i].status =status;
            $http.put('/coment/'+array[i].id,array[i]).success(function (coment,status) {
                console.log(coment);
                service.coments.splice(getIndexInBy(service.coments,'id',coment.id),1,coment)
            }).error(function (data,status) {
                console.log('ERROR');
                deferred.reject(data);
            })
        }
    }
    service.remove=function(catArray){

        for(var i in catArray)
        {
            $http.delete('/coment/'+catArray[i].id).success(function (coment,status) {
                console.log(coment);
                 service.coments.splice(getIndexInBy(service.coments,'id',coment.id),1)
            }).error(function (data,status) {
                console.log('ERROR');
            })
        }
         
    }
    service.removeimage=function(coment,image){
        $http.delete('/image/'+image.id).success(function (data,status) {

            coment.images.splice(getIndexInBy(coment.images,'id',image.id),1);
            service.coments.splice(getIndexInBy(service.coments,'id',coment.id),1,coment)


        }).error(function (data,status) {
            console.log('ERROR');
        })
    }

    service.replace=function(coment){
        
        service.coments.splice(getIndexInBy(service.coments,'id',coment.id),1,coment)
        return;
    }
    service.updateImgIndex=function(image,coment){
        var deferred = $q.defer();
        console.log(image);
        $http.put('/image/'+image.id,image).success(function (image,status) {
            image.comentcoment = image.comentcoment.id;
            coment.images.splice(getIndexInBy(coment.images,'id',image.id),1,image);
            service.coments.splice(getIndexInBy(service.coments,'id',coment.id),1,coment)
            deferred.resolve(image);
        }).error(function (data,status) {
            console.log('ERROR');
            deferred.reject(data);
        })
        return deferred.promise;
    }


    return service;
}]);