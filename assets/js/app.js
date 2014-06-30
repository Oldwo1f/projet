var app = angular.module('app', ['ngRoute','clientresize']);


app.config(function($routeProvider) {
		$routeProvider

			// route for the home page
			// .when('/', {
			// 	templateUrl : '/toto',
			// })

			// route for the about page
			.when('/', {
				templateUrl : '/tata',
			})

			// route for the contact page
			.when('/contact', {
				templateUrl : '/titi',
			});
	});