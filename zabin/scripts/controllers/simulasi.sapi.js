'use strict';

angular.module('app')

.controller('SimulasiSapiCtrl', function($scope, $filter) {
	var inv = [], 
		opsi = 20,
		investMin = 10e6,
		backupCost = 0.1,
		pemeliharaan = 7;

	for (var i = 1; i<=opsi; i++){
		inv.push(i * investMin);
	}

	var o = $scope;
	o.sapi = {
		fund: 14e6,
		packages: inv,
		package: investMin,
		indukan: 8.5e6,
		pakan: 90e3,
		kandang: 60e3,
		sellPrice: 14e6,
		pemeliharaan: pemeliharaan
	}

	o.getQty = function (){
		return Math.ceil(o.sapi.package / investMin);
	}

	o.totalVar = function (){
		return o.sapi.indukan + (o.sapi.pakan + o.sapi.kandang) * pemeliharaan;
	}

	o.biayaTernak = function() {
		return o.getQty() * o.totalVar();
	}

	o.biayaLain = function (){
		return o.biayaTernak() * backupCost;
	}

	o.laba = function (){
		return o.getPendapatan() - o.biayaTernak() - o.biayaLain()
	}

	o.investorShare = function (){
		return (o.sapi.package / (o.sapi.fund + o.sapi.package)) * 100;
	}

	o.getPendapatan = function (){
		return o.getQty() * o.sapi.sellPrice;
	}

});