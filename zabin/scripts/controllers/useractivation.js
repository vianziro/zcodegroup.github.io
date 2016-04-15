'use strict';

angular.module('app')

.controller('UserActivationCtrl', function($scope, $state, $localStorage, UserSvc, toaster) {
    var o = $scope;
    o.form = {};

    o.activation = function() {
        if (o.form.email !== undefined && o.form.challengecode !== undefined) {
            UserSvc.activation(o.form).then(function() {
                $state.go('login')
            }, function(res) {
				toaster.pop('error', 'Aktivasi User', res.data.error.message);
            })
        } else console.log('Isi dulu semua form broo')
    }
});
