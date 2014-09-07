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
            project:[
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
            projectCategory:[
                {  
                    'title':'miniature',
                    'folder':'thumbs',
                    'width': 400,
                    'height':400
                }
            ],
            homeGalery:[
                {  
                    'title':'Image principale',
                    'folder':'homeSlider',
                    'width': 500,
                    'height':500
                }
            ],
        }
    }
    service.maintabs=[
    {'title':'Dashboard','name' :'dashboard','active':false,'viewName':'dashboardView'},
    {'title':'Utilisateurs','name' :'users','active':false,'viewName':'usersView'},
    {'title':'Blog','name' :'articles','active':false,'viewName':'allarticlesView'},
    {'title':'Projets','name' :'projects','active':false,'viewName':'projetsView'},
    {'title':'Galerie d\'images','name' :'galery','active':false,'viewName':'galeryView'},
    {'title':'Livre d\'or','name' :'goldenbook','active':false,'viewName':'goldenbookView'},
    ];
    service.articlestabs=[
    {'title':'Articles','name' :'articles','active':false},
    {'title' :'Catégories','name' :'category','active':false},
    {'title':'Commentaires','name' :'coments','active':false}
    ];
    service.projectstabs=[
    {'title':'Projects','name' :'projects','active':false},
    {'title' :'Catégories','name' :'category','active':false},
    ];
    service.galerytabs=[
    {'title':'Page d\'accueil','name' :'home','active':false},
    ];
    service.userstabs=[
    {'title':'Utilisateurs internes','name' :'user','active':false},
    {'title':'Clients','name' :'client','active':false},
    ];


    return service;
}]);