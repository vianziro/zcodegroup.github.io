(function() {
    var template = "<table class='table' ng-if='zdata.length > 0'>" +
        "<thead>" +
        "<tr>" +
        "<th ng-if='withSelector'><input type='checkbox' ng-model='param.masterCheck' ng-change='toggleAll()'/></th>" +
        "<th ng-repeat='(key, value) in zdata[0]' ng-if='onTable(key)'>{{getLabel(key)}}</th>" +
        "</tr>" +
        "</thead>" +
        "<tbody>" +
        "<tr ng-repeat='d in zdata'>" +
        "<td ng-if='withSelector'><input type='checkbox' ng-model='d.isActive' ng-change='checkSelection()'/></td>" +
        "<td ng-repeat='(key, value) in d' ng-if='onTable(key)' ng-click='rowSelection(d)'>{{value}}</td>" +
        "</tr>" +
        "</tbody>" +
        "<tfoot ng-if='pagenumber > 0'>" +
        "<tr>" +
        "<td colspan='{{param.columnLength}}'><center><nav>" +
        "<ul class='pagination'>" +
        "<li ng-repeat='page in getNumber(pagenumber) track by $index' ng-class='{active: $index==currentPage}'><a ng-click='pageSelection($index)'>{{$index + 1}} {{page}}</a></li></ul>" +
        "</nav></center></td>" +
        "</tr>" +
        "</tfoot>" +
        "</table>";



    /*
	$scope.config:
		- data: array of data that will be show on table
		- labels: object maping between property on data with label that will be show on header table
		- withSelector: boolean value, true: table will show checkbox selector
		- rowSelection: function that handle row selection will return selected object
		- selected: array of selected data
		- pagination: object with 3 properties (limit, offset, )
    */
    var controller = function($scope) {
        var sc = $scope,
            config = sc.config;
        sc.currentPage = 0;
        sc.zdata = config.data || [];
        sc.zlabel = config.labels;
        sc.withSelector = config.withSelector;
        sc.rowSelection = config.rowSelection;
        sc.pagination = config.pagination;
        sc.pagenumber = Math.ceil(config.pagination.total / config.pagination.limit);
        var getColumnLength = function() {
            if (config.withSelector)
                return Object.keys(config.labels).length + 1;
            else
                Object.keys(config.labels).length;
        }
        sc.param = {
            masterCheck: false,
            anySelected: false,
            columnLength: getColumnLength()
        };

        var refresh = function(query) {
            config.asyncData(query).then(function(res) {
                sc.zdata = res.data;
                config.data = res.data;
                config.pagination.total = res.count; //res.count
                sc.pagenumber = Math.ceil(config.pagination.total / config.pagination.limit);
            });
        };

        refresh({ offset: 0, limit: config.pagination.limit });

        sc.getNumber = function(num) {
            return new Array(num);
        };

        sc.getLabel = function(field) {
            for (var i in sc.zlabel) {
                var o = sc.zlabel[i];
                if (o.field === field)
                    return o.label;
            }
            return field;
        };

        sc.toggleAll = function() {
            sc.anySelected = sc.param.masterCheck;
            for (var i in sc.zdata) {
                sc.zdata[i].isActive = sc.param.masterCheck;
            }
            if (sc.param.masterCheck) config.selected = angular.copy(sc.zdata);
            else config.selected = [];
        };

        sc.checkSelection = function() {
            sc.anySelected = false;
            config.selected = [];
            for (var i in sc.zdata) {
                if (sc.zdata[i].isActive) {
                    sc.anySelected = true;
                    config.selected.push(angular.copy(sc.zdata[i]));
                }
            }
        };

        //page is zero based
        sc.pageSelection = function(page) {
            sc.currentPage = page;
            var q = {
                offset: (page) * config.pagination.limit,
                limit: config.pagination.limit
            };
            refresh(q);
        };

        sc.onTable = function(field) {
            var reserveFields = ['isActive'];
            var exist = false;
            for (var i in sc.zlabel) {
                if (sc.zlabel[i].field === field) {
                    exist = true;
                    break;
                }
            }
            return reserveFields.indexOf(field) === -1 && exist;
        };

    }


    var directive = function() {
        return {
            restrict: 'EA',
            scope: {
                zdata: '=',
                zlabel: '=',
                config: '='
            },
            template: template,
            controller: controller
        };
    };

    angular.module('ztable')

    .directive('app', directive);
}());
