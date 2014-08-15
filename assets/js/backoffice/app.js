var app = angular.module('app', ['ui.router','clientresize','ui.bootstrap','ngAnimate','ui.sortable','ngTable','angular-loading-bar']);


app.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeBar = true;
  }])
// cfpLoadingBar.start();
function clearSelection() {
    if(document.selection && document.selection.empty) {
        document.selection.empty();
    } else if(window.getSelection) {
        var sel = window.getSelection();
        sel.removeAllRanges();
    }
}
function getIndexInBy(arr,property,value) {
  for(var i in arr)
  {
      // console.log(i);
      // console.log(property);
      // console.log(arr[i][property]);
      // console.log(value);
      if(arr[i][property] ===value)
        return i;
  }
};

app.config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.when('/articles',"/articles/articles");
  $urlRouterProvider.when('/projects',"/projects/projects");
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
          .state('/.projects', {
            url: "projects",
            data:{'mainTabs':'projects'},
            views: {
              'projetsView':{
                templateUrl: "/templates/project/allprojects.html"

              }
            }
          })
                       .state('/.projects.projectscategory', {
                          url: "/category",
                          data:{'projectsTabs':'category'},
                          views: {
                            'projectscategoryView':{
                              templateUrl: "/templates/project/projectscategory.html",
                              // controller:'projetscategoryCtrl',
                              // resolve:{
                              //   categories : function(articlescategoryService) {
                              //     return articlescategoryService.fetchCategories();
                              //   }
                              // }
                            }
                          }
                        })
                       .state('/.projects.projects', {
                          url: "/projects",
                          data:{'projectsTabs':'projects'},
                          views: {
                            'projectsView':{
                              templateUrl: "/templates/project/projects.html",
                              controller:'projectsCtrl',
                              // resolve:{
                              //   categories : function(articlescategoryService) {
                              //     return articlescategoryService.fetchCategories();
                              //   }
                              // }
                            }
                          }
                        })

          .state('/.articles', {
            url: "articles",
            data:{'mainTabs':'articles'},
            views: {
            	'allarticlesView':{
            		templateUrl: "/templates/blog/allarticles.html"
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
                              templateUrl: "/templates/blog/articles.html",
                              controller:'articlesCtrl'

                            }
                          },
                        })
                                      .state('/.articles.articles.edit', {
                                        url: "/edit/:id",
                                        // data:{'articlesTabs':'articles'},
                                        views: {
                                          'editarticlesView':{
                                            templateUrl: "/templates/blog/editarticles.html",
                                            controller:'editarticlesCtrl'
                                          }
                                        },
                                        resolve:{
                                          art:  function(articlesService,$stateParams){
                                            return articlesService.fetchArticle($stateParams.id);
                                          },
                                          category:  function(articlescategoryService){
                                            return articlescategoryService.fetchCategories();
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
                                      .state('/.articles.articles.editimage', {
                                        url: "/editimage/:id",
                                        // data:{'articlesTabs':'articles'},
                                        views: {
                                          'editimagesarticlesView':{
                                            templateUrl: "/templates/blog/editimages.html",
                                            controller:'editimagearticlesCtrl'
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


                        .state('/.articles.category', {
                          url: "/category",
                          data:{'articlesTabs':'category'},
                          views: {
                            'categoryView':{
                              templateUrl: "/templates/blog/articlescategory.html",
                              controller:'articlescategoryCtrl',
                              resolve:{
                                categories : function(articlescategoryService) {
                                  return articlescategoryService.fetchCategories();
                                }
                              }
                            }
                          }
                        })
                                      .state('/.articles.category.add', {
                                        url: "/add",
                                        views: {
                                          'addarticlescategoryView':{
                                            templateUrl: "/templates/blog/addarticlescategory.html",
                                            controller:'addarticlescategoryCtrl'
                                          }
                                        }
                                        
                                      }).state('/.articles.category.edit', {
                                        url: "/edit/:id",
                                        views: {
                                          'editarticlescategoryView':{
                                            templateUrl: "/templates/blog/editarticlescategory.html",
                                            controller:'editarticlescategoryCtrl',
                                            resolve:{
                                              category : function(articlescategoryService,$stateParams) {
                                                console.log('resolveEDitCat');
                                                return articlescategoryService.fetchCategory($stateParams.id);
                                              }
                                            }
                                          }
                                        }
                                        
                                      })
                                      .state('/.articles.category.editimage', {
                                        url: "/editimage/:id",
                                        // data:{'articlesTabs':'articles'},
                                        views: {
                                          'editimagearticlescategoryView':{
                                            templateUrl: "/templates/blog/editimagearticlescategory.html",
                                            controller:'editimagearticlescategoryCtrl',
                                            resolve:{
                                              category : function(articlescategoryService,$stateParams) {
                                                return articlescategoryService.fetchCategory($stateParams.id);
                                              }
                                            }
                                          }
                                        }
                                      })


                        .state('/.articles.comments', {
                          url: "/comments",
                          data:{'articlesTabs':'comments'},
                          views: {
                            'commentsView':{
                              templateUrl: "/templates/blog/comments.html"

                            }
                          }
                        })

    .state('contact', {
      url: "/contact",
      templateUrl: "/templates/contact.html"
    });
  
   
});