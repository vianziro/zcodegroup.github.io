'use strict';

angular.module('app')

.controller('AccountCtrl', function($scope, AccountSvc, AccountCategorySvc, WorkspaceSvc) {

    var o = $scope;
    o.workspaces = [];
    o.categories = [];
    o.accounts = [];
    o.account = {};
    o.form = {};

    WorkspaceSvc.get().then(function(res) {
        o.workspaces = res.data;
    });

    AccountCategorySvc.get().then(function(res) {
        o.categories = res.data;
    });


    o.getAccount = function() {
        if (o.account.categoryId && o.account.workspaceId)
            AccountSvc.get(o.account.categoryId, o.account.workspaceId).then(function(res) {
                o.accounts = res.data;
            });
    }

    var reload = function() {
        AccountCategorySvc.get().then(function(res) {
            o.categories = res.data;
        });
    };
    reload();

    o.save = function() {
        var data = angular.copy(o.account);
        // data.categoryId = o.form.category.id;
        if (data.id)
            AccountSvc.update(data).then(success, fail);
        else
            AccountSvc.create(data).then(success, fail);
    }

    o.delete = function() {
        var x = confirm("Apakah yakin akan menghapus Account Category?");
        if (x) {
            AccountCategorySvc.delete(o.account.id).then(function() {
                o.account = {};
                reload();
            })
        }
    };

    o.select = function(d) {
        o.account = angular.copy(d);
    };

    o.reset = function() {
        o.account = {};
    }

    var success = function(res) {
        o.getAccount();
        o.account = {};
    };

    var fail = function(res) {
        alert('Gagal menyimpan Account category');
    };


});
