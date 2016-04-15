'use strict';

angular.module('app')

.factory('CustomerSvc', function($http, config, $localStorage, $q) {
	var url = config.url + '/crm-customer';
	return {
		get: function() {
			return $http.get(url + '?filter[where][companyId]=' + $localStorage.company.id);
		},
	getById: function(id) {
		return $http.get(url + '/' + id);
	},
	create: function(data) {
		return $http.post(url, data);
	},
	activation: function(data) {
		return $http.post(url + '/activation', data);
	},
	update: function(data) {
		return $http.put(url + '/' + data.id, data);
	},
	delete: function(id) {
		return $http.delete(url + '/' + id);
	},
	removes: function(data) {
		return $http.post(url + '/removes', data);
	},
	count: function(q) {
		var f = {companyId: $localStorage.company.id};
		for (var i in q){
			var qq = q[i];
			f[qq.field] = qq.value;
		}
		return $http.get(url + '/count?where=' + JSON.stringify(f));
	},
	search: function(query) {
		query.companyId = $localStorage.company.id;
		return $http.post(url + '/search', query);
	},
	paging: function(start, number, params) {
		var q = $q.defer();
		var filter = '?filter[companyId]=' + $localStorage.company.id;
		$http.get(url + '/count' + filter).then(function(rescount) {
			var qq = "&filter[offset]=" + start;
			qq += "&filter[limit]=" + number;
			qq += "&filter[order]=edited desc"
			var count = rescount.count;
		$http.get(url + filter + qq).then(function(res) {
			var obj = {
				data: res.data,
			count: rescount.data.count
			};
			q.resolve(obj);
		}, function(reserr) {
			q.reject(reserr);
		});
		}, function(reserrcount) {
			q.reject(reserrcount);
		})
		return q.promise;
	},
	format: function (fields, data){
		var customers = [];
		var fx = [];
		for (var i in fields){
			if (fields[i].onTable){
				fx.push(fields[i].id);
			}
		}
		for (var i in data){
			var customer = {};
			for (var j in fx){
				customer[fx[j]] = data[i][fx[j]];
			}
			customer.id = data[i].id;
			customers.push(customer);
		}
		return customers;
	}
	};
});
