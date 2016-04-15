'use strict';

angular.module('app')

.controller('SimulasiDombaCtrl', function($scope, $filter) {
	var inv = [], 
		opsi = 20,
		investMin = 1.75e6,
		backupCost = 0.1,
		pemeliharaan = 12;

	for (var i = 1; i<=opsi; i++){
		inv.push(i * investMin);
	}

	var o = $scope;
	o.domba = {
		fund: 14e6,
		packages: inv,
		package: investMin,
		indukan: 1e6,
		pakan: 30e3,
		kandang: 15e3,
		sellPriceIndukan: 1.6e6,
		sellPriceAnak: 0.8e6,
		pemeliharaan: pemeliharaan
	}

	o.getQty = function (){
		return Math.ceil(o.domba.package / investMin);
	}

	o.totalVar = function (){
		return o.domba.indukan + (o.domba.pakan + o.domba.kandang) * pemeliharaan + (o.domba.pakan + o.domba.kandang) * pemeliharaan / 3;
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
		return (o.domba.package / (o.domba.fund + o.domba.package)) * 100;
	}

	o.getPendapatan = function (){
		return o.getQty() * o.domba.sellPriceIndukan + o.getQty() * 2 * o.domba.sellPriceAnak;
	}

	o.getPendapatanSt = function (){
		var r = o.getQty() + ' x ' + $filter('number')(o.domba.sellPriceIndukan, 0);
		r += " + ";
		r += o.getQty() * 2 + ' x ' + $filter('number')(o.domba.sellPriceAnak, 0);
		return r;
	}

});