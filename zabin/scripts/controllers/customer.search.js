'use strict';

angular.module('app')

.controller('CustomerSearchCtrl', function($scope, $filter, FieldSvc, CustomerSvc, $localStorage) {
    var o = $scope,
        onTables = [],
        translator = {},
        tstate = {},
        fields = [];
    o.query = {};
    o.ncustomer = 0;
    o.ofield = {};
	o.fields = [];
    o.searchFields = $localStorage.searchFields || [];


    CustomerSvc.count().then(function(res) {
        o.ncustomer = res.data.count;
    });

    FieldSvc.get().then(function(res) {
        if (res.data.length > 0) {
            o.ofield = res.data[0];
            fields = res.data[0].fields;
			o.fields = fields;
            for (var i in res.data[0].fields) {
                var f = res.data[0].fields[i];
                translator[f.id] = f.label;
                if (f.onTable) {
                    onTables.push(f.id);
                }
            }
        } else $state.go('starter'); //go to field editor

        if (o.searchFields.length == 0) {
            o.searchFields.push(o.ofield.primary);
            $localStorage.searchFields = $localStorage.searchFields || [];
            $localStorage.searchFields.push(o.ofield.primary);
        }
    });

    o.selectConfig = function(id) {
        if (!$localStorage.searchFields)
            $localStorage.searchFields = [];
        var idx = o.searchFields.indexOf(id);
        if (idx > -1) {
            $localStorage.searchFields.splice(idx, 1);
        } else {
            $localStorage.searchFields.push(id);
        }
        o.searchFields = $localStorage.searchFields || [];
        o.query = {};
    };

    o.isSelected = function(id) {
        return o.searchFields.indexOf(id) > -1;
    };

    o.search = function() {
        for (var i in o.ofield.fields) {
            var fi = o.ofield.fields[i];
            for (var j in o.query) {
                if (j === fi.id) {
                    o.query[j].type = fi.type;
                    break;
                }
            }
        }

        for (var i in o.query) {
            if (o.query[i].type === 'date' && (o.query[i].start === null || o.query[i].end === null)) {
                delete o.query[i];
            }
        }

        o.isLoading = true;
        o.query.limit = 10;
        o.query.offset = 0;
        CustomerSvc.search(o.query).then(function(result) {
			o.displayed = CustomerSvc.format(fields, result.data.result);
            o.count = result.data.count;
            tstate.pagination.numberOfPages = Math.ceil(result.data.count / 10);
            o.isLoading = false;
        });
    };

    o.callServer = function callServer(tableState) {
        tstate = tableState;
        o.isLoading = true;
        var pagination = tableState.pagination;
        var start = pagination.start || 0; // This is NOT the page number, but the index of item in the list that you want to use to display the table.
        var number = pagination.number || 10; // Number of entries showed per page.
        o.query.limit = number;
        o.query.offset = start;
        CustomerSvc.search(o.query).then(function(result) {
			o.displayed = CustomerSvc.format(fields, result.data.result);
            o.count = result.data.count;
            tableState.pagination.numberOfPages = Math.ceil(result.data.count / number); //result.numberOfPages; //set the number of pages so the pagination can update
            o.isLoading = false;
        });
    };

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
})
