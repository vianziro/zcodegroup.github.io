'use strict';

angular.module('app')

.controller('JournalCtrl', function($scope, JournalSvc, AccountSvc, WorkspaceSvc) {
    var o = $scope;
    // o.workspaceId = null;
    o.workspaces = [];
    o.form = {};
    o.credits = [];
    o.debits = [];
    o.journals = [];
    o.journal = {};

    WorkspaceSvc.get().then(function(res) {
        o.workspaces = res.data;
    });

    o.save = function() {
        if (!o.workspaceId) {
            alert('Silahkan pilih sektor terlebih dulu');
        }
        var data = angular.copy(o.form);
        data.workspaceId = o.workspaceId;
        if (data.id)
            JournalSvc.update(data).then(success, fail);
        else
            JournalSvc.create(data).then(success, fail);
    }

    o.delete = function() {
        var x = confirm("Apakah yakin akan menghapus data Jurnal?");
        if (x) {
            JournalSvc.delete(o.form.id).then(function() {
                o.form = {};
                o.reload();
            })
        }
    };

    var success = function(res) {
        o.reload();
        o.form = {};
    };

    var fail = function(res) {
        alert('Gagal menyimpan data Jurnal');
    };

    o.select = function(d) {
        o.form = angular.copy(d);
        o.form.date = new Date(o.form.date);
    }

    o.reload = function() {
        AccountSvc.get(null, o.workspaceId).then(function(res) {
            o.credits = res.data;
            o.debits = res.data;
        });

        if (o.workspaceId)
            JournalSvc.get(o.workspaceId).then(function(res) {
                o.journals = res.data;
            })
    }
});
