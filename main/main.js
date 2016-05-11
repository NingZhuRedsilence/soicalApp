;(function() {
	angular
		.module('hootApp')
		.controller('MainPageCtl', MainPageCtl);
	
	MainPageCtl.$inject = ['ApiService','$scope','$location','LogStatusService'];
	function MainPageCtl(ApiService,$scope,$location,LogStatusService){
		var vm = this;
		vm.logout=function() {
			ApiService.logout().$promise.then(function(result) {
				LogStatusService.updateStatus(true);
			})
		}
	    LogStatusService.updateStatus(true);
	}
})();



