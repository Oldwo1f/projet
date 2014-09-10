app.factory('projectsService', ['$http','$q',function ($http,$q) {
    var service = {};
    service.projects=[];


    service.fetchProjects= function() {
        var deferred = $q.defer();

        $http.get('/project').success(function (data,status) {
            service.projects =data;
            console.log(data);
            deferred.resolve(data);
        }).error(function (data,status) {
            deferred.reject('error perso');
            console.log('ERROR');
        })

        return deferred.promise;
    };
    


    service.fetchProject= function(id) {
        var deferred = $q.defer();

        $http.get('/project/'+id).success(function (data,status) {
           console.log(data);
            deferred.resolve(data);
        }).error(function (data,status) {
            deferred.reject('error perso');
            console.log('ERROR');
        })

        return deferred.promise;
    };
    



    service.addNew=function(project){
        var deferred = $q.defer();

        $http.post('/project',project).success(function (data2,status2) {
            $http.get('/project/'+data2.id).success(function (data,status) {
                service.projects.unshift(data);
                deferred.resolve(data);
            })
        }).error(function (data,status) {
             deferred.reject(data);
        })
        
        return deferred.promise;      
    }

    service.edit=function(project){
        var deferred = $q.defer();
        $http.put('/project/'+project.id,project).success(function (data2,status) {
            $http.get('/project/'+project.id).success(function (data,status) {
                console.log(data);
                service.projects.splice(getIndexInBy(service.projects,'id',project.id),1,data)
                deferred.resolve(data);
            })
        }).error(function (data,status) {
            deferred.reject(data);
        })
        return deferred.promise;
    }
    service.changeStatusProject=function(array,status){
        var deferred = $q.defer();
        for(var i in array)
        {
            array[i].status =status;
            $http.put('/project/'+array[i].id,array[i]).success(function (project,status) {
                console.log(project);
                service.projects.splice(getIndexInBy(service.projects,'id',project.id),1,project)
            }).error(function (data,status) {
                console.log('ERROR');
                deferred.reject(data);
            })
        }
    }
    service.remove=function(catArray){

        for(var i in catArray)
        {
            $http.delete('/project/'+catArray[i].id).success(function (project,status) {
                console.log(project);
                 service.projects.splice(getIndexInBy(service.projects,'id',project.id),1)
            }).error(function (data,status) {
                console.log('ERROR');
            })
        }
         
    }
    service.removeimage=function(project,image){
        $http.delete('/image/'+image.id).success(function (data,status) {

            project.images.splice(getIndexInBy(project.images,'id',image.id),1);
            service.projects.splice(getIndexInBy(service.projects,'id',project.id),1,project)


        }).error(function (data,status) {
            console.log('ERROR');
        })
    }

    service.replace=function(project){
        
        service.projects.splice(getIndexInBy(service.projects,'id',project.id),1,project)
        return;
    }
    service.updateImgIndex=function(image,project){
        var deferred = $q.defer();
        console.log(image);
        $http.put('/image/'+image.id,image).success(function (image,status) {
            image.projectproject = image.projectproject.id;
            project.images.splice(getIndexInBy(project.images,'id',image.id),1,image);
            service.projects.splice(getIndexInBy(service.projects,'id',project.id),1,project)
            deferred.resolve(image);
        }).error(function (data,status) {
            console.log('ERROR');
            deferred.reject(data);
        })
        return deferred.promise;
    }


    return service;
}]);