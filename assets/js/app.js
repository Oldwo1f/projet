var app = angular.module('app', ['ui.router','clientresize','ui.bootstrap','ngAnimate']);


// app.config(function($routeProvider) {
// 		$routeProvider

// 			// route for the home page
// 			// .when('/', {
// 			// 	templateUrl : '/toto',
// 			// })

// 			// route for the about page
// 			.when('/', {
// 				templateUrl : '/tata',
// 			})

// 			// route for the contact page
// 			.when('/contact', {
// 				templateUrl : '/titi',
// 			});
// 	});

app.config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.when('/articles',"/articles/articles");
  $urlRouterProvider.otherwise("/dashboard");
  //
  // Now set up the states
  $stateProvider
    .state('/', {
      url: "/",
      templateUrl: "/templates/root.html",

    })
          .state('/.users', {
            url: "users",
            data:{'mainTabs':'users'},
            views: {
            	'usersView':{
            		templateUrl: "/templates/users.html"

            	}
            }
          })
          .state('/.dashboard', {
            url: "dashboard",
            data:{'mainTabs':'dashboard'},
            views: {
            	'dashboardView':{
            		templateUrl: "/templates/dashboard.html"

            	}
            }
          })
          .state('/.projets', {
            url: "projets",
            data:{'mainTabs':'projets'},
            views: {
              'projetsView':{
                templateUrl: "/templates/projets.html"

              }
            }
          })
          .state('/.articles', {
            url: "articles",
            data:{'mainTabs':'articles'},
            views: {
            	'allarticlesView':{
            		templateUrl: "/templates/allarticles.html"
            	}
            },
            onEnter:function(){
              console.log('enter Articles');

            }
          })
                        .state('/.articles.articles', {
                          url: "/articles",
                          data:{'articlesTabs':'articles'},
                          views: {
                            'articlesView':{
                              templateUrl: "/templates/articles.html",
                              controller:'articlesCtrl'

                            }
                          },
                        })
                                      .state('/.articles.articles.edit', {
                                        url: "/edit/:id",
                                        // data:{'articlesTabs':'articles'},
                                        views: {
                                          'editarticlesView':{
                                            templateUrl: "/templates/editarticles.html",
                                            controller:'editarticlesCtrl'
                                          }
                                        },
                                        onEnter:function($state) {
                                          $('tr.ligneModif').show();
                                        },
                                        onExit:function($state) {
                                          $('tr.ligne[rel="'+$state.params.id+'"]').show();
                                          $('tr.ligneModif').hide();
                                        }
                                      })

                        .state('/.articles.comments', {
                          url: "/comments",
                          data:{'articlesTabs':'comments'},
                          views: {
                            'commentsView':{
                              templateUrl: "/templates/comments.html"

                            }
                          }
                        })

    .state('contact', {
      url: "/contact",
      templateUrl: "/templates/contact.html"
    });
   
});