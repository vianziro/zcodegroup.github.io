	'use strict';

	angular.module('app')

	.factory('JournalSvc', function($http, $filter, config) {
	    var url = config.url + '/journal'
	    return {
	        get: function(workspaceId) {
	            return $http.get(url + '?filter[order]=date desc&filter[include]=debit&filter[include]=credit&filter[where][workspaceId]=' + workspaceId);
	        },
	        create: function(data) {
	            return $http.post(url, data);
	        },
	        update: function(data) {
	            return $http.put(url + '/' + data.id, data);
	        },
	        delete: function(id) {
	            return $http.delete(url + '/' + id);
	        },
	        getByMonth: function(date, order, workspaceId) {
	            var order = order ? order : 'desc';
	            var y = date.getFullYear(),
	                m = date.getMonth(),
	                a = new Date(y, m, 1),
	                b = new Date(y, m + 1, 0);
	            a.setDate(a.getDate() - 1);
	            b.setDate(a.getDate() + 1);
	            var firstDay = $filter('date')(a, 'MM/dd/yyyy');
	            var lastDay = $filter('date')(b, 'MM/dd/yyyy');
	            var xurl = url + '?filter[order]=date ' + order + '&filter[include]=debit&filter[include]=credit';
	            xurl += '&filter[where][date][between][0]=' + firstDay + '&filter[where][date][between][1]=' + lastDay;
	            xurl += '&filter[where][workspaceId]=' + workspaceId;
	            return $http.get(xurl);
	        }
	    };
	});
