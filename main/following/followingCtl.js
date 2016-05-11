;(function() {
	angular
		.module('hootApp')
		.controller('FollowingController',FollowingController);
	
	FollowingController.$inject = ['ApiService','$scope','LogStatusService'];
	function FollowingController(ApiService,$scope,LogStatusService){
		var vm = this;
		vm.followingUsers = [];
		vm.getFollowing = function(){
			ApiService.getFollowing().$promise.then(function(result) {
				ApiService.getStatuses({user:result.following})
				.$promise.then(function(response){
					vm.followingUsers = response.statuses;
					angular.forEach(vm.followingUsers, function(user,id){
 	  					updatePicture(id);
 	  				})
				})
			})
		}
		function updatePicture(id){
			if(!LogStatusService.followerAvatars[vm.followingUsers[id].username]){
				ApiService.getPicture({user:vm.followingUsers[id].username})
				.$promise.then(function(result){
					vm.followingUsers[id]['avatar'] = result.picture;
					LogStatusService.setAvatar(vm.followingUsers[id].username,result.picture);
				})
			}
			else{
				vm.followingUsers[id]['avatar'] 
					= LogStatusService.followerAvatars[vm.followingUsers[id].username];
			}
		}
		vm.getFollowing();
		vm.delete = function($index){
			ApiService.removeFollowing({user:vm.followingUsers[$index].username})
			.$promise.then(function(result){
				vm.followingUsers.splice($index,1);
			})
		}
		vm.newFollowerErrHide = true;
		vm.newFollowerMessage = "";
		vm.add = function(){
			if(!vm.newFollower || vm.newFollower == ""){
				vm.newFollowerErrHide = false;
				vm.newFollowerMessage = "You should enter the user name";
				return;
			}
			var count = vm.followingUsers.length;
			ApiService.newFollowing({user:vm.newFollower})
			.$promise.then(function(result){
				if(result.following.length==count){
					vm.newFollowerErrHide = false;
					if(result.username == vm.newFollower){
						vm.newFollowerMessage = "You don't need to add yourself";
					}
					else{
						vm.newFollowerMessage = "The user doesn't exist";
					}
					
				}
				else{
					var response = result.following;
					var theUsername = result.following.pop();
					ApiService.getStatuses({user:[theUsername]})
						.$promise.then(function(response){
							vm.followingUsers.push(response.statuses[0]);
							updatePicture(vm.followingUsers.length-1);
						})
					vm.newFollowerErrHide = true;
					vm.newFollower = "";
				}
				
			})
		}
		vm.followerPanalShow = false;
		vm.deleteBtnShow = false;
		vm.editBtnShow = true;
		vm.followerTextCss = {width:'75%'};
		vm.startEdit = function(){
			vm.followerPanalShow = true;
			vm.deleteBtnShow = true;
			vm.followerTextCss = {width:'68%'};
			vm.editBtnShow = false;
		}
		vm.endEdit = function(){
			vm.followerTextCss = {width:'75%'};
			vm.deleteBtnShow = false;
			vm.followerPanalShow = false;
			vm.editBtnShow = true;
			vm.newFollowerErrHide = true;
		}
	}

})();