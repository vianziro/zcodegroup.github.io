'use strict';

angular.module('app')

.controller('CustomerCtrl', function($scope, $state, $filter, $q, CustomerSvc, FieldSvc) {
    var o = $scope,
        x = this,
        onTables = [],
        translator = {},
        fields = {},
        ofield = {},
        query = {},
        tstate = {};
    o.ncustomer = 0;
    o.headers = [];
    o.displayed = [];
    o.primaryField = "";
	o.colspan = 1;

    CustomerSvc.search(query).then(function(res) {
        o.ncustomer = res.data.count;
    });

    FieldSvc.get().then(function(res) {
        if (res.data.length > 0) {
            ofield = res.data[0];
            fields = res.data[0].fields;
			o.fields = fields;
            var prim = res.data[0].primary;
            for (var i in res.data[0].fields) {
                var f = res.data[0].fields[i];
                translator[f.id] = f.label;
                if (f.onTable) {
					++o.colspan;
                    onTables.push(f.id);
                }
                if (prim === f.id) {
                    o.primaryField = " berdasarkan " + f.label;
                }
            }
        } else $state.go('field');
    });

    o.callServer = function (tableState) {
        tstate = tableState;
        o.isLoading = true;
        var pagination = tableState.pagination;
        var start = pagination.start || 0; // This is NOT the page number, but the index of item in the list that you want to use to display the table.
        var number = pagination.number || 10; // Number of entries showed per page.
        query.limit = number;
        query.offset = start;
        CustomerSvc.search(query).then(function(result) {
			o.displayed = CustomerSvc.format(fields, result.data.result);
            o.count = result.data.count;
            tableState.pagination.numberOfPages = Math.ceil(result.data.count / number); //result.numberOfPages; //set the number of pages so the pagination can update
            o.isLoading = false;
        });
    };

    this.search = function() {
        query[ofield.primary] = {
            type: 'text',
            value: this.query
        };
        o.callServer(tstate);
    }

    o.delete = function() {
        var ids = [];
        if (confirm("Apakah yakin akan menghapus data pelanggan?")) {
            for (var i in o.displayed) {
                var ox = o.displayed[i];
                if (ox.isActive)
                    ids.push(ox.id);
            }
            CustomerSvc.removes({ ids: ids }).then(function (res){
            	x.anySelected = false;
            	o.masterCheck = false;
            	o.callServer(tstate);
            })
        }
    }

    o.onTable = function(key) {
        return onTables.indexOf(key) > -1;
    }

    o.translate = function(key) {
        return translator[key];
    }

    o.normalize = function(key, value) {
        for (var i in fields) {
            if (fields[i].id === key) {
                if (fields[i].type === 'date') return $filter('date')(new Date(value), 'dd MMM yyyy');
                else return value;
            }
        }
        return value;
    }

    o.detail = function(id) {
        $state.go('customerform', {
            id: id
        });
    }

    o.export = function() {
		o.headers = [];
        var q = $q.defer();
        CustomerSvc.get().then(function(res) {
            var result = [];
            for (var i in res.data) {
                var obj = {};
                for (var j in res.data[i]) {
                    if (FieldSvc.validateId(j)) {
                        obj[translator[j]] = res.data[i][j];
                        if (i == 0)
                            o.headers.push(translator[j]);
                    }
                }
                result.push(obj);
            }
            q.resolve(result);
        });
        return q.promise;
    };

    o.toggleAll = function() {
        x.anySelected = o.masterCheck;
        for (var i in o.displayed) {
            o.displayed[i].isActive = o.masterCheck;
        }
    };

    o.checkSelection = function() {
        x.anySelected = false;
        for (var i in o.displayed) {
            if (o.displayed[i].isActive) {
                x.anySelected = true;
                break;
            }
        }
    };
});
