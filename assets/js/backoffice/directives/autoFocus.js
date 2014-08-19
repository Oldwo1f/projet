app.directive('autoFocus', function($timeout) {
    return {
        restrict: 'AC',
        link: function(scope, element) {
        	console.log('LINK AUTOFUCO');
            $timeout(function(){
            	console.log(element);
            	element[0].value = 'tt';
            	console.log('delay 1000');
                // _element[0]
                 element[0].focus();
                 scope.$apply();
            }, 3000);
        }
    };
});