;(function() {
	'use strict'
	angular.module('hootApp')	
		.service('LogStatusService', LogStatusService);

	function LogStatusService(ApiService,$location){
		this.followerAvatars = {};
		this.userAvatar = "";
		this.userName = "";
		this.setAvatar = function(user,avatar){
			if(user == this.userName){
				this.userAvatar = avatar;
			}
			this.followerAvatars[user] = avatar;
		}
		this.updateStatus = function(isMain) {
	          ApiService.getStatus().$promise.then(function(result) {
	              var status = result.statuses[0]
	              LogStatusService.userName = status.username;
	              if(!isMain){
	              		$location.path('main');
	              }
	          }, function(error) {
	          	if(isMain){
	          		$location.path('landing')
	          	}    
	          })
	     }
	}


})()


