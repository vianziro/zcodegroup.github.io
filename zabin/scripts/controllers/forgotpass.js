'use strict';

angular.module('app')

.controller('ForgotpassCtrl', function($scope, $state, $localStorage, UserSvc) {
    var o = $scope;
    o.form = {};

    o.reset = function() {
        var data = angular.copy(o.form);
        UserSvc.resetPassword(data).then(function(res) {
            $state.go('home');
        }, function(res) {
            alert(res.data.error.message);
        });
    }
});
