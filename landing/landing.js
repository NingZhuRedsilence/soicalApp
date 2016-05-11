;(function() {
    angular.module('hootApp')
        .controller('LandingPageCtl',LandingPageCtl);
        
    LandingPageCtl.$inject = ['$http','$scope','ApiService','$location','$timeout','FormCheckService','LogStatusService'];
    function LandingPageCtl($http, $scope,ApiService, $location,$timeout,FormCheckService,LogStatusService){
        var vm = this;
        vm.posts = [];
        vm.errMessage = '';
        vm.loadPosts = function(){
            ApiService.sample()
            .$promise.then(function(result) {
                vm.posts=result.posts;
            })
        }
        LogStatusService.updateStatus(false, true)
        vm.loadPosts();
        vm.login = function(){
            vm.checkUsername(vm);
            if(!vm.loginUsernameErr){
                ApiService.login({'username':vm.loginUsername, 'password':vm.loginPassword})
                .$promise.then(function(result) {
                    $('#logInModal').modal('hide');
                    var updateStatus = function(){
                        LogStatusService.updateStatus(false);
                    }
                    $timeout(updateStatus,500);
                },function(error){
                    vm.errMessage = "User Name or Password Error";
                })
            }
        }
        vm.register = function(){
            if(vm.registerCheck()){
                ApiService.register({username: vm.firstName+' '+vm.lastName, 
                    email:vm.email, 
                    zipcode:vm.zipcode, 
                    password:vm.password}).$promise.then(function(result) {
                    alert("Register Success");
                }, function(error) {
                })
            }
        }

        vm.registerCheck = function(){
            vm.checkZipcode(vm);
            vm.checkEmail(vm);
            vm.checkPassword(vm);
            vm.checkCPassword(vm);
            vm.checkFirstname(vm);
            vm.checkLastname(vm);
            return !vm.zipcodeErr && !vm.emailErr && !vm.passwordErr 
                && !vm.cpasswordErr && !vm.firstnameErr && !vm.lastnameErr;
        }
        vm.zipcodeErr = false;
        vm.checkZipcode = FormCheckService.checkZipcode;

        vm.emailErr = false;
        vm.checkEmail = FormCheckService.checkEmail;

        vm.passwordErr = false;
        vm.checkPassword = FormCheckService.checkPassword;

        vm.cpasswordErr = false;
        vm.checkCPassword = FormCheckService.checkCPassword;

        vm.firstnameErr = false;
        vm.checkFirstname = FormCheckService.checkFirstName;

        vm.lastnameErr = false;
        vm.checkLastname = FormCheckService.checkLastName;

        vm.loginUsernameErr = false;
        vm.checkUsername = FormCheckService.checkUsername;
    }

})();
