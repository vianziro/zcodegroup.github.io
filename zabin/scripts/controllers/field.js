angular.module('app', [])

.controller('FieldCtrl', function($scope, $rootScope, $state, $localStorage, FieldSvc, CompanySvc) {
    var o = $scope,
        user = $localStorage.user,
        company = $localStorage.company;
    o.ofield = {};
    o.fields = {};
    o.editMode = false;

    /* Update Field */
    var index = -1;
    o.selectField = function(f, idx) {
        o.cfield = angular.copy(f);
        o.editMode = true;
        index = idx;
    }

    FieldSvc.get().then(function(res) {
        if (res.data.length > 0) {
            o.ofield = res.data[0];
            o.fields = res.data[0].fields;
        } else $state.go('starter'); //go to field editor
    })

    o.save = function() {
        var temp = angular.copy(o.cfield);
        if (o.editMode) o.fields[index] = temp;
        else {
            temp.id = FieldSvc.getId();
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
        data.companyId = company.id;
        data.owner = user.id;
        data.fields = f;
        //owner, companyid, name ???
        FieldSvc.update(data).then(function(res) {
            $state.go($rootScope.fromState.name);
        }, function(res) {
            alert("gagal menyimpan data field");
        })
    }

	o.selectType = function (){
		if(o.cfield.type === 'option') {
			o.cfield.optionValues = [{}];
		}
	}

	o.addValue = function (){
		o.cfield.optionValues.push({});
	}

	o.deleteValue = function (value){
		for(var i=o.cfield.optionValues.length-1; i>=0; i--){
			if (value === o.cfield.optionValues[i].value){
				o.cfield.optionValues.splice(i, 1);
				return;
			} 
		}
	}

});
