'use strict';

angular.module('app')

.factory('GroupSvc', function($http, config, $localStorage, $q) {
    var url = config.url + '/crm-group';
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
        update: function(data) {
            return $http.put(url + '/' + data.id, data);
        },
        delete: function(id) {
            return $http.delete(url + '/' + id);
        },
        count: function() {
            var filter = '?filter[companyId]=' + $localStorage.company.id;
            return $http.get(url + '/count' + filter);
        },
        getCustomers: function(groupId) {
            var fl = '/crm-customer-group?filter[where][groupId]=' + groupId;
            var inc = '&filter[include]=customer';
            return $http.get(config.url + fl + inc);
        },
        addCustomer: function(data) {
            return $http.post(config.url + '/crm-customer-group', data);
        },
        deleteCustomer: function(associationId) {
            return $http.delete(config.url + '/crm-customer-group/' + associationId);
        }
    }
});