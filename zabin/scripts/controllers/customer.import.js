'use strict';

angular.module('app')

.controller('CustomerImportCtrl', function($scope, $state, $filter, $stateParams, $localStorage, CustomerSvc, FieldSvc) {
    var o = $scope,
        translator = {};
    o.itemsByPage = 4;
    o.csvTemplate = [];
    o.csvHeader = [];
    FieldSvc.get().then(function(res) {
        if (res.data.length > 0) {
            var obj = {};
            var fields = res.data[0].fields;
            for (var i in fields) {
                var x = fields[i];
                translator[x.label] = x.id;
                o.csvHeader.push(x.label);
                if (x.type === "date")
                    obj[x.label] = $filter('date')(new Date(), 'yyyy/MM/dd');
                else
                    obj[x.label] = "text";
            }
            o.csvTemplate.push(obj)
        }
    });

    o.upload = function() {
        var temp = angular.copy(o.displayed);
        var data = [];
        for (var i in temp) {
            var obj = {};
            for (var j in temp[i]) {
                obj[translator[j]] = temp[i][j];
                obj.companyId = $localStorage.company.id;
            }
            data.push(obj);
        }
        CustomerSvc.create(data).then(function(res) {
			toaster.pop('success', 'Unggah Data Pelanggan', 'Berhasil mengunggah data pelanggan');
            $state.go('customer');
        }, function(res) {
			toaster.pop('error', 'Unggah Data Pelanggan', 'Gagal mengunggah data pelanggan');
        })
    }
});
