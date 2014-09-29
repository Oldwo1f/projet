app.factory('mailingListsService', ['$http','$q',function ($http,$q) {
    var service = {};
    service.mailingLists=[];
    service.currentList=[];


    service.fetchmailingLists= function() {
        var deferred = $q.defer();

        $http.get('/mailingList').success(function (data,status) {
            service.mailingLists =data;
            console.log(data);
            deferred.resolve(data);
        }).error(function (data,status) {
            deferred.reject('error perso');
            console.log('ERROR');
        })

        return deferred.promise;
    };
    


    service.fetchmailingList= function(id) {
        var deferred = $q.defer();

        $http.get('/mailingList/'+id).success(function (data,status) {
           console.log(data);
            deferred.resolve(data);
        }).error(function (data,status) {
            deferred.reject('error perso');
            console.log('ERROR');
        })

        return deferred.promise;
    };
    



    service.addNew=function(mailingList){
        var deferred = $q.defer();

        $http.post('/mailingList',mailingList).success(function (data2,status2) {
        	console.log(data2);
            $http.get('/mailingList/'+data2.id).success(function (data,status) {
                service.mailingLists.unshift(data);
                deferred.resolve(data);
            })
        }).error(function (data,status) {
             deferred.reject(data);
        })
        
        return deferred.promise;      
    }

    service.addNewabonne=function(abonne,list){
        var deferred = $q.defer();

        $http.post('/abonne/'+list,abonne).success(function (data2,status2) {
        	console.log(data2);
            // $http.get('/abonne/'+data2.id).success(function (data,status) {
            	console.log(getIndexInBy(service.mailingLists,'id',list));
                service.mailingLists[getIndexInBy(service.mailingLists,'id',list)].abonnes.unshift(data2);
                deferred.resolve(data2);
            // })
        }).error(function (data,status) {
             deferred.reject(data);
        })
        
        return deferred.promise;      
    }

    
    
    service.remove=function(abonnes, list,cb){
    	console.log('here2');
    	console.log(abonnes);
        for(var i in abonnes)
        {
            $http.delete('/abonne/'+abonnes[i].id).success(function (mailingList,status) {
                console.log(mailingList);
                console.log(service.mailingLists[getIndexInBy(service.mailingLists,'id',list)]);

                console.log(service.mailingLists[getIndexInBy(service.mailingLists,'id',list)].abonnes);
                console.log(getIndexInBy(service.mailingLists[getIndexInBy(service.mailingLists,'id',list)].abonnes,'id',mailingList.id));

                service.mailingLists[getIndexInBy(service.mailingLists,'id',list)].abonnes.splice(getIndexInBy(service.mailingLists[getIndexInBy(service.mailingLists,'id',list)].abonnes,'id',mailingList.id),1)
            	

            	console.log(service.mailingLists);
            	cb(service.mailingLists[getIndexInBy(service.mailingLists,'id',list)].abonnes)

            }).error(function (data,status) {
                console.log('ERROR');
            })
        }
         
    }
    service.removeList=function(listId,cb){
    	console.log(listId);
        
            $http.delete('/mailinglist/'+listId).success(function (mailingList,status) {
                console.log(mailingList);
                 service.mailingLists.splice(getIndexInBy(service.mailingLists,'id',mailingList.id),1)
                 cb();
            }).error(function (data,status) {
                console.log('ERROR');
            })
         
    }
    service.addSeriesMails=function(listId,mailsList){
    	console.log(mailsList);
        	var deferred = $q.defer();

            $http.post('/mailinglist/'+listId+'/addList',mailsList).success(function (results,status) {
                console.log(results);
                 service.currentList.join(results)
                deferred.resolve(results);
            }).error(function (data,status) {
                deferred.reject(data);
            })
         return deferred.promise; 
    }
   


    return service;
}]);