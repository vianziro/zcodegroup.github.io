'use strict';

angular.module('app')

.factory('SurveySvc', function($http, config) {
    var url = config.url + '/survey'
    return {
        get: function() {
            return $http.get(url);
        },
        create: function(data) {
            return $http.post(url, data);
        },
        update: function(data) {
            return $http.put(url + '/' + data.id, data);
        },
        delete: function(id) {
            return $http.delete(url + '/' + id);
        }
    }
});
