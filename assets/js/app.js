var app = angular.module('app', ['ui.router','clientresize','ui.bootstrap','ngAnimate','ui.sortable']);

function clearSelection() {
    if(document.selection && document.selection.empty) {
        document.selection.empty();
    } else if(window.getSelection) {
        var sel = window.getSelection();
        sel.removeAllRanges();
    }
} 

app.directive('dateFix', function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attr, ngModel) {
            element.on('change', function() {
                scope.$apply(function () {
                    ngModel.$setViewValue(element.val());
                });         
            });
        }
    };
});

app.directive('ckEditor', [function () {
        return {
            require: '?ngModel',
            restrict: 'C',
            link: function (scope, elm, attr, model) {
                var isReady = false;
                var data = [];
                var ck = CKEDITOR.replace(elm[0]);
                
                function setData() {
                    if (!data.length) {
                        return;
                    }
                    
                    var d = data.splice(0, 1);
                    ck.setData(d[0] || '<span></span>', function () {
                        setData();
                        isReady = true;
                    });
                }

                ck.on('instanceReady', function (e) {
                    if (model) {
                        setData();
                    }
                });
                
                elm.bind('$destroy', function () {
                    ck.destroy(false);
                });

                if (model) {
                    ck.on('change', function () {
                        scope.$apply(function () {
                            var data = ck.getData();
                            if (data == '<span></span>') {
                                data = null;
                            }
                            model.$setViewValue(data);
                        });
                    });

                    model.$render = function (value) {
                        if (model.$viewValue === undefined) {
                            model.$setViewValue(null);
                            model.$viewValue = null;
                        }

                        data.push(model.$viewValue);

                        if (isReady) {
                            isReady = false;
                            setData();
                        }
                    };
                }
                
            }
        };
    }]);


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
                                            templateUrl: "/templates/editimages.html",
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
                              templateUrl: "/templates/articlescategory.html",
                              controller:'articlescategoryCtrl',
                              resolve:{
                                categories : function(articlescategoryService) {
                                  return articlescategoryService.fetchCategories();
                                }
                              }
                            }
                          }
                        })
                                      .state('/.articles.category.edit', {
                                        url: "/edit/:id",
                                        // data:{'articlesTabs':'articles'},
                                        views: {
                                          'editarticlescategoryView':{
                                            templateUrl: "/templates/editarticlescategory.html",
                                            controller:'editarticlescategoryCtrl',
                                            resolve:{
                                              category : function(articlescategoryService,$stateParams) {
                                                console.log('resolveEDitCat');
                                                return articlescategoryService.fetchCategory($stateParams.id);
                                              }
                                            }
                                          }
                                        }
                                        ,
                                        onEnter:function($stateParams) {
                                          // $('td.ligneModif').show();
                                          setTimeout(function() {
                                            console.log();
                                            $('tr[rel="'+$stateParams.id+'"]').append($('td.ligneModif'));
                                          },1)
                                          
                                        },
                                        onExit:function($stateParams) {

                                          $('.ligneInvisible').append($('td.ligneModif'));
                                        }
                                        // ,
                                        // onEnter:function($state) {
                                        //   $('tr.ligneModif').show();
                                        // },
                                        // onExit:function($state) {
                                        //   $('tr.ligne[rel="'+$state.params.id+'"]').show();
                                        //   $('tr.ligneModif').hide();
                                        // }
                                      })
                                      .state('/.articles.category.editimage', {
                                        url: "/editimage/:id",
                                        // data:{'articlesTabs':'articles'},
                                        views: {
                                          'editimagesarticlescategoryView':{
                                            templateUrl: "/templates/editimagescategory.html",
                                            controller:'editimagearticlescategoryCtrl',
                                            resolve:{
                                              category : function(articlescategoryService,$stateParams) {
                                                return articlescategoryService.fetchCategory($stateParams.id);
                                              }
                                            }
                                          }
                                        }
                                        // ,
                                        // onEnter:function($state) {
                                        //   $('tr.ligneModif').show();
                                        // },
                                        // onExit:function($state) {
                                        //   $('tr.ligne[rel="'+$state.params.id+'"]').show();
                                        //   $('tr.ligneModif').hide();
                                        // }
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