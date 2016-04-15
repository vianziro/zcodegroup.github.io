'use strict';

angular.module('app')

.factory('CompanySvc', function($http, config, $localStorage) {
    var url = config.url + '/crm-company';
    return {
        get: function(userid) {
            if (userid === undefined) {
                userid = $localStorage.user.id;
            }
            return $http.get(url + "?filter[where][owner]=" + userid);
        },
        create: function(data) {
            data.owner = $localStorage.user.id;
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