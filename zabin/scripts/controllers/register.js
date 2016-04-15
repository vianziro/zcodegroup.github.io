'use strict';

angular.module('app')

.controller('RegisterCtrl', function($scope, $state, $localStorage, UserSvc) {
    var o = $scope;
    o.form = {};

    o.register = function() {
        var data = angular.copy(o.form);
        delete data.repassword;
        UserSvc.create(data).then(function(res) {
            $state.go('useractivation', { email: data.emali });
        }, function(res) {
            alert(res.data.error.message);
        });
    }
});
