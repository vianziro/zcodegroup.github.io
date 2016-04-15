'use strict';

angular.module('app')

.controller('ProfileBankCtrl', function($scope, $state, UserSvc, $localStorage) {
    var o = $scope, index;
    o.banks = [];
    o.bank = {};
    o.user = {};

    var reload = function() {
        UserSvc.getById($localStorage.user.id).then(function(res) {
            o.user = res.data;
            o.banks = res.data.banks || [];
        });
    };
    reload();

    o.save = function() {
        o.user.banks = angular.copy(o.banks);
        var data = angular.copy(o.user);
        UserSvc.update(data).then(success, fail);
    }

    o.add = function (){
    	var a = angular.copy(o.bank);
    	o.banks.push(a);
    	o.bank = {};
    }

    o.delete = function() {
        var x = confirm("Apakah yakin akan menghapus data?");
        if (x) {
            o.banks.splice(index, 1);
            o.bank = {};
        }
    };

    var success = function(res) {
    	$localStorage.user = angular.copy(o.user);
        $state.go('profile');
    };

    var fail = function(res) {
        alert('Gagal menyimpan Workspace');
    };

    o.select = function(d, idx) {
        o.bank = angular.copy(d);
        index = idx;
    }
});
