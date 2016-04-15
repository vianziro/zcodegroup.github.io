'use strict';

angular.module('app')

.controller('CustomerGroupCtrl', function($scope, $filter, FieldSvc, CustomerSvc, GroupSvc, $localStorage) {
    var o = $scope,
        x = this,
        allCustomer = [];
    o.ngroup = 0;
    o.param = {};
    o.customers = [];
	o.filteredCustomers = [];
	o.filteredCustomersGroup = [];
    x.customerSelected = false;
    x.groupSelected = false;
    x.customersgroup = [];

    function reloadGroup() {
        GroupSvc.get().then(function(res) {
            o.ngroup = res.data.length;
            o.groups = res.data;
        });
    };

    reloadGroup();

    CustomerSvc.get().then(function(res) {
        allCustomer = res.data;
    });
    FieldSvc.get().then(function(res) {
        x.primary = res.data[0].primary;
    })
    o.addGroup = function() {
        var name = prompt("Nama Kelompok:");
        if (name === null) return;
        var obj = {
            companyId: $localStorage.company.id,
            name: name
        }
        GroupSvc.create(obj).then(function(res) {
            o.groups.push(res.data);
            x.group = null;
            x.customersgroup = [];
            o.customers = [];
            reloadGroup();
        });
    };
    o.editGroup = function() {
        if (x.group === undefined) {
            alert("Silahkan pilih kelompok terlebih dulu");
            return;
        }
        var name = prompt("Nama Kelompok:", x.group.name);
        if (name === null) return;
        x.group.name = name;
        var data = angular.copy(x.group);
        GroupSvc.update(data).then(function(res) {
            for (var i in o.groups) {
                if (o.groups[i].id === x.group.id) {
                	o.groups.name = name;
                    break;
                }
            }
        });
    };
    o.deleteGroup = function() {
        if (x.group === undefined) {
            alert("Silahkan pilih kelompok terlebih dulu");
            return;
        }
        var xf = confirm("Apakah yakin akan menghapus kelompok '" + x.group.name + "'?");
        if (xf) {
            //will be delete all everything on crm-group and crm-customer-group
            GroupSvc.delete(x.group.id).then(function() {
                for (var i in o.groups) {
                    if (o.groups[i].id === x.group.id) {
                        o.groups.splice(i, 1);
                        break;
                    }
                }
                x.group = null;
                x.customersgroup = [];
                o.customers = [];
            });
        }
    };
    o.selectGroup = function() {
        GroupSvc.getCustomers(x.group.id).then(function(res) {
            x.customersgroup = [];
            for (var i in res.data) {
                var c = res.data[i].customer;
                c.xid = res.data[i].id;
                x.customersgroup.push(c);
            }
            // x.customersgroup = res.data[0].customers;
            var temp = angular.copy(allCustomer);
            for (var i in x.customersgroup) {
                for (var j in temp) {
                    if (temp[j].id === x.customersgroup[i].id) {
                        temp.splice(j, 1);
                        break;
                    }
                }
            }
            o.customers = temp;
        });
    };
    o.selectRow = function(obj) {
        obj.isActive = !obj.isActive;
    };
    o.toggleCustomer = function() {
        x.customerSelected = !x.customerSelected;
        for (var i in o.customers) {
            var ox = o.customers[i];
            ox.isActive = x.customerSelected;
        }
    };
    o.toggleGroup = function() {
        x.groupSelected = !x.groupSelected;
        for (var i in x.customersgroup) {
            var ox = x.customersgroup[i];
            ox.isActive = x.groupSelected;
        }
    };

    o.addToGroup = function() {
    	if (x.group === null){
    		alert('Silahkan pilih kelompok terlebih dulu');
    		return;
    	}
        var gid = x.group.id;
        for (var i = o.customers.length - 1; i >= 0; i--) {
            var ox = o.customers[i];
            if (ox.isActive) {
            	ox.isActive = false;
                x.customersgroup.push(ox);
                o.customers.splice(i, 1);
                var obj = {
                    groupId: gid,
                    customerId: ox.id
                };
                GroupSvc.addCustomer(obj);
            }
        }
    };

    o.removeFromGroup = function() {
        for (var i = x.customersgroup.length - 1; i >= 0; i--) {
            var ox = x.customersgroup[i];
            if (ox.isActive) {
            	ox.isActive = false;
                o.customers.push(ox);
                x.customersgroup.splice(i, 1);
                GroupSvc.deleteCustomer(ox.xid);
            }
        }
    }
});
