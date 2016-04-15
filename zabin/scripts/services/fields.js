'use strict';

angular.module('app')

.factory('FieldSvc', function($http, config, $localStorage) {
    var url = config.url + '/crm-fields'
    var user = $localStorage.user;
    var prefix = "crm";
    return {
        prefix: prefix,
        getId: function() {
            var text = prefix,
                possible = "0123456789abcdefghijklmnopqrstuvwxyz";
            for (var i = 0; i < 5; i++)
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            return text;
        },
        validateId: function(id) {
            if (id === undefined || id === null) return false;
            else if (id.length != prefix.length + 5) return false;
            else if (id.indexOf(prefix) != 0) return false;
            else return true;
        },
        getTemplate: function() {
            return $http.get(url + "?filter[where][owner]=zcode");
        },
        get: function(companyId) {
            if (companyId === undefined)
                companyId = $localStorage.company.id;
            return $http.get(url + "?filter[where][companyId]=" + companyId);
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
