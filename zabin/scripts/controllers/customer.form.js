'use strict';

angular.module('app')

.controller('CustomerFormCtrl', function($scope, $state, $stateParams, $localStorage, CustomerSvc, FieldSvc, toaster) {
    var o = $scope;
    o.customer = {
        companyId: $localStorage.company.id
    };
    o.ofield = {};
    var id = $stateParams.id;
    o.isEdit = id || false;
    var reload = function() {
        FieldSvc.get().then(function(res) {
            if (res.data.length > 0) o.ofield = res.data[0];
            else $state.go('starter'); //go to field editor
            if (id)
                CustomerSvc.getById(id).then(function(res) {
                    for (var i in res.data) {
                        var fields = o.ofield.fields;
                        for (var j in fields) {
                            if (fields[j].id === i) {
                                if (fields[j].type === 'date')
                                    res.data[i] = new Date(res.data[i]);
                            }
                        }
                    }
                    o.customer = res.data;
                });
        });
    };

    reload();

    o.save = function() {
        if (validate()) {
            var data = angular.copy(o.customer);
            if (data.id)
                CustomerSvc.update(data).then(success, error);
            else
                CustomerSvc.create(data).then(success, error);
        }
    }

    o.delete = function() {
        if (confirm("Apakah anda yakin akan menghapus data pelanggan?")) {
            CustomerSvc.delete(id).then(success, error);
        }
    }

    var success = function() {
		toaster.pop('success', 'Form Pelanggan', 'Transaksi berhasil');
        $state.go('customer');
    }

    var error = function(res) {
		toaster.pop('error', 'Form Pelanggan', res.data.error.message);
    }

    var validate = function() {
        var requiredFields = [];
        for (var i in o.ofield.fields) {
            var x = o.ofield.fields[i];
            var isExist = false;
            for (var j in o.customer) {
                var y = o.customer[j];
                if (x.id === j && x.required && y === "") {
                    requiredFields.push(x.label);
                } else if (x.id === j && (y.length > 0 || y !== null)) {
                    isExist = true;
                    break;
                }
            }
            if (!isExist && x.required) {
                requiredFields.push(x.label);
                if (requiredFields.length > 3) break;
            };
        };
        if (requiredFields.length > 0) {
            var errs = requiredFields.join(", ");
			toaster.pop('error', 'Form Pelanggan', "Fields berikut harus diisi: " + errs);
            return false;
        }
        return true;
    };
});
