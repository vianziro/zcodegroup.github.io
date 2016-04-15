"use strict";

angular.module('app')

.factory('ConfigSvc', function ($http, config, $localStorage){
	var url = config.url + '/crm-config';
	return {
		get: function (){
			return $http.get(url + '?filter[where][companyId]='+$localStorage.company.id);
		},
		getByModule: function(module){
			return $http.get(url + '?filter[where][companyId]='+$localStorage.company.id + '&module='+module);
		},
		create: function (data){
			return $http.post(url, data);
		},
		update: function(data) {
			return $http.put(url + '/' + data.id, data);
		},	
	}
})
