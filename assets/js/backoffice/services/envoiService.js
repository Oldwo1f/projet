app.factory('envoiService', ['$http','$q','$upload',function ($http,$q,$upload) {
    var service = {};
    service.envois=[];


    service.fetchenvois= function() {
        var deferred = $q.defer();

        $http.get('/envoi').success(function (data,status) {
            service.envois =data;
            console.log(data);
            deferred.resolve(data);
        }).error(function (data,status) {
            deferred.reject('error perso');
            console.log('ERROR');
        })

        return deferred.promise;
    };

    service.send= function(envoi,files) {
        var deferred = $q.defer();
        console.log(files);
        console.log(envoi);
        $upload.upload({
            url: '/envoiserie',
            method: 'POST',
            // headers: {'header-key': 'header-value'},
            // withCredentials: true,
            file: (typeof(files)!='undefined') ? files[0] : null, // or list of files: $files for html5 only
            // fileName: 'doc.jpg' or ['1.jpg', '2.jpg', ...] // to modify the name of the file
        /* customize file formData name ('Content-Desposition'), server side file variable name. 
            Default is 'file' */
            fileFormDataName: 'pjs',//or a list of names for multiple files (html5).
            /* customize how data is added to formData. See #40#issuecomment-28612000 for sample code */
            //formDataAppender: function(formData, key, val){}

            data: envoi

        }).progress(function(evt) {
            console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
        }).success(function(data, status, headers, config) {
            // file is uploaded successfully
            console.log('success upload');
            console.log(data);
            // $scope.$parent.recupImage(data);
        });



        // $http.post('/envoiserie',envoi).success(function (data,status) {
        //     // service.envois =data;
        //     console.log(data);
        //     deferred.resolve(data);
        // }).error(function (data,status) {
        //     deferred.reject('error perso');
        //     console.log('ERROR');
        // })

        return deferred.promise;
    };
    
    
    service.remove=function(abonnes, list,cb){
    	console.log('here2');
    	console.log(abonnes);
        for(var i in abonnes)
        {
            $http.delete('/abonne/'+abonnes[i].id).success(function (envoi,status) {
                console.log(envoi);
                console.log(service.envois[getIndexInBy(service.envois,'id',list)]);

                console.log(service.envois[getIndexInBy(service.envois,'id',list)].abonnes);
                console.log(getIndexInBy(service.envois[getIndexInBy(service.envois,'id',list)].abonnes,'id',envoi.id));

                service.envois[getIndexInBy(service.envois,'id',list)].abonnes.splice(getIndexInBy(service.envois[getIndexInBy(service.envois,'id',list)].abonnes,'id',envoi.id),1)
            	

            	console.log(service.envois);
            	cb(service.envois[getIndexInBy(service.envois,'id',list)].abonnes)

            }).error(function (data,status) {
                console.log('ERROR');
            })
        }
         
    }

    return service;
}]);