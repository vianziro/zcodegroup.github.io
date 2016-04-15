var app = angular.module('app', []);

app.controller('LayoutCtrl', function($scope, $rootScope, $state) {
    $rootScope.subtitle = "Layout";
    $scope.floor = 1;
    $scope.floors = function(){
    	$scope.floor = 2;
    }
    $scope.floorss = function(){
    	$scope.floor = 1;
    }
    $scope.go = function(){
	    $("#myModal").modal("hide");
    	$state.go('foods');
    }
})
