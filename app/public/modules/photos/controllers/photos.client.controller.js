'use strict';

// Photos controller
angular.module('photos').controller('PhotosController', ['$scope', '$stateParams', '$location', '$http', 'Authentication', 'Photos',
	function($scope, $stateParams, $location, $http, Authentication, Photos) {
		$scope.authentication = Authentication;

		  $scope.likes = 0;
		  $scope.isLiked = false;

		  //Like a photo
		  $scope.likeThis = function() {
		    var photo = $scope.photo;
		    $http.put('photos/like/' + photo._id).success(function() {
		      // Update the photo with our user ID.
		      photo.likes.push($scope.authentication.user._id);
		      
		      $scope.isLiked=true;
		    });

		  };   

		  $scope.create = function() {
		    // Create new Photo object
		    var photo = new Photos ({
		      name: $scope.imageName,
		      file: $scope.imageFile
		    });
		    photo.$save(function(response) {
		      $location.path('photos/' + response._id);
		      // Clear form fields
		      $scope.imageName = '';
		      $scope.imageFile = '';

		    }, function(errorResponse) {
			 $scope.error = errorResponse.data.message;
		       });
		    
		  };
		// Create new Photo
/*
		$scope.create = function(upload) {
			console.log("PICFILE " + upload);
			// Create new Photo object
			var photo = new Photos ({
				name: this.name
			});

			$upload.upload({
			    url: '/photos', 
			    method: 'POST', 
			    headers: {'Content-Type': 'multipart/form-data'},
			    fields: {name: photo.name},
			    file: upload,               
			}).success(function (response, status) {
			      $location.path('photos/' + response._id);

			    $scope.title = '';
			    $scope.content = '';
			}).error(function (err) {
				$scope.error = err.data.message;
			});
*/
/*

			// Redirect after save
			photo.$save(function(response) {
				$location.path('photos/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
*/
//		};

		// Remove existing Photo
		$scope.remove = function(photo) {
			if ( photo ) { 
				photo.$remove();

				for (var i in $scope.photos) {
					if ($scope.photos [i] === photo) {
						$scope.photos.splice(i, 1);
					}
				}
			} else {
				$scope.photo.$remove(function() {
					$location.path('photos');
				});
			}
		};

		// Update existing Photo
		$scope.update = function() {
			var photo = $scope.photo;

			photo.$update(function() {
				$location.path('photos/' + photo._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

/*
		// Find a list of Photos
		$scope.find = function() {
			$scope.photos = Photos.query();
		};

		// Find existing Photo
		$scope.findOne = function() {
			$scope.photo = Photos.get({ 
				photoId: $stateParams.photoId
			});
		};

*/
		  // Find a list of Photos
		  $scope.find = function() {
		    $scope.photos = Photos.query();
		  };

		  // Find existing Photo
		  $scope.findOne = function() {
		    $scope.photo = Photos.get({ 
		      photoId: $stateParams.photoId
		    },function(){
			var user = $scope.authentication.user;
			var containsValue=false;
			if($scope.authentication.user) {
						console.log('ID '+$scope.authentication.user._id);
						$scope.likes = $scope.photo.likes.length;
						for(var i=0; i<$scope.photo.likes.length; i++) {
							console.log('Comparing ' + $scope.photo.likes[i] + ' to ' + user._id + ' is ' + ($scope.photo.likes[i]===user._id).toString());
							if($scope.photo.likes[i]===user._id) {
								containsValue = true;
							}
						}
					}
			$scope.isLiked = containsValue;
		      },function(){console.log('error');});

		  };







	}
])
.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            
            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);
