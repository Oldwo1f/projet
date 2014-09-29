
app.directive('piecesjointes', function(
    $q
){
    var slice = Array.prototype.slice;

    return {
        restrict: 'A',
        scope: {list:'=list',filelist:'=filelist'},
        // require: '?ngModel',
        link: function(scope, element, attrs){
            // if(!ngModel) return;

            console.log(scope.list);
            // ngModel.$render = function(){}

            element.bind('change', function(e){
                var element = e.target;
                console.log(element.files);

                scope.filelist=element.files
                // console.log(slice.call(element.files, 0));
                // console.log(typeof(element.files));
                // delete element.files.length;

                // console.log(element.files);
                // for(i in element.files)
                // {
                //     console.log(element.files[i]);
                //     readFile(element.files[i])
                // }
                $q.all(slice.call(element.files, 0).map(readFile))
                .then(function(values){

                    console.log(values);

                    // // if(element.multiple) ngModel.$setViewValue(values);
                    // // else ngModel.$setViewValue(values.length ? values[0] : null);
                    if(values.length) scope.list = values;
                    // // else ngModel.push(values.length ? values[0] : null);

                    // console.log(scope.list);
                });

                function readFile(file) {
                    console.log(file);
                    var deferred = $q.defer();
                    var $file ={};

                    var reader = new FileReader()
                    reader.onload = function(e){
                        // console.log(this);
                        $file.filename = file.name;
                        $file.size = file.size;
                        $file.path = e.target.result;
                        $file.file = file;
                        deferred.resolve($file);
                    }
                    reader.onerror = function(e) {
                        deferred.reject(e);
                    }
                    reader.readAsDataURL(file);

                    return deferred.promise;
                }

            });//change

        }//link

    };

})
;