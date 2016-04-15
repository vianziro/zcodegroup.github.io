"use strict";

angular.module("app")

.filter('youtubeEmbedUrl', function ($sce) {
	return function(videoId) {
		return $sce.trustAsResourceUrl('http://www.youtube.com/embed/' + videoId);
	};
});

angular.module("app")

.controller('HelpCtrl', function ($scope, $http){
	$scope.activeId = 1;
	$http.get('/scripts/data/help.json').then(function(res){
		$scope.helps = res.data;
	});
	$scope.change = function (id){
		$scope.activeId = id;
	}
	$scope.helps = [
{
	"id": 1,
	"title": "Intro",
	"url": "4xsvTO6D17Y"
},
{
	"id": 2,
	"title": "Registrasi dan Inisialisasi Data",
	"url": "05mVV6PLp6c"
},
{
	"id": 3,
	"title": "Dynamic Entity",
	"url": "sQNeUCpn6Ao"
},{
	"id": 4,
	"title": "Dynamic Group",
	"url": "w97J8MSjlN0"
},{
	"id": 5,
	"title": "Dynamic Search",
	"url": "XkucEITYSNE"
},{
	"id": 6,
	"title": "Dynamic Statistic",
	"url": "zCQ9xM6W-Ro"
},{
	"id": 7,
	"title": "Export/Import Data",
	"url": "RQwsNCvurgM"
}

];
});


