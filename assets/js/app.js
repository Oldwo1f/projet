var app = angular.module('app', ['ui.router','clientresize','ui.bootstrap']);


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
    .state('/.user', {
      url: "user",
      views: {
      	'userView':{
      		templateUrl: "/templates/user.html"

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
    .state('/.projet', {
      url: "projet",
      views: {
      	'projetView':{
      		templateUrl: "/templates/projet.html"

      	}
      }
    })
    .state('/.article', {
      url: "article",
      views: {
      	'articleView':{
      		templateUrl: "/templates/article.html"
      	}
      }
    })
    .state('contact', {
      url: "/contact",
      templateUrl: "/templates/contact.html"
    });
   
});