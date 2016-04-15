'use strict';

angular.module('app')

.controller('LoginCtrl', function($scope, $state, $localStorage, UserSvc, CompanySvc) {
    var o = $scope;
    o.form = {};

    o.login = function() {
        var data = angular.copy(o.form);
        UserSvc.login(data).then(function(res) {
            $localStorage.token = res.data.id;
            UserSvc.getUser(res.data.userId).then(function(res) {
                $localStorage.user = res.data;
                CompanySvc.get(res.data.id).then(function(res) {
                    if (res.data.length > 0)
                        $localStorage.company = res.data[0];
                    $state.go('home');
                });
            });
        }, function(res) {
            alert(res.data.error.message);
        });
    }
});
