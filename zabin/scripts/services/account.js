'use strict';

angular.module('app')

.factory('AccountSvc', function($http, config) {
    var url = config.url + '/accfinance'
    return {
        get: function(categoryId, workspaceId) {
            if (categoryId && workspaceId)
                return $http.get(url + '?filter[where][and][0][categoryId]=' + categoryId + '&filter[where][and][1][workspaceId]=' + workspaceId);
            else if (workspaceId)
                return $http.get(url + '?filter[where][workspaceId]=' + workspaceId);
            else
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
    };
});
