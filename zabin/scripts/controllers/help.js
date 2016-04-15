"use strict";

angular.module("app")

.controller('HelpCtrl', function ($scope, $http){
	$scope.activeId = 1;
	$http.get('/scripts/data/help.json').then(function(res){
		$scope.helps = res.data;
	});
	$scope.change = function (id){
		$scope.activeId = id;
	}
});

angular.module("app")

.filter('youtubeEmbedUrl', function ($sce) {
	return function(videoId) {
		return $sce.trustAsResourceUrl('http://www.youtube.com/embed/' + videoId);
	};
});
