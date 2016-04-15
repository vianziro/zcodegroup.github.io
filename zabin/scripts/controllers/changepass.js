'use strict';

angular.module('app')

.controller('ChangepassCtrl', function($scope, $state, $localStorage, UserSvc) {
    var o = $scope;
    o.form = angular.copy($localStorage.user);
    
    o.changepass = function() {
        var data = angular.copy(o.form);
        UserSvc.update(data).then(function(res) {
        	alert("Berhasil ubah password")
            $state.go('home');
        }, function(res) {
            alert(res.data.error.message);
        });
    }
});