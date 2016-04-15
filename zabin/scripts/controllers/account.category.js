'use strict';

angular.module('app')

.controller('AccountCategoryCtrl', function($scope, AccountCategorySvc) {
    var o = $scope;
    o.categories = [];
    o.category = {};

    var reload = function() {
        AccountCategorySvc.get().then(function(res) {
            o.categories = res.data;
        });
    };
    reload();

    o.save = function() {
        var data = angular.copy(o.category);
        if (data.id)
            AccountCategorySvc.update(data).then(success, fail);
        else
            AccountCategorySvc.create(data).then(success, fail);
    }

    o.delete = function() {
        var x = confirm("Apakah yakin akan menghapus Account Category?");
        if (x) {
            AccountCategorySvc.delete(o.category.id).then(function() {
                o.category = {};
                reload();
            })
        }
    };

    var success = function(res) {
        alert('Berhasil menyimpan Account category');
        reload();
        o.category = {};
    };

    var fail = function(res) {
        alert('Gagal menyimpan Account category');
    };

    o.select = function(d) {
        o.category = angular.copy(d);
    }
});
