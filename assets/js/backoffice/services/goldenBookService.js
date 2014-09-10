app.factory('goldenbookService', ['$http','$q',function ($http,$q) {
    var service = {};
    service.goldenbook=[];


    service.fetchGoldenbooks= function() {
        var deferred = $q.defer();
        console.log('yoyoyoyoyoyoyoyoyoy');
        $http.get('/goldenbook').success(function (data,status) {
        	console.log(data);
            service.goldenbook =data;
            deferred.resolve(data);
        }).error(function (data,status) {
            deferred.reject('error perso');
            console.log('ERROR');
        })

        return deferred.promise;
    };
    


    service.fetchGoldenbook= function(id) {
        var deferred = $q.defer();

        $http.get('/goldenbook/'+id).success(function (data,status) {
           console.log(data);
            deferred.resolve(data);
        }).error(function (data,status) {
            deferred.reject('error perso');
            console.log('ERROR');
        })

        return deferred.promise;
    };
    



    service.addNew=function(goldenbook){
        var deferred = $q.defer();

        $http.post('/goldenbook',goldenbook).success(function (data2,status2) {
            $http.get('/goldenbook/'+data2.id).success(function (data,status) {
                service.goldenbook.unshift(data);
                deferred.resolve(data);
            })
        }).error(function (data,status) {
             deferred.reject(data);
        })
        
        return deferred.promise;      
    }

    // service.edit=function(goldenbook){
    //     var deferred = $q.defer();
    //     $http.put('/goldenbook/'+goldenbook.id,goldenbook).success(function (data2,status) {
    //         $http.get('/goldenbook/'+goldenbook.id).success(function (data,status) {
    //             console.log(data);
    //             service.goldenbook.splice(getIndexInBy(service.goldenbook,'id',goldenbook.id),1,data)
    //             deferred.resolve(data);
    //         })
    //     }).error(function (data,status) {
    //         deferred.reject(data);
    //     })
    //     return deferred.promise;
    // }
    service.changeStatusGoldenbook=function(array,status){
        var deferred = $q.defer();
        for(var i in array)
        {
            array[i].status =status;
            $http.put('/goldenbook/'+array[i].id,array[i]).success(function (goldenbook,status) {
                console.log(goldenbook);
                service.goldenbook.splice(getIndexInBy(service.goldenbook,'id',goldenbook.id),1,goldenbook)
            }).error(function (data,status) {
                console.log('ERROR');
                deferred.reject(data);
            })
        }
    }
    service.remove=function(catArray){

        for(var i in catArray)
        {
            $http.delete('/goldenbook/'+catArray[i].id).success(function (goldenbook,status) {
                console.log(goldenbook);
                 service.goldenbook.splice(getIndexInBy(service.goldenbook,'id',goldenbook.id),1)
            }).error(function (data,status) {
                console.log('ERROR');
            })
        }
         
    }
    // service.removeimage=function(goldenbook,image){
    //     $http.delete('/image/'+image.id).success(function (data,status) {

    //         goldenbook.images.splice(getIndexInBy(goldenbook.images,'id',image.id),1);
    //         service.goldenbook.splice(getIndexInBy(service.goldenbook,'id',goldenbook.id),1,goldenbook)


    //     }).error(function (data,status) {
    //         console.log('ERROR');
    //     })
    // }

    service.replace=function(goldenbook){
        
        service.goldenbook.splice(getIndexInBy(service.goldenbook,'id',goldenbook.id),1,goldenbook)
        return;
    }
    // service.updateImgIndex=function(image,goldenbook){
    //     var deferred = $q.defer();
    //     console.log(image);
    //     $http.put('/image/'+image.id,image).success(function (image,status) {
    //         image.goldenbookgoldenbook = image.goldenbookgoldenbook.id;
    //         goldenbook.images.splice(getIndexInBy(goldenbook.images,'id',image.id),1,image);
    //         service.goldenbook.splice(getIndexInBy(service.goldenbook,'id',goldenbook.id),1,goldenbook)
    //         deferred.resolve(image);
    //     }).error(function (data,status) {
    //         console.log('ERROR');
    //         deferred.reject(data);
    //     })
    //     return deferred.promise;
    // }


    return service;
}]);