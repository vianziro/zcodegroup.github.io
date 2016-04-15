'use strict';

angular.module('app')

.controller('JournalViewCtrl', function($scope, JournalSvc, WorkspaceSvc, $localStorage) {
    var o = $scope;
    o.workspaces = [];
    o.journals = [];
    o.date = new Date();

    o.reload = function() {
        if (o.date && o.workspaceId)
            JournalSvc.getByMonth(o.date, 'asc', o.workspaceId).then(function(res) {
                o.journals = res.data;
            })
    };

    WorkspaceSvc.get().then(function(res) {
        var uw = $localStorage.user.workspaces;
        for (var i in res.data) {
            for (var j in uw) {
                if (res.data[i].id === uw[j]) {
                    o.workspaces.push(res.data[i]);
                }
            }
        }
    });
});
