app.factory('configService', ['$http','$q',function ($http,$q) {
    var service = {};
    service.frontConfig={};
    console.log('configService');

    service.frontConfig={
        imageResize:{
            article:[
                {  
                    'title':'mini',
                    'folder':'thumbs',
                    'width': 200,
                    'height':300
                },{  
                    'title':'thumbs',
                    'folder':'thumbs2',
                    'width': 600,
                    'height':400
                },{  
                    'title':'square',
                    'folder':'thumbs3',
                    'width': 400,
                    'height':400
                    }
            ],
            articleCategory:[
                {  
                    'title':'miniature',
                    'folder':'thumbs',
                    'width': 300,
                    'height':200
                },{  
                    'title':'thumbs',
                    'folder':'thumbs2',
                    'width': 800,
                    'height':600
                }
            ],
        }
    }



    return service;
}]);