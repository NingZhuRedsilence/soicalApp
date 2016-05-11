;(function() {
	'use strict'
	angular.module('hootApp')	
		.service('FormCheckService',FormCheckService);
		
	function FormCheckService(){
		
	
		this.checkZipcode=function(vm){
			if(!vm.zipcode || vm.zipcode==""){
					vm.zipcodeErr = true;
					vm.zipcodeErrMessage = "Zipcode is required.";
			}
			else{
				vm.zipcodeErr = false;
				var reg = /^\d{5}$/;   
	
				var r = vm.zipcode.toString().match(reg);
				if(r == null){
					vm.zipcodeErr = true;
					vm.zipcodeErrMessage = "Zipcode is in 5 digits."
				}
			}
		}
		this.checkEmail=function(vm){
			if(!vm.email || vm.email==""){
				vm.emailErr = true;
				vm.emailErrMessage = "E-mail is required.";
	
			}
			else{
				vm.emailErr = false;
				var reg = /^[a-zA-Z0-9\._-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/; 
				var r = vm.email.toString().match(reg);
				if(r == null){
					vm.emailErr = true;
					vm.emailErrMessage = "Email address invailid."
				}
			}
		}
		this.checkPassword = function(vm){
			if(!vm.password || vm.password==""){
				vm.passwordErr = true;
				vm.passwordErrMessage = "Password is required.";
	
			}
			else{
				vm.passwordErr = false;
				if(vm.password.length<6){
					vm.passwordErr = true;
					vm.passwordErrMessage = "Password is too short."
				}	
			}
		}
		this.checkCPassword = function(vm){
			if(!vm.cpassword || vm.cpassword!=vm.password){
				vm.cpasswordErr = true;
				vm.cpasswordErrMessage = "The passwords you entered is not the same.";
			}
			else{
				vm.cpasswordErr = false;
			}
		}
		this.checkFirstName = function(vm){
			if(!vm.firstName || vm.firstName==""){
				vm.firstnameErr = true;
				vm.firstnameErrMessage = "First Name is required";
			}
			else{
				vm.firstnameErr = false;
			}
		}
	
		this.checkLastName = function(vm){
			if(!vm.lastName || vm.lastName==""){
				vm.lastnameErr = true;
				vm.lastnameErrMessage = "Last Name is required";
			}
			else{
				vm.lastnameErr = false;
			}
		}
	
		this.checkUsername = function(vm){
			if(!vm.loginUsername||vm.loginUsername==""){
				vm.loginUsernameErr = true;
				vm.usernameErrMessage = "User Name is required";
			}
			else{
				vm.loginUsernameErr = false;
			}
		}
	}
	
})()