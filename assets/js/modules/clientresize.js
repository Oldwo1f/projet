var clientResize = angular.module('clientresize',['angularFileUpload']);

clientResize.directive('clientresize', function() {
    return {
      restrict: 'E',
      templateUrl:'/js/modules/clientresize.html',
      scope:{ multiple:'=',boxsize :'=boxsize',itemid:"=itemid", itemtype:"=itemtype",steps :'=steps'},
      controller :function($scope) {
      		console.log('controller');
      		//ATTRIBUT
      		$scope.uploadArray = [];
      		
      		$scope.$safeApply = function(fn) {
			  var phase = this.$root.$$phase;
			  if(phase == '$apply' || phase == '$digest') {
			    if(fn && (typeof(fn) === 'function')) {
			      fn();
			    }
			  } else {
			    this.$apply(fn);
			  }
			};
			/** *****************************************************************************************
			*********************************************************************************************
																						Click on button
			*********************************************************************************************
			********************************************************************************************/
      		$scope.clickAddImg = function($event) {
		    	console.log($($event.target).find('input'))
		    	// console.log($($event.target))
		    	setTimeout(function() {
		    		$($event.target).find('input').click();
		    	},0);
		    }   
			/** *****************************************************************************************
			*********************************************************************************************
																						ON FILE SELECT
			*********************************************************************************************
			********************************************************************************************/
      		$scope.onFileSelect = function($files) {
		    	console.log('onFileSelect --> START');
		    	var startindex = $scope.uploadArray.length;
		    	for(var i in $files){
		    		var $f = [];
		    		$f['file'] = $files[i];
		    		$f['statusUpload'] = 'added';
		    		$f['statusResize'] = 'added';
		    		var index = $scope.uploadArray.push($f);
		    		index--;
		    		// --> Start upload
		    		console.log(index);
		    		$scope.startUpload(index)
		    		$scope.addResizeQueu(index)

		    	};
		    	 // = $scope.uploadArray.concat($filess)
		    	console.log($scope.uploadArray);
		    	console.log('onFileSelect --> END');
		    	$scope.startResizeQueu(startindex);
		    }      		
		    /** *****************************************************************************************
		    *********************************************************************************************
		    																				START UPLOAD
		    *********************************************************************************************
		    ********************************************************************************************/
		    $scope.startUpload = function(index) {
		    	console.log('UPLOAD --> START');
		    	$scope.uploadArray[index].statusUpload = 'starting';
		    		
		    	console.log('UPLOAD --> END');
		    }      		
		    /** *****************************************************************************************
		    *********************************************************************************************
		    																				addResizeQueu
		    *********************************************************************************************
		    ********************************************************************************************/
		    $scope.addResizeQueu = function(index) {
		    	$scope.uploadArray[index].statusResize = 'addedtoqueu';
		    		
		    }      		
		    /** *****************************************************************************************
		    *********************************************************************************************
		    																			startResizeQueu
		    *********************************************************************************************
		    ********************************************************************************************/
		    $scope.startResizeQueu = function(startindex) {
		    	console.log(startindex);
		    	$('#myModal').modal('show');	    	
		    	$scope.resize(startindex);
               	
        	}      		
		    /** *****************************************************************************************
		    *********************************************************************************************
		    																					Resize
		    *********************************************************************************************
		    ********************************************************************************************/
		    $scope.resize = function(imgId) {
		    	

		    	$scope.imageResizing = imgId;
		    	console.log($scope.uploadArray[imgId]['file']);

		    	if (window.FileReader && $scope.uploadArray[imgId]['file'].type.indexOf('image') > -1) {
		    		console.log('here');
	        		var fileReader = new FileReader();
	                fileReader.readAsDataURL($scope.uploadArray[imgId]['file']);
	                // $scope.selectedFiles[i]['fileReader']=fileReader;
	                (function(imgId){
	                	fileReader.onload = function(e) {
	                        // $timeout(function() {
	                        //   $scope.dataUrls[imgId] = e.target.result;
	                        //   $scope.uploadFile(imgId);
	                        // });

	                		console.log('onload');
	                    	$scope.uploadArray[imgId]['statusResize'] ='resizing';
	                    	$scope.uploadArray[imgId]['img'] = new Image;
				            $scope.uploadArray[imgId]['img']['src'] = e.target.result;
				            console.log();
				            
				            $scope.step(0);
	                	}
	                }(imgId));
               	}
        	
		    		
		    }      		
		    /** *****************************************************************************************
		    *********************************************************************************************
		    																						step
		    *********************************************************************************************
		    ********************************************************************************************/
		    $scope.step = function(step) {
		    	
		    	// $scope.imageResizing;
		    	$scope.currentstep =step;
		    	console.log($scope.steps[step].width);
		    	console.log($scope.steps[step]);
		    	$('.cl-borderBox').css({'width':$scope.steps[step].width+'px','height':$scope.steps[step].height+'px','margin-left':(-$scope.steps[step].width/2)+'px','margin-top':(-$scope.steps[step].height/2)+'px'})
		    	$scope.currentzoom=1;
				$scope.currentX=0;
				$scope.currentY=0;
				$('#slider').slider('setValue',1);
		    	
		    	if(step == 0)
		    	{
		    		$scope.currentSrc = $scope.uploadArray[$scope.imageResizing]['img'].src;
		    		$scope.originalWidth = $scope.uploadArray[$scope.imageResizing]['img'].width;
        			$scope.$safeApply();
		    	}
    	        $('.cl-imgContainer img').css({
		          top: 0 + 'px',
		          left:  0 + 'px'
		        }).width($scope.originalWidth);

		    	console.log($scope.currentSrc);
		    }      		
		    /********************************************************************************************
		    *********************************************************************************************
		    																					zomming
		    *********************************************************************************************
		    ********************************************************************************************/
		    $scope.zomming = function() {
		    	
		    	// $scope.imageResizing;
		    	
		    	console.log('ZOOMING');
		    	console.log($scope.currentSrc);
		    }      		
		    /** *****************************************************************************************
		    *********************************************************************************************
		    																				VALIDATE STEP
		    *********************************************************************************************
		    ********************************************************************************************/
		    $scope.validateStep = function() {
		    	console.log('VALIDATESTEP');
		    	var step = $scope.currentstep;
		    	//ajouter les valeur de zoom et position  pour cette etape
		    	if(typeof($scope.uploadArray[$scope.imageResizing].resizeStuff) != 'object')
		    		$scope.uploadArray[$scope.imageResizing].resizeStuff = [];
		    	if(typeof($scope.uploadArray[$scope.imageResizing].resizeStuff[step]) != 'object')
		    		$scope.uploadArray[$scope.imageResizing].resizeStuff[step] = [];
		    	$scope.uploadArray[$scope.imageResizing].resizeStuff[step].zoom=$scope.currentzoom;
		    	$scope.uploadArray[$scope.imageResizing].resizeStuff[step].x=$scope.currentX;
		    	$scope.uploadArray[$scope.imageResizing].resizeStuff[step].y=$scope.currentY;
		    	$scope.uploadArray[$scope.imageResizing].resizeStuff[step].cropWidth=$scope.steps[step].width;
		    	$scope.uploadArray[$scope.imageResizing].resizeStuff[step].cropHeight=$scope.steps[step].height;
		    	$scope.uploadArray[$scope.imageResizing].resizeStuff[step].folder=$scope.steps[step].folder;
		    	
		    	if(step< $scope.steps.length-1)
		    	{
			    	
		    		$scope.step(step+1);



		    	}else{
			    	
		    		//check si image suivante
		    		if($scope.uploadArray.length === $scope.imageResizing+1)
		    		{
		    			console.log('Dernier image');
		    			console.log($scope.uploadArray);
		    			//CLIENT RESIZE FINISH
		    			$('#myModal').modal('hide');	
		    		}else{
		    			console.log('next image');
		    			$scope.imageResizing++;
		    			$scope.resize($scope.imageResizing);
		    		}
		    	}
		    	
		    	// console.log($scope.currentSrc);
		    }
      },
      link:function(scope,elem, attrs) {
      		console.log('link');
      		$('#myModal').modal({show:false,backdrop:'static'});
      		$('#slider').slider({min:0.2,max:1.5,value:1, step:0.05,tooltip:'hide'}).on('slide', function(ev){
    			scope.currentzoom=ev.value;
    			var originalWidth = $(this).parent().parent().parent().find('.cl-imgContainer img').attr('originalWidth');
    			$(this).parent().parent().parent().find('.cl-imgContainer img').width(ev.value*originalWidth)
  			});
      }	
    };
});



