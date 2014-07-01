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
      views: {
      	'usersView':{
      		templateUrl: "/templates/users.html"

      	}
      }
    })
    .state('/.dashboard', {
      url: "dashboard",
      views: {
      	'dashboardView':{
      		templateUrl: "/templates/dashboard.html"

      	}
      }
    })
    .state('/.projets', {
      url: "projets",
      views: {
      	'projetsView':{
      		templateUrl: "/templates/projets.html"

      	}
      }
    })
    .state('/.articles', {
      url: "articles",
      views: {
      	'articlesView':{
      		templateUrl: "/templates/articles.html",
          controller:'articlesCtrl'
      	}
      }
    })
    .state('contact', {
      url: "/contact",
      templateUrl: "/templates/contact.html"
    });
   
});