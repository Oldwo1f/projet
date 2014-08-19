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
                    'width': 400,
                    'height':400
                }
            ],
        }
    }
    service.maintabs=[
    {'title':'Dashboard','name' :'dashboard','active':false,'viewName':'dashboardView'},
    {'title':'Gestions des utilisateurs','name' :'users','active':false,'viewName':'usersView'},
    {'title':'Gestion du blog','name' :'articles','active':false,'viewName':'allarticlesView'},
    {'title':'Gestion des projets','name' :'projects','active':false,'viewName':'projetsView'},
    ];
    service.articlestabs=[
    {'title':'Articles','name' :'articles','active':false},
    {'title' :'Catégories','name' :'category','active':false},
    {'title':'Commentaires','name' :'coments','active':false}
    ];
    service.projectstabs=[
    {'title':'Projects','name' :'projects','active':false},
    {'title' :'Catégories','name' :'projectscategory','active':false},
    ];


    return service;
}]);