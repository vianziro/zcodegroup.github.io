'use strict';

angular.module('app')

.controller('LedgerCtrl', function($scope, JournalSvc, AccountSvc, WorkspaceSvc, $localStorage) {
    var o = $scope;
    o.accounts = [];
    o.workspaces = [];

    AccountSvc.get().then(function(res) {
        o.accounts = res.data;
    });

    WorkspaceSvc.get().then(function(res) {
        var uw = $localStorage.user.workspaces;
        for (var i in res.data) {
            for (var j in uw) {
                if (res.data[i].id === uw[j]){
                	o.workspaces.push(res.data[i]);
                }
            }
        }
    });

    o.abs = function(n) {
        return Math.abs(n);
    }

    o.getLedger = function() {
        if (o.month && o.workspaceId)
            JournalSvc.getByMonth(o.month, 'asc', o.workspaceId).then(function(res) {
                for (var i in o.accounts) {
                    var acc = o.accounts[i];
                    acc.journals = [];
                    var saldo = 0;
                    for (var j in res.data) {
                        var journal = angular.copy(res.data[j]);
                        if (journal.debitAccount === acc.id) {
                            delete journal.credit;
                            delete journal.creditAccount;
                            saldo += journal.amount;
                            if (saldo < 0) {
                                journal.creditSaldo = angular.copy(saldo);
                            } else {
                                journal.debitSaldo = angular.copy(saldo);
                            }
                            acc.journals.push(journal);
                        } else if (journal.creditAccount === acc.id) {
                            delete journal.debit;
                            delete journal.debitAccount;
                            saldo -= journal.amount;
                            if (saldo < 0) {
                                journal.creditSaldo = angular.copy(saldo);
                            } else {
                                journal.debitSaldo = angular.copy(saldo);
                            }
                            acc.journals.push(journal);
                        }
                    }
                }
            });
    }
});
