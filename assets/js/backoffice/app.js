var app = angular.module('app', ['gapi','satellizer','markdownpreview','ngLocale','ui.router','clientresize','ui.bootstrap','ngAnimate','ui.bootstrap.datetimepicker','ui.sortable','angular-loading-bar']);


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
      if(arr[i][property] ===value)
        return i;
  }
};

app.config(function($authProvider) {

    // $authProvider.facebook({
    //   clientId: '624059410963642',
    // });

    // $authProvider.google({
    //   clientId: '631036554609-v5hm2amv4pvico3asfi97f54sc51ji4o.apps.googleusercontent.com'
    // });

    // $authProvider.github({
    //   clientId: '0ba2600b1dbdb756688b'
    // });

    // $authProvider.linkedin({
    //   clientId: '77cw786yignpzj'
    // });

    // $authProvider.twitter({
    //   url: '/auth/twitter'
    // });

    // $authProvider.oauth2({
    //   name: 'foursquare',
    //   url: '/auth/foursquare',
    //   redirectUri: window.location.origin,
    //   clientId: 'MTCEJ3NGW2PNNB31WOSBFDSAD4MTHYVAZ1UKIULXZ2CVFC2K',
    //   authorizationEndpoint: 'https://foursquare.com/oauth2/authenticate',
    // });

  });

