app.directive('urlprefixer', function($compile) {
    return {

      restrict: 'A',
      scope: false,
      // template:'',
      // controller:function($scope) {
      //     // $scope.remaining= $scope.maxChar;
      // },
      link:function(scope, element, attrs) {
        scope.focused=false;
        $input = $(element)
        scope.urlprefixer = attrs.urlprefixer;
        scope.urlprefixerwidth = attrs.urlprefixerwidth;
        $input.after($compile('<div class="urlprefix" >{{urlprefixer}}</div>')(scope));
        // $input.on('focus',function(e) {
        //       console.log('focus');
        //     scope.focused=true;
        //     scope.$apply();
        //     console.log($input.parent());
        //     console.log($($input).parent().parent());
        //     console.log($input.parent().parent().find('.urlprefix'));
        //     $input.parent().parent().find('.urlprefix').removeClass('ng-hide');
        console.log(scope.urlprefixerwidth);
        $input.css('text-indent', scope.urlprefixerwidth)
        // })
      }

      
            
                
            
    };
  });