'use strict';

angular.module('app')

.controller('SurveyCtrl', function(SurveySvc, NgTableParams) {
	var o = this;
	
    o.tableSurvey = new NgTableParams({}, { dataset: data});

    o.detail = function(id) {
        $state.go('app.surveyform', {
            id: id
        });
    }
})

.controller('SurveyFormCtrl', function($scope, $state, $stateParams, SurveySvc) {
    var o = this;
    o.Survey = {};
    o.isEdit = false;
    var id = $stateParams.id;
    
    var reload = function() {

    }
    reload();

    o.save = function() {

    }

    o.delete = function() {
        SurveySvc.delete(id).then(success, error);
    }

    var success = function() {
        $state.go('app.Survey');
    }

    var error = function(res) {
        alert(res.data.error.message)
    }
});
