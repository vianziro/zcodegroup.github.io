'use strict';

angular.module('app')

.factory('UserSvc', function($http, config) {
    var url = config.url + '/users'
    return {
        get: function() {
            return $http.get(url + '?filter[include]=roles');
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
        login: function(data) {
            return $http.post(url + "/login", data);
        },
        logout: function(data) {
            return $http.post(url + "/logout");
        },
        getUser: function(id) {
            return $http.get(url + '/' + id);
        },
        resetPassword: function(data) {
            return $http.post(url + '/reset', data);
        }
    }
});
