;(function() {
	'use strict'
	
	angular.module('hootApp')
		.directive('post', post);
	
	function post() {
		return {
			restrict: 'EA',
			templateUrl: 'main/post/post.html',
			link: function(scope, elem, attrs) {
			},
			replace: true
		}
	}
})()

