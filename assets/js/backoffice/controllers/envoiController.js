app.controller('envoiCtrl',['$scope','filterFilter','$filter','$state','envois','envoiService','$stateParams',
function envoiCtrl($scope,filterFilter,$filter,$state,envois,envoiService,$stateParams) {



    $scope.envois= envois;

    $scope.linkaddList =function(){
        $state.go('/.newsletters.list.add');
    }
    $scope.linkenvoi =function(){
        console.log('YOYOYOYOYOYO');
        $state.go('/.newsletters.envoi.envoiserie');
    }

    $scope.totalChecked = function()
    {
        if(filterFilter($scope.envois,{checked : true}).length == $scope.envois.length)
            $scope.allChecked = true;
        else
            $scope.allChecked = false;
        return filterFilter($scope.envois,{checked : true}).length;
    }
    $scope.toggleAllcheck = function()
    {
        allchecked = !$scope.allChecked;
        $scope.envois.forEach(function(envoi) {
            envoi.checked = allchecked;
        });
    }


    $scope.removeselected =function(){
        envoiService.remove(filterFilter($scope.envois,{checked : true}),function(envois) {
            $scope.envois=envois;
        })

    }



}]);

app.filter('bytes', function() {
    return function(bytes, precision) {
        if (isNaN(parseFloat(bytes)) || !isFinite(bytes)) return '-';
        if (typeof precision === 'undefined') precision = 1;
        var units = ['octets', 'Ko', 'Mo', 'Go', 'To', 'Po'],
            number = Math.floor(Math.log(bytes) / Math.log(1024));
        return (bytes / Math.pow(1024, Math.floor(number))).toFixed(precision) +  ' ' + units[number];
    }
});

app.controller('envoiserieCtrl',['$scope','$upload','filterFilter','$filter','$state','envoiService','$stateParams','mailingLists',
function envoiserieCtrl($scope,$upload,filterFilter,$filter,$state,envoiService,$stateParams,mailingLists) {

    console.log('envoiserie');

    $('.newModal').modal();
    $('.newModal').on('hidden.bs.modal',function(e) {
        $state.go('/.newsletters.envoi');
    });
    $scope.client={};
    $scope.client.checked=false;
    $scope.newEnvoi={};
    $scope.newEnvoi.content='';
    $scope.pjs=[];$scope.filelist;
    $scope.mailingLists=mailingLists;
    console.log($scope.mailingLists);

    $scope.clickAddPj = function($event) {
        setTimeout(function() {
            $($event.target).find('input').click();
        },0);
    }  
    $scope.removePj = function($index) {
        console.log('here');
        $scope.pjs={};
        $scope.filelist={};

        console.log($scope.newEnvoi);
        console.log($scope.filelist);
    }   


    // $scope.$watch('newEnvoi',function() {

    //     console.log($scope.newEnvoi);

    // })
    $scope.Envoi=function() {

        $scope.newEnvoi.destinataire=[];
        for(i in $scope.mailingLists)
        {
            if($scope.mailingLists[i].checked === true)
            {
                console.log('COOL');
                $scope.newEnvoi.destinataire.push($scope.mailingLists[i].id)
            }
        }
        $scope.newEnvoi.client= $scope.client.checked;



        console.log('ENVOIENVOIENVOIENVOIENVOIENVOIENVOI');
        console.log($scope.newEnvoi);
        console.log($scope.filelist);
        // var fileList = new FileList();
        // console.log(fileList);
        // for(i in $scope.pjs)
        // {
        //     fileList[''+i] =$scope.pjs[i].file;
        // }
        // fileList['length'] = $scope.pjs.length;
        // console.log(fileList);
        envoiService.send($scope.newEnvoi,$scope.filelist)

    };

	// $scope.linkaddList =function(){
 //        $state.go('/.newsletters.list.add');
 //    }
 //    $scope.linkenvoi =function(){
	// 	console.log('YOYOYOYOYOYO');
 //        $state.go('/.newsletters.envois.envoi');
 //    }

 //    $scope.totalChecked = function()
 //    {
 //        if(filterFilter($scope.envois,{checked : true}).length == $scope.envois.length)
 //            $scope.allChecked = true;
 //        else
 //            $scope.allChecked = false;
 //        return filterFilter($scope.envois,{checked : true}).length;
 //    }
 //    $scope.toggleAllcheck = function()
 //    {
 //        allchecked = !$scope.allChecked;
 //        $scope.envois.forEach(function(envoi) {
 //            envoi.checked = allchecked;
 //        });
 //    }


 //    $scope.removeselected =function(){
 //        envoiService.remove(filterFilter($scope.envois,{checked : true}),function(envois) {
 //        	$scope.envois=envois;
 //        })

 //    }



}]);


// app.controller('addmailinglistCtrl',['$scope','filterFilter','$filter','$state','envoiService',
// function addmailinglistCtrl($scope,filterFilter,$filter,$state,envoiService) {
// 	$scope.newList={};
// 	console.log('mailingListsCTRL');
// 	$('.newModal').modal();
//     $('.newModal').on('hidden.bs.modal',function(e) {
//         $state.go('/.newsletters.list');
//     });

//     $scope.submitNew=function() {
        
//         if($scope.newList.title)
//         {

// 	        envoiService.addNew($scope.newList).then(function() {
// 	            $scope.newList.title='';
// 	            $state.go('/.newsletters.list');
// 	        },function(err) {
// 	            console.log(err);
// 	            console.log(err.error.invalidAttributes);
// 	            if(err.error.invalidAttributes)
// 	            {
// 	                invalAttrs = err.error.invalidAttributes;
// 	                console.log(invalAttrs);
// 	                for(var i in invalAttrs)
// 	                {
// 	                    console.log(i);
// 	                    $('[name="'+i+'"]').parent().addClass('has-error');
// 	                }
// 	            }
// 	        })
//         }
        
//     };

// }]);
// app.controller('addabonneCtrl',['$scope','filterFilter','$filter','$state','envoiService',
// function addabonneCtrl($scope,filterFilter,$filter,$state,envoiService) {
// 	$scope.newAbonne={};
// 	console.log('addabonneCtrl');
// 	$('.newModal').modal();
//     $('.newModal').on('hidden.bs.modal',function(e) {
//         $state.go('/.newsletters.list');
//     });

//     $scope.submitNew=function() {
//         console.log('heheheheheh');
//         if($scope.newAbonne.email && $scope.currentList != null)
//         {

// console.log('heheheheheh');
// 	        envoiService.addNewabonne($scope.newAbonne,$scope.currentList).then(function(data) {
// 	            $scope.newAbonne.email='';
// 	            $scope.abonnes.unshift(data)
// 	            $state.go('/.newsletters.list');
// 	        },function(err) {
// 	            console.log(err);
// 	            console.log(err.error.invalidAttributes);
// 	            if(err.error.invalidAttributes)
// 	            {
// 	                invalAttrs = err.error.invalidAttributes;
// 	                console.log(invalAttrs);
// 	                for(var i in invalAttrs)
// 	                {
// 	                    console.log(i);
// 	                    $('[name="'+i+'"]').parent().addClass('has-error');
// 	                }
// 	            }
// 	        })
//         }
        
//     };

// }]);