clientResize.directive('myOndragstart', function($document) {
        return function(scope, element, attr) {
      var startX = 0, startY = 0, x = 0, y = 0;
 
      element.css({
       position: 'relative',
       cursor: 'move'
      });
 
      element.on('mousedown', function(event) {
        // Prevent default dragging of selected content
        event.preventDefault();
        console.log(event);
        startX = 0, startY = 0, x = 0, y = 0;
        startX = event.pageX - x;
        startY = event.pageY - y;
        // console.log(startX);
        // console.log(startY);
        $document.on('mousemove', mousemove);
        $document.on('mouseup', mouseup);
      });
 
      function mousemove(event) {
        y = event.pageY - startY;
        x = event.pageX - startX;
        // if(x >20) x = 20;
        // if(y >20) y = 20;

        // console.log(element)
        // console.log(element.context)
        // console.log(element.context.nextElementSibling)
        // console.log();

        // console.log(-element.width());
        // if(x < -element.width() + $(element.context.nextElementSibling).width()+26) x = -element.width() + $(element.context.nextElementSibling).width()+26;
        // if(y < -element.height() + $(element.context.nextElementSibling).height()+26) y = -element.height() + $(element.context.nextElementSibling).height()+26;



        // console.log(x +' <==> '+y);
        element.css({
          top: y + 'px',
          left:  x + 'px'
        });
        scope.currentX = x;
        scope.currentY = y;

      }
 
      function mouseup() {
        $document.unbind('mousemove', mousemove);
        $document.unbind('mouseup', mouseup);
        startX =0;
        starty =0;
      }
    }
  });