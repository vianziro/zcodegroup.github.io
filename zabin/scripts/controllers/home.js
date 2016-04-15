angular.module('app', [])

.controller('HomeCtrl', function($scope, $rootScope, $state, $localStorage, FieldSvc, ConfigSvc, CustomerSvc) {
	var o = $scope;
	var fields = [];

	function getField (field){
		for (var i in fields){
			var f = fields[i];
			if (f.id === field) {
				return f;
			}
		}
	}

	function dataCounter (chart){
		var field = getField(chart.field);
		var values = field.optionValues;
		var query = [];
		for (var k in values){
			var obj = {field: field.id, value: values[k].value, label: field.label};
			query.push(obj);
		}
		$rootScope.asyncLoop(query, function (loop){
			var q = [];
			q.push(loop.obj());
			CustomerSvc.count(q).then(function(res){
				chart.labels.push(loop.obj().value);
				chart.data.push(res.data.count);
				loop.next();
			});
		}, 
		function (){}
		);	
	}
	

	if (!$localStorage.company) {
		$state.go('starter');
	} else {
		CustomerSvc.count([]).then(function (res){
			o.customerNumber = res.data.count;
		});
		FieldSvc.get($localStorage.company.id).then(function(res) {
			if (res.data.length === 0 && $localStorage.user)
			$state.go('starter');
			else{
				fields = res.data[0].fields;
				ConfigSvc.getByModule('DASHBOARD').then(function (res){
					if (res.data.length === 0) return;
					o.charts = res.data[0].data;
					$rootScope.asyncLoop(o.charts, function (loop){
						var chart = loop.obj();
						chart.labels = [];
						chart.data = [];
						dataCounter(chart);
						loop.next();
					}, function (){});
				});
			}
		})
	}



	//pie chart
	$scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
	$scope.data = [300, 500, 100];

	//bar chart
	$scope.barlabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
	$scope.barseries = ['Series A', 'Series B'];
	$scope.bardata = [
		[65, 59, 80, 81, 56, 55, 40],
		[28, 48, 40, 19, 86, 27, 90]
			];


	//line chart
	$scope.linelabels = ["January", "February", "March", "April", "May", "June", "July"];
	$scope.lineseries = ['Series A', 'Series B'];
	$scope.linedata = [
		[65, 59, 80, 81, 56, 55, 40],
		[28, 48, 40, 19, 86, 27, 90]
			];
	$scope.onClick = function (points, evt) {
		console.log(points, evt);
	};
});
