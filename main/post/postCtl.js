;(function() {
	angular
		.module('hootApp')
		.controller('PostController',PostController);
	
	PostController.$inject = ['ApiService','$scope','LogStatusService'];
	function PostController(ApiService, $scope, LogStatusService){
		var vm = this;
		vm.posts = [];
		vm.userName = "";
		ApiService.getStatus().$promise.then(function(result) {
			var status = result.statuses[0];		
			vm.userName = status.username;
		})
		vm.loadPosts = function(){
			ApiService.getPosts().$promise.then(function(result) {
				vm.posts = result.posts;
				angular.forEach(vm.posts, function(post,id){
					updateAvatar(id);
				})
			})
		}
		vm.setFile = function(file){
			vm.newImage = file.files[0];
		}
		function updateAvatar(id){
			if(!LogStatusService.followerAvatars[vm.posts[id].author]){
				ApiService.getPicture({user:vm.posts[id].author})
				.$promise.then(function(result){
					vm.posts[id]['avatar'] = result.picture;
					LogStatusService.setAvatar(vm.posts[id].author,result.picture);
				})
			}
			else{
				vm.posts[id]['avatar'] 
					= LogStatusService.followerAvatars[vm.posts[id].author];
			}
		}
		vm.loadPosts();
		vm.postErrShow=false;
		vm.postPanelShow = false;
		vm.postPanelPlaceHolder 
			= "Post Some News Here. More options will be shown after click.";
		vm.newPost = function(){
			if((vm.newPostBody==""|| !vm.newPostBody)&& !vm.newImage ){
				vm.postErrShow = true;
				return;
			}
			vm.postErrShow = false;
			ApiService.upload({ body: vm.newPostBody, img: vm.newImage })
			.$promise.then(function(result) {
				vm.posts.splice(0,0,result.posts[0]);
				updateAvatar(0);
				vm.newPostBody="";
				vm.newPostCancel();
			});
			
		}
		vm.newPostCancel = function(){
			vm.postPanelShow = false; 
			vm.postPanelPlaceHolder = 
				'Post Some News Here. More options will be shown after click.';
		}
		vm.newComment = [];
		vm.addComment = function($index){
			if(!vm.newComment[$index] || vm.newComment[$index] == ""){
				return;
			}
			var aPost = vm.posts[$index];
			if(!aPost['comments']){
				aPost['comments'] = [];
			}
			ApiService.newComment({id:vm.posts[$index].id,
				body:vm.newComment[$index],
				commentId:'-1'})
				.$promise.then(function(result){
					vm.posts[$index].comments = result.posts[0].comments;
				})
			vm.newComment[$index] = "";
		}
		vm.addCommentCancel = function($index){
			vm.newComment[$index] = "";
		}
		vm.reply = function(user,$index){
			vm.newComment[$index] = "@"+user+" ";
		}
		vm.hideComments = function($index){
			if(vm.posts[$index].commentsHide){
				vm.posts[$index].commentsHide = false;
				vm.posts[$index].commentsHideMessage = "show comments";
			}
			else{
				vm.posts[$index].commentsHide = true;
				vm.posts[$index].commentsHideMessage = "hide";
				
				
			}
			
		}
		vm.editComment = function(postId, commentId,commentAuthor,index){
			if(commentAuthor == vm.userName){
				var newComment = prompt("Please input the new comment:");
				if (newComment != null){
					ApiService.newComment({id:postId,
						body:newComment,
						commentId:commentId})
						.$promise.then(function(result){
							vm.posts[index].comments = result.posts[0].comments;
						})
				}
			}
			else{
				alert("You cannot edit other's comment")
			}
			
		}
		vm.editPost = function(postId, $index){
			var newBody = prompt("Please input the new body of the post:",
					vm.posts[$index].body);
				if (newBody != null){
					ApiService.newComment({id:postId,body:newBody})
						.$promise.then(function(result){
							vm.posts[$index].body= result.posts[0].body;
						})
				}
		}
	}
})();