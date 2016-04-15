'use strict';

angular.module('app')

.controller('SettingChartCtrl', function($scope, $state, $filter, $localStorage, FieldSvc, ConfigSvc){
	var configId = null;
	$scope.fields = [];
	$scope.cs = [];
	$scope.m = {type: 'pie'};
	$scope.ctype = [{id: "c1", label: "Grafik ke-1"}, 
					{id: "c2", label: "Grafik ke-2"},
					{id: "c3", label: "Grafik ke-3"}
					];

	ConfigSvc.get().then(function (res){
		if (res.data.length > 0){
			configId = res.data[0].id;
			$scope.cs = res.data[0].data;
		}
	});

	FieldSvc.get().then(function (res){
		for (var i in res.data[0].fields) {
			var f = res.data[0].fields[i];
			if (f.type === 'option'){
				$scope.fields.push(f);
			}
		}
	});

	$scope.save = function (){
		var found = false;
		var data = angular.copy($scope.m);
		var sdata = {};
		sdata.companyId = $localStorage.company.id;
		sdata.module = "DASHBOARD";
		for (var i in $scope.cs){
			if ($scope.cs[i].id === data.id){
				found = true;
				$scope.cs[i] = data; 
				break;
			}
		}

		if (!found)
			$scope.cs.push(data);

		sdata.data = angular.copy($scope.cs);
		
		if (configId){
			sdata.id = configId;
			ConfigSvc.update(sdata);
		}
		else
			ConfigSvc.create(sdata).then(function (res){
				configId = res.data.id;
			})
	}

	$scope.change = function (){
		for (var i in $scope.cs){
			if ($scope.cs[i].id === $scope.m.id){
				$scope.m = angular.copy($scope.cs[i]);
				return;
			}
		}
		var id = $scope.m.id;
		$scope.m = {id: id, type: 'pie'};
	}
	/*
	$scope.chType = function (){
		$scope.fields = [];
		if ($scope.m.type === 'pie'){
			//get field type option
			FieldSvc.get().then(function (res){
            	for (var i in res.data[0].fields) {
					var f = res.data[0].fields[i];
					if (f.type === 'option'){
						$scope.fields.push(f);
					}
				}
			});
		}
	}
	*/
});
