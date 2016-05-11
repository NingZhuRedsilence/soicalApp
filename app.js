;(function() {
'use strict'

angular.module('hootApp', ['ngRoute', 'ngResource'])
	.config(config);

function config($routeProvider) {
	$routeProvider
	.when('/landing', {
		templateUrl: 'landing/landing.html',
		controller: 'LandingPageCtl',
		controllerAs: 'vm'
	})
	.when('/main', {
		templateUrl: 'main/main.html',
		controller: 'MainPageCtl',
		controllerAs: 'vm'
	})

	.otherwise({
		redirectTo: '/landing'
	})

}	

})()
