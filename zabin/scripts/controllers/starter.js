angular.module('app', [])

.controller('StarterCtrl', function($scope, $state, $localStorage, FieldSvc, CompanySvc) {
    var o = $scope,
        user = $localStorage.user,
        company = $localStorage.company,
        titles = [{ main: "Perusahaan", sub: "Daftarkan perusahaan Anda" }, { main: "Template", sub: "Pilih template yang sesuai dengan bisnis Anda" }, { main: "Custom Template", sub: "Sesuaikan template dengan kebutuhan Anda" }];
    o.step = 1;
    o.ofield = {};
    o.fields = {};
    o.company = {};
    o.editMode = false;
    o.title = titles[o.step - 1];

    FieldSvc.getTemplate().then(function(res) {
        o.templates = res.data;
        if (res.data.length === 1) {
            o.fields = res.data[0].fields;
            o.fields[0].primary = true;
        }
    });

    CompanySvc.get(user.id).then(function(res) {
        if (res.data.length > 0) {
            o.company = company = $localStorage.company = res.data[0];
        }
    });

    o.next = function() {
        ++o.step;
        o.title = titles[o.step - 1];
    }
    o.prev = function() {
        --o.step;
        o.title = titles[o.step - 1];
    }

    o.saveCompany = function() {
        var data = angular.copy(o.company);
        if (data.id) {
            CompanySvc.update(data).then(function(res) {
                $localStorage.company = res.data;
                o.next();
            })
        } else {
            CompanySvc.create(data).then(function(res) {
                $localStorage.company = res.data;
                o.next();
            })
        }

    }

    /* Select Template */
    o.select = function(t) {
        o.fields = t.fields;
    }

    /* Update Field */
    var index = -1;
    o.selectField = function(f, idx) {
        o.cfield = angular.copy(f);
        o.editMode = true;
        index = idx;
    }

    o.save = function() {
        var temp = angular.copy(o.cfield);
        if (o.editMode) o.fields[index] = temp;
        else {
            temp.id = getId();
            o.fields.push(temp)
        }
        o.clear();
    }
    o.delete = function() {
        var f = confirm("Apakah Anda yakin akan menghapus data?");
        if (!f) return;
        o.fields.splice(index, 1);
        o.clear();
    }
    o.clear = function() {
        o.cfield = {};
        o.editMode = false;
    }
    o.publish = function() {
        for (var i in o.fields) {
            if (!FieldSvc.validateId(o.fields[i].id)) {
                var genId = FieldSvc.getId();
                if (o.fields[i].id === o.ofield.primary) {
                    o.ofield.primary = genId;
                }
                o.fields[i].id = genId;
            }
        }
        var f = angular.copy(o.fields);
        var data = angular.copy(o.ofield);
        data.companyId = $localStorage.company.id;
        data.owner = user.id;
        data.fields = f;
        //owner, companyid, name ???
        FieldSvc.create(data).then(function(res) {
            $state.go('home');
        }, function(res) {
            alert("gagal menyimpan data field");
        })
    }

});