app.factory('userService', ['$http','$q',function ($http,$q) {
    var service = {};
    service.users=[];

console.log('USERSERVICE');
    service.fetchUsers= function() {
        var deferred = $q.defer();
        console.log('USERSERVICE---->fetchUsers');

        $http.get('/intern').success(function (data,status) {
            service.users =data;
            console.log(data);
            deferred.resolve(data);
        }).error(function (data,status) {
            deferred.reject('error perso');
            console.log('ERROR');
        })

        return deferred.promise;
    };
    service.fetchClients= function() {
        var deferred = $q.defer();
        console.log('USERSERVICE---->fetchUsers');

        $http.get('/client').success(function (data,status) {
            service.users =data;
            console.log(data);
            deferred.resolve(data);
        }).error(function (data,status) {
            deferred.reject('error perso');
            console.log('ERROR');
        })

        return deferred.promise;
    };
    


    service.fetchUser= function(id) {
        var deferred = $q.defer();

        $http.get('/user/'+id).success(function (data,status) {
           console.log(data);
            deferred.resolve(data);
        }).error(function (data,status) {
            deferred.reject('error perso');
            console.log('ERROR');
        })

        return deferred.promise;
    };
    



    service.addNew=function(user){
        var deferred = $q.defer();

        $http.post('/user',user).success(function (data2,status2) {
            $http.get('/user/'+data2.id).success(function (data,status) {
                // console.log(status);
                service.users.unshift(data);
                deferred.resolve(data);
            })
        }).error(function (data,status) {
             deferred.reject(data);
        })
        
        return deferred.promise;      
    }
    service.addClient=function(user){
        var deferred = $q.defer();
        user.role = 'client';
        $http.post('/user',user).success(function (data2,status2) {
            $http.get('/user/'+data2.id).success(function (data,status) {
                // console.log(status);
                service.users.unshift(data);
                deferred.resolve(data);
            })
        }).error(function (data,status) {
             deferred.reject(data);
        })
        
        return deferred.promise;      
    }

    service.edit=function(user){
        var deferred = $q.defer();
        $http.put('/user/'+user.id,user).success(function (data2,status) {
            $http.get('/user/'+user.id).success(function (data,status) {
                console.log(data);
                service.users.splice(getIndexInBy(service.users,'id',user.id),1,data)
                deferred.resolve(data);
            })
        }).error(function (data,status) {
            deferred.reject(data);
        })
        return deferred.promise;
    }
    // service.changeStatusUser=function(array,status){
    //     var deferred = $q.defer();
    //     for(var i in array)
    //     {
    //         array[i].status =status;
    //         $http.put('/user/'+array[i].id,array[i]).success(function (user,status) {
    //             console.log(user);
    //             service.users.splice(getIndexInBy(service.users,'id',user.id),1,user)
    //         }).error(function (data,status) {
    //             console.log('ERROR');
    //             deferred.reject(data);
    //         })
    //     }
    // }
    service.remove=function(catArray){

        for(var i in catArray)
        {
            $http.delete('/user/'+catArray[i].id).success(function (user,status) {
                console.log(user);
                 service.users.splice(getIndexInBy(service.users,'id',user.id),1)
            }).error(function (data,status) {
                console.log('ERROR');
            })
        }
         
    }
    // service.removeimage=function(user,image){
    //     $http.delete('/image/'+image.id).success(function (data,status) {

    //         user.images.splice(getIndexInBy(user.images,'id',image.id),1);
    //         service.users.splice(getIndexInBy(service.users,'id',user.id),1,user)


    //     }).error(function (data,status) {
    //         console.log('ERROR');
    //     })
    // }

    // service.replace=function(user){
        
    //     service.users.splice(getIndexInBy(service.users,'id',user.id),1,user)
    //     return;
    // }
    // service.updateImgIndex=function(image,user){
    //     var deferred = $q.defer();
    //     console.log(image);
    //     $http.put('/image/'+image.id,image).success(function (image,status) {
    //         image.useruser = image.useruser.id;
    //         user.images.splice(getIndexInBy(user.images,'id',image.id),1,image);
    //         service.users.splice(getIndexInBy(service.users,'id',user.id),1,user)
    //         deferred.resolve(image);
    //     }).error(function (data,status) {
    //         console.log('ERROR');
    //         deferred.reject(data);
    //     })
    //     return deferred.promise;
    // }


    return service;
}]);