'use strict';

angular.module('app')

.controller('UserCtrl', function($scope, UserSvc, WorkspaceSvc) {
    var o = $scope;
    o.users = [];
    o.user = {};

    var reload = function() {
        UserSvc.get().then(function(res) {
            o.users = res.data;
        });
    };
    reload();

    o.workspaces = [];

    WorkspaceSvc.get().then(function(res) {
        o.workspaces = res.data;
    });

    o.save = function() {
        var data = angular.copy(o.user);
        data.workspaces = [];
        for (var i in data.temp) {
            if (data.temp[i]) {
                data.workspaces.push(i);
            }
        }
        delete data.temp;
        if (data.workspaces.length === 0) delete data.workspaces;
        if (data.id)
            UserSvc.update(data).then(success, fail);
        else
            UserSvc.create(data).then(success, fail);
    }

    o.delete = function() {
        var x = confirm("Apakah yakin akan menghapus User?");
        if (x) {
            var data = angular.copy(o.user);
            UserSvc.delete(data.id).then(function() {
                o.user = {};
                reload();
            })
        }
    };

    o.changepass = function() {
        var password = prompt("Silahkan masukan password baru untuk " + o.user.username, "");
        if (password !== null && password !== "") {
            o.user.password = password;
            o.save();
        }
    }

    var success = function(res) {
        reload();
        o.user = {};
    };

    var fail = function(res) {
        alert('Gagal menyimpan User');
    };

    o.select = function(d) {
    	console.log(d)
        o.user = angular.copy(d);
        o.user.temp = {};
        for(var i in d.workspaces){
        	o.user.temp[d.workspaces[i]] = true;
        }
    }

    o.def = function(group, code) {
        if (group === "role") {
            switch (code) {
                case 0:
                    return "Admin";
                case 1:
                    return "User";
            }
        } else if (group === "status") {
            switch (code) {
                case 0:
                    return "Not activated yet";
                case 1:
                    return "Active";
                case 2:
                    return "Disabled";
            }
        }
    }
});
