app.directive('removeremove', function(){
    return {
        restrict: 'E',
        // transclude: true,
        scope: { action:'=action',image:'=image'},
        template: '<button type="button"  class="btn btn-danger btn-xs">' +
                    '<span class="glyphicon glyphicon-trash"></span>Supprimer' +
                  '</button>'
        ,
        link:function(scope, element, attrs) {


	        	scope.clickedOnce = false;
	        	$(element).find('button').click(function() {
	        		var t = $(this);
	        		if(!scope.clickedOnce)
	        		{
	        			t.addClass('expand')
	        			scope.clickedOnce = true;
	        			console.log(t);
	        			t.html('<span class="glyphicon glyphicon-trash"></span>Supprimer définitivement')
	        			var timeout = setTimeout(function() {
	        				t.removeClass('expand')
	        				scope.clickedOnce = false;
	        				t.html('<span class="glyphicon glyphicon-trash"></span>Supprimer')
	        			},5000)
	        		}else
	        		{
	        			// scope.click(); 
	        			t.removeClass('expand')
	        			scope.clickedOnce = false;
	        			t.html('<span class="glyphicon glyphicon-trash"></span>Supprimer')
	        			
	        				if(scope.image)
					        {
					        		scope.action(scope.image);
					        }else{
					        		scope.action();
					        	
					        }
	        		}
	        	})

      	}
     }
  })