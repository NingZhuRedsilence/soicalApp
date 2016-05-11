;(function() {
	'use strict'

	angular.module('hootApp')
		.directive('profile', profile);
	function profile() {
		return {
			restrict: 'EA',
			controller: 'ProfileController',
			controllerAs: 'dvm',
			templateUrl: 'main/profile/profile.html',
			link: function(scope, elem, attrs) {
			},
			replace: true
		}
	}

	angular.module('hootApp')
		.controller('ProfileController',ProfileController);

	ProfileController.$inject = ['ApiService','$scope','LogStatusService','FormCheckService'];
	function ProfileController(ApiService, $scope,LogStatusService,FormCheckService){
		var dvm = this;
		dvm.userName = LogStatusService.userName;
		dvm.email = "xz42@rice.edu";
		dvm.zipcode = "12345";
		dvm.avatar = "";
		ApiService.getEmail({user:dvm.userName}).$promise.then(function(result){
			dvm.email = result.email;
		})
		ApiService.getZipcode({user:dvm.userName}).$promise.then(function(result){
			dvm.zipcode = result.zipcode;
		})
		ApiService.getPicture({user:dvm.userName}).$promise.then(function(result){
			dvm.avatar = result.picture;
		})
		
		dvm.uploadFile = function(file){
			dvm.newImage = file.files[0];
			ApiService.uploadPicture({ img: dvm.newImage }).$promise.then(function(result) {
				dvm.avatar = result.picture;
				LogStatusService.setAvatar(LogStatusService.userName,dvm.avatar);
				angular.element($('#userStatus')).scope().userVM.avatar = result.picture;
			});

		}
		dvm.changeZipcode=function(){
			dvm.checkZipcode(dvm);
			if(!dvm.zipcodeErr){
				ApiService.newZipcode({ zipcode: dvm.zipcode}).$promise.then(function(result){
					dvm.zipcode = result.zipcode;
					alert("zipcode modified to "+result.zipcode);
				},function(error){
					ApiService.getZipcode({user:dvm.userName}).$promise.then(function(result){
						dvm.zipcode = result.zipcode;
					})
					alert("failed");
					
				})
			}
		}
		dvm.changeEmail = function(){
			dvm.checkEmail(dvm);
			if(!dvm.emailErr){
				ApiService.newEmail({email: dvm.email}).$promise.then(function(result){
					dvm.email = result.email;
					alert("email modified to "+result.email);
				},function(error){
					ApiService.getEmail({user:dvm.userName}).$promise.then(function(result){
						dvm.email = result.email;
					})
					alert("failed");

				})
			}
		}
		dvm.changePassword = function(){
			dvm.checkPassword(dvm);
			dvm.checkCPassword(dvm);
			if(!(dvm.passwordErr || dvm.cpasswordErr)){
				ApiService.changePassword({password: dvm.password}).$promise.then(function(result){
					alert(result.status);
				},function(error){
					alert("failed");
				})
			}
		}
		dvm.zipcodeErr = false;
		dvm.checkZipcode = FormCheckService.checkZipcode;

		dvm.emailErr = false;
		dvm.checkEmail = FormCheckService.checkEmail;

		dvm.passwordErr = false;
		dvm.checkPassword = FormCheckService.checkPassword;

		dvm.cpasswordErr = false;
		dvm.checkCPassword = FormCheckService.checkCPassword;

	}





})()