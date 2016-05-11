;(function() {	
	angular
		.module('hootApp')
		.controller('UserController',UserController);
	
	UserController.$inject = ['ApiService','$scope','LogStatusService'];
	function UserController(ApiService,$scope,LogStatusService){
		var vm = this;
		vm.name = "";
		vm.status = "";
		vm.avatar = "";
		var editing = 0;
	
		vm.getUserInfo=function(){
			ApiService.getStatus().$promise.then(function(result) {
				var status = result.statuses[0];
				vm.name = status.username;
				vm.status = status.status;
				ApiService.getPicture({user:vm.name}).$promise.then(function(result){
					vm.avatar = result.picture;
					LogStatusService.userName = vm.name;
					LogStatusService.userAvatar = vm.avatar;
					LogStatusService.followerAvatars[vm.name] = vm.avatar;
				})
			})
		}
		vm.getUserInfo();
		vm.editHide = true;
		vm.editStatus=function(){
			if(vm.editHide){
				vm.editHide = false;
				vm.newStatus = vm.status;
			}
			else{
				ApiService.putStatus({status:vm.newStatus}).$promise.then(function(result){
					vm.editHide = true;
					vm.status = result.status;
				});
				
			}
		}
		vm.editCancel = function(){
			vm.editHide = true;
		}
	}
})();
