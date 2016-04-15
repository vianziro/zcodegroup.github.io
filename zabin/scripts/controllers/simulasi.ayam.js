'use strict';

angular.module('app')

.controller('SimulasiAyamCtrl', function($scope) {
	var inv = [], 
		opsi = 20,
		investMin = 7e5,
		baseQty = 25e3,
		backupCost = 0.1;

	for (var i = 1; i<=opsi; i++){
		inv.push(i * investMin);
	}

	var o = $scope;
	o.ayam = {
		fund: 14e6,
		packages: inv,
		package: investMin,
		doc: 6500,
		pakan: 16500,
		kandang: 1500,
		karyawan: 2000,
		sellPrice: 34e3
	}

	o.getQty = function (){
		var a = o.ayam.fund + o.ayam.package;
		return Math.ceil(a / baseQty);
	}

	o.totalVar = function (){
		return o.ayam.doc + o.ayam.pakan + o.ayam.kandang + o.ayam.karyawan;
	}

	o.biayaTernak = function() {
		return o.getQty() * o.totalVar();
	}

	o.biayaLain = function (){
		return o.biayaTernak() * backupCost;
	}

	o.laba = function (){
		return o.getQty() * o.ayam.sellPrice - o.biayaTernak() - o.biayaLain()
	}

	o.investorShare = function (){
		return (o.ayam.package / (o.ayam.fund + o.ayam.package)) * 100;
	}

});