'use strict';

angular.module('app')

.controller('ProfileCtrl', function($scope, $state, $localStorage, UserSvc, CompanySvc, toaster) {
    var o = $scope;
    o.form = angular.copy($localStorage.user);
    o.company = angular.copy($localStorage.company);

    o.save = function() {
        var data = angular.copy(o.form);
        UserSvc.update(data).then(function(res) {
			toaster.pop('success', 'Profile', 'Berhasil memperbarui data pribadi');
            $localStorage.user = res.data;
        }, function(res) {
			toaster.pop('error', 'Profile', res.data.error.message);
        });
    };

    o.changepass = function() {
        $state.go('changepass');
    };


    // COMPANY
    o.saveCompany = function() {
		var data = angular.copy(o.company);
		CompanySvc.update(data).then(function (res){
			toaster.pop('success', 'Profile', 'Berhasil memperbarui data perusahaan');
            $localStorage.user = res.data;
			$localStorage.company = res.data;
		});
    };
});
