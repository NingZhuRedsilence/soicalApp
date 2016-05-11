;(function() {
	'use strict'
	
	angular.module('hootApp')
		.constant('serverURL','https://webdev-dummy.herokuapp.com');

	angular.module('hootApp')	
		.factory('ApiService', ApiService);

	function ApiService($http, $resource, serverURL) {
		$http.defaults.withCredentials = true
		function resourceUploadFile(data) {
			var fd = new FormData()  
			fd.append('image', data.img)
			fd.append('body', data.body)
			return fd;
		}
		function resourceUploadAvatar(data) {
			var fd = new FormData()  
			fd.append('image', data.img)
			return fd;
		}
		return $resource(serverURL + '/:endpoint/:id/:user', {user :'@user', id: '@id'},
		    {
		        login: { method:'POST', params: {endpoint: 'login'} },
		        logout   : { method:'PUT' , params: {endpoint: 'logout' } },
		        register: { method:'POST', params: {endpoint: 'register'} },
		        sample:{method:'GET', params:{endpoint: 'sample'} },
		        getStatus: { method:'GET' , params: {endpoint: 'status' } },
		        getStatuses: { method:'GET', params: {endpoint: 'statuses'}},
		        getPicture: { method: 'GET', params: {endpoint: 'picture'} },
		        putStatus: { method:'PUT', params: {endpoint: 'status'}},
		        getFollowing: { method:'GET', params: {endpoint: 'following'}},
		        newFollowing: { method:'PUT', params: {endpoint: 'following'}},
		        removeFollowing: {method: 'DELETE', params: {endpoint: 'following'}},
		        getPosts:{method: 'GET', params:{endpoint: 'posts'}},
		       	newComment:{method:'PUT', params: {endpoint: 'posts'}},
		        newPost:{method:'POST', params: {endpoint: 'post'}},
		        getEmail:{method:'GET', params: {endpoint: 'email'}},
		        newEmail:{method:'PUT', params: {endpoint: 'email'}},
		        getZipcode:{method:'GET', params: {endpoint: 'zipcode'}},
		        newZipcode:{method:'PUT', params: {endpoint: 'zipcode'}},
		        changePassword:{method:'PUT', params: {endpoint: 'password'}},
		        uploadPicture: {method:'PUT', headers: { 'Content-Type': undefined },
		        			transformRequest: resourceUploadAvatar,
		        			params: {endpoint: 'picture'}},
		        upload: { method: 'POST', headers: { 'Content-Type': undefined },
		        			transformRequest: resourceUploadFile,
		        			params: {endpoint: 'post'}},
		    });
	}

	
})()