app.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.when('/articles',"/articles/articles");
  $urlRouterProvider.when('/projects',"/projects/projects");
  $urlRouterProvider.when('/galery',"/galery/home");
  $urlRouterProvider.when('/users',"/users/user");
  // $urlRouterProvider.when('/',"/dashboard");
  // $urlRouterProvider.when('/login',"../");
  $urlRouterProvider.otherwise("/");
  
  // Now set up the states
  $stateProvider
    .state('/login', {
      url: "/login",
      templateUrl: "/templates/global/login.html",
      controller:'loginCtrl'
    })
    .state('/', {
      url: "/",
      // templateUrl: "/templates/global/root.html",
      
      views: {
              'navbarView':{
                templateUrl: "/templates/global/navbar.html",
                controller:'navbarCtrl',
                resolve: {
                    me: function(accountService, $auth) {
                      return accountService.getProfile();
                    }
                }
              },
              'rootView':{
                templateUrl:"/templates/global/root.html"
              }
            }
    })
          .state('/.users', {
            url: "users",
            data:{'mainTabs':'users'},
            views: {
            	'usersView':{
            		templateUrl: "/templates/user/main.html"

            	}
            },
            // resolve: {
            //   authenticated: ['$location', '$auth', function($location, $auth) {
            //     if (!$auth.isAuthenticated()) {
            //       return $location.path('/toototo');
            //     }
            //   }]
            })
                       .state('/.users.user', {
                          url: "/user",
                          data:{'usersTabs':'user'},
                          views: {
                            'userView':{
                              templateUrl: "/templates/user/user.html",
                              controller:'usersCtrl',
                              data:{'usersTabs':'user'},
                              resolve:{
                                users : function(userService) {
                                  console.log('resolve users');
                                  return userService.fetchUsers();
                                }
                              }
                            }
                          }
                        })
                                      .state('/.users.user.add', {
                                        url: "/add",
                                        views: {
                                          'adduserView':{
                                            templateUrl: "/templates/user/adduser.html",
                                            controller:'adduserCtrl'
                                          }
                                        }
                                      })
                                      .state('/.users.user.edit', {
                                        url: "/edit/:id",
                                        views: {
                                          'edituserView':{
                                            templateUrl: "/templates/user/edituser.html",
                                            controller:'edituserCtrl',
                                            resolve:{
                                              user : function(userService,$stateParams) {
                                                console.log('resolveEDitCat');
                                                return userService.fetchUser($stateParams.id);
                                              }
                                            }
                                          }
                                        }
                                      })
                       .state('/.users.client', {
                          url: "/client",
                          data:{'usersTabs':'client'},
                          views: {
                            'clientView':{
                              templateUrl: "/templates/user/client.html",
                              controller:'clientCtrl',
                              data:{'usersTabs':'client'},
                              resolve:{
                                users : function(userService) {
                                  console.log('resolve users');
                                  return userService.fetchClients();
                                }
                              }
                            }
                          }
                        })
                                      .state('/.users.client.add', {
                                        url: "/add",
                                        views: {
                                          'addclientView':{
                                            templateUrl: "/templates/user/addclient.html",
                                            controller:'addclientCtrl'
                                          }
                                        }
                                      })
                                      .state('/.users.client.edit', {
                                        url: "/edit/:id",
                                        views: {
                                          'editclientView':{
                                            templateUrl: "/templates/user/editclient.html",
                                            controller:'editclientCtrl',
                                            resolve:{
                                              user : function(userService,$stateParams) {
                                                console.log('resolveEDitCat');
                                                return userService.fetchUser($stateParams.id);
                                              }
                                            }
                                          }
                                        }
                                      })
          .state('/.dashboard', {
            url: "dashboard",
            data:{'mainTabs':'dashboard'},
            views: {
              'dashboardView':{
                templateUrl: "/templates/dashboard.html",
                controller:'dashboardCtrl',
                // resolve:{
                //    init: function(gapiService) {
                //     // console.log(analitycsreporter);
                //     console.log('thisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthis');
                //     // console.log(analitycsreporterCtrl.toto());
                //       return gapiService.yo()
                //    }
                // }
              }
            }
          })
          /////////////////////////////////////////////////////////////////////////////////////goldenbook
          .state('/.goldenbook', {
            url: "goldenbook",
            data:{'mainTabs':'goldenbook'},
            views: {
              'goldenbookView':{
                templateUrl: "/templates/goldenbook/main.html",
                controller:'goldenbookCtrl',
                resolve:{
                  goldenbooks : function(goldenbookService) {
                    console.log('resolve gBook');
                    return goldenbookService.fetchGoldenbooks();
                  }
                }
              }
            }
          })
          /////////////////////////////////////////////////////////////////////////////////////SLIDER IMAGES
          .state('/.galery', {
            url: "galery",
            data:{'mainTabs':'galery'},
            views: {
              'galeryView':{
                templateUrl: "/templates/galery/main.html"

              }
            }
          })
                            .state('/.galery.home', {
                              url: "/home",
                              data:{'galeryTabs':'home'},
                              views: {
                              	'homeView':{
                              		templateUrl: "/templates/galery/home.html",
                                  controller:'galeryCtrl',
                                  resolve:{
                                    galery : function(galeryService) {
                                      console.log('resolve galeryService');
                                      // return ['tototototototot'];
                                      return galeryService.fetchGalery('5406c79fa015780c3c2e40de');
                                    }
                                  }
                              	}
                              }
                            })
          /////////////////////////////////////////////////////////////////////////////////////PROJECTS
          .state('/.projects', {
            url: "projects",
            data:{'mainTabs':'projects'},
            views: {
              'projetsView':{
                templateUrl: "/templates/project/main.html"

              }
            }
          })
                       .state('/.projects.category', {
                          url: "/category",
                          data:{'projectsTabs':'category'},
                          views: {
                            'categoryView':{
                              templateUrl: "/templates/project/projectscategory.html",
                              controller:'projectscategoryCtrl',
                              data:{'projectsTabs':'category'},
                              resolve:{
                                categories : function(projectscategoryService) {
                                  console.log('resolve projectscategoryService');
                                  return projectscategoryService.fetchCategories();
                                }
                              }
                            }
                          }
                        })
                                          .state('/.projects.category.add', {
                                        url: "/add",
                                        views: {
                                          'addprojectscategoryView':{
                                            templateUrl: "/templates/project/addprojectscategory.html",
                                            controller:'addprojectscategoryCtrl'
                                          }
                                        }
                                        
                                      }).state('/.projects.category.edit', {
                                        url: "/edit/:id",
                                        views: {
                                          'editprojectscategoryView':{
                                            templateUrl: "/templates/project/editprojectscategory.html",
                                            controller:'editprojectscategoryCtrl',
                                            resolve:{
                                              category : function(projectscategoryService,$stateParams) {
                                                console.log('resolveEDitCat');
                                                return projectscategoryService.fetchCategory($stateParams.id);
                                              }
                                            }
                                          }
                                        }
                                        
                                      })
                                      .state('/.projects.category.editimage', {
                                        url: "/editimage/:id",
                                        // data:{'projectsTabs':'projects'},
                                        views: {
                                          'editimageprojectscategoryView':{
                                            templateUrl: "/templates/project/editimageprojectscategory.html",
                                            controller:'editimageprojectscategoryCtrl',
                                            resolve:{
                                              category : function(projectscategoryService,$stateParams) {
                                                return projectscategoryService.fetchCategory($stateParams.id);
                                              }
                                            }
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
                              resolve:{
                                projects : function(projectsService) {
                                  return projectsService.fetchProjects();
                                },
                                categories:  function(projectscategoryService){
                                  console.log('resolve');
                                  // return ['test'];
                                  return projectscategoryService.fetchCategories();
                                }
                              }
                            }
                          }
                        })
                                      .state('/.projects.projects.add', {
                                        url: "/add",
                                        views: {
                                          'addprojectView':{
                                            templateUrl: "/templates/project/addproject.html",
                                            controller:'addprojectsCtrl'
                                          }
                                        },
                                        resolve:{
                                          categories:  function(projectscategoryService){
                                            console.log('resolve');
                                            // return ['test'];
                                            return projectscategoryService.fetchCategories();
                                          }
                                        }
                                      })
                                        
                                      .state('/.projects.projects.edit', {
                                        url: "/edit/:id",
                                        // data:{'projectsTabs':'projects'},
                                        views: {
                                          'editprojectView':{
                                            templateUrl: "/templates/project/editproject.html",
                                            controller:'editprojectsCtrl'
                                          }
                                        },
                                        resolve:{
                                          categories:  function(projectscategoryService){
                                            console.log('esolve project editCat');
                                            return projectscategoryService.fetchCategories();
                                          },
                                          project:  function(projectsService,$stateParams){
                                            console.log('esolve project edit');
                                            return projectsService.fetchProject($stateParams.id);
                                          }
                                        }
                                      })
                                      .state('/.projects.projects.editimage', {
                                        url: "/editimage/:id",
                                        // data:{'projectsTabs':'projects'},
                                        views: {
                                          'editimagesprojectsView':{
                                            templateUrl: "/templates/project/editimageproject.html",
                                            controller:'editimageprojectsCtrl'
                                          },
                                        },
                                        resolve:{
                                            project:  function(projectsService,$stateParams){
                                              console.log('editimage ->project');

                                              return projectsService.fetchProject($stateParams.id);
                                            }
                                        }
                                        
                                      })
          /////////////////////////////////////////////////////////////////////////////////////ARTICLES
          .state('/.articles', {
            url: "articles",
            data:{'mainTabs':'articles'},
            views: {
            	'allarticlesView':{
            		templateUrl: "/templates/blog/main.html"
            	}
            }
          })
                        .state('/.articles.articles', {
                          url: "/articles",
                          data:{'articlesTabs':'articles'},
                          views: {
                            'articlesView':{
                              templateUrl: "/templates/blog/articles.html",
                              controller:'articlesCtrl',
                              resolve:{
                                articles : function(articlesService) {
                                  return articlesService.fetchArticles();
                                }
                              }
                            }
                          },
                        })              
                                      .state('/.articles.articles.add', {
                                        url: "/add",
                                        views: {
                                          'addarticleView':{
                                            templateUrl: "/templates/blog/addarticle.html",
                                            controller:'addarticlesCtrl'
                                          }
                                        },
                                        resolve:{
                                          categories:  function(articlescategoryService){
                                            return articlescategoryService.fetchCategories();
                                          }
                                        }
                                      })
                                        
                                      .state('/.articles.articles.edit', {
                                        url: "/edit/:id",
                                        // data:{'articlesTabs':'articles'},
                                        views: {
                                          'editarticleView':{
                                            templateUrl: "/templates/blog/editarticle.html",
                                            controller:'editarticlesCtrl'
                                          }
                                        },
                                        resolve:{
                                          article:  function(articlesService,$stateParams){
                                            return articlesService.fetchArticle($stateParams.id);
                                          },
                                          categories:  function(articlescategoryService){
                                            return articlescategoryService.fetchCategories();
                                          }
                                        }
                                      })
                                      .state('/.articles.articles.editimage', {
                                        url: "/editimage/:id",
                                        // data:{'articlesTabs':'articles'},
                                        views: {
                                          'editimagesarticlesView':{
                                            templateUrl: "/templates/blog/editimagearticle.html",
                                            controller:'editimagearticlesCtrl'
                                          },
                                        },
                                        resolve:{
                                            article:  function(articlesService,$stateParams){
                                              console.log('editimage ->article');

                                              return articlesService.fetchArticle($stateParams.id);
                                            }
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


                        .state('/.articles.coments', {
                          url: "/coments",
                          data:{'articlesTabs':'coments'},
                          views: {
                            'comentsView':{
                              templateUrl: "/templates/blog/coments.html",
                              controller:'comentsCtrl',
                              resolve:{
                                coments : function(comentsService) {
                                  console.log('resolve');
                                  return comentsService.fetchComents();
                                }
                              }
                            }
                          }
                        })

    .state('profile', {
      url: "/profile",
      views: {
              'navbarView':{
                templateUrl: "/templates/global/navbar.html",
                controller:'navbarCtrl',
                resolve: {
                    me: function(accountService, $auth) {
                      return accountService.getProfile();
                    }
                }
              },
              'rootView':{
                templateUrl: "/templates/profile.html",
                controller:'profileCtrl',
                resolve:{
                  myself : function(accountService) {
                    console.log('resolve');
                    return accountService.getProfile();
                  }
                }
              }
            },
      
    });
  
   
});