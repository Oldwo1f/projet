app.factory('configService', ['$http','$q',function ($http,$q) {
    var service = {};
    service.frontConfig={};
    console.log('configService');
    service.h1 = 'Administration NUTRIMARKETING';
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
            profilepicture:[
                {  
                    'title':'Image principale',
                    'folder':'profilepicture',
                    'width': 500,
                    'height':500
                },{  
                    'title':'Miniature',
                    'folder':'thumbs',
                    'width': 50,
                    'height':50
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
    {'title':'Newsletters','name' :'newsletters','active':false,'viewName':'newslettersView'},
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
    service.newsletterstabs=[
    {'title':'Mes listes','name' :'list','active':false},
    {'title':'Envoie de mail','name' :'envoi','active':false},
    ];

    service.languages=['fr','en'];


    return service;
}]);