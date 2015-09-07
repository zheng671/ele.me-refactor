(function(){
	'use strict';
	angular
		.module('eleme')
		.controller('storeController', storeController);
		
	storeController.$inject = ['$rootScope', 'socket'];
		
	function storeController($rootScope, socket){
		var vm = this;
		
		vm.randomFloat = randomFloat;
		vm.randomInt = randomInt;
		vm.randomBool = randomBool;
		vm.randomFeatures = randomFeatures;
		vm.spliceArray = spliceArray;
		vm.addRecent = addRecent;
		vm.openPopover = openPopover;
		vm.closePopover = closePopover;
		vm.onStatusChange = onStatusChange;
		
		/*
		 * constant
		 */
		var numOfStore = 100;
		var numOfFeatureStores = 20;
		var numOfCategory = 5;
		var numOfSubCategory = 10;
		var features = [
			{ type: 1, abbr: '减', name: '下单立减', desc: '在线支付满20减8，满40减18，满60减30', isPromo: true, color: 'purple' },
			{ type: 2, abbr: '首', name: '新用户优惠', desc: '(不与其他活动同享)新用户下单立减15元', isPromo: true, color: 'green' },
			{ type: 3, abbr: '限', name: '限时优惠', desc: '10点前预定减2', isPromo: true, color: 'orange' },
			{ type: 4, abbr: '新', name: '新店开张', desc: '新店开张，欢迎光临', isPromo: false, color: 'red' },
			{ type: 5, abbr: '付', name: '在线支付', desc: '可使用支付宝、微信、手机QQ进行在线支付', isPromo: false, color: 'green' },
			{ type: 6, abbr: '票', name: '可开发票', desc: '该餐厅支持开发票，开票订单金额50元起，请在下单时填写好发票抬头', isPromo: false, color: 'violet' },
			{ type: 7, abbr: '陪', name: '超时赔付', desc: '该餐厅参加超时赔付活动，超50分钟9折。此活动对象仅为交大宿舍楼，雨天不参加超时赔付。', isPromo: false, color: 'blue' }
		];
		
		/*
		 * Socket
		 */
		socket.on('test', function (data) {
	    	changeStatus(data.id, data.status);
		});
		
		/*
		 * Initilize dummy data
		 */
		vm.stores = randomStores(numOfStore);
		vm.feature_stores = vm.stores.splice(0, numOfFeatureStores);
		vm.categories = randomCategories();
		vm.features = features;
		/*
		 * Random Function
		 */
		function randomFloat(i, digit){
			digit = digit || 0;
			return (Math.random() * i).toFixed(digit);
		}
		
		function randomInt(i, step){
			step = step || 1;
			return (Math.floor((Math.random() * (i / step))) + 1) * step;
		}
		
		function randomBool(){
			return Math.random() > 0.5 ? false : true;
		}
		
		function randomArray(maxIndex){
			var array = [];
			var num = randomInt(maxIndex);
			for(var i = 0; i < num; i++){
				array.push(randomInt(maxIndex));
			}
			return array;
		}
		
		function randomTime(){
			return randomInt(23) + ':' + randomInt(30, 30);
		}
		
		function randomFeatures(){
			var rp = [];
			var ra = randomArray(features.length - 1);
			ra.forEach(function(index){
				if(rp.indexOf(features[index]) < 0){
					rp.push(features[index]);
				}
			})
			return rp;
		}
		
		function randomStores(num){
			var stores = [];
			for(var i = 0; i < num; i++){
				var store = {
					id: i,
					name: '餐馆' + i,
					image: '//fuss10.elemecdn.com/d/26/35070e4025a7049c08e658233c79djpeg.jpeg?imageMogr2/thumbnail/70x70/format/webp/quality/85',
					features: randomFeatures(),
					monthly_sales: randomInt(5000),
					rating: randomFloat(5, 2),
					delivery_time: randomInt(60, 10),
					start_delivery_time: randomTime(),
					min_amount: randomInt(20, 5),
					delivery_fee: randomInt(5,5),
					verify_type: randomInt(2),
					status: randomInt(4), // 1: open, 2: close, 3: busy, 4: reserve
					category: randomInt(numOfCategory) * 100 + randomInt(numOfSubCategory),
					is_time_ensure: randomBool(),
					is_support_invoice: randomBool(),
					is_online_payment: randomBool(),
					notification: '交大满10元起送( 华师大30元、紫竹满30元起送）只送到楼下（敬请谅解)   (注意：本店00:00以后满100起送，下单后请电话提示）'
				};
				stores.push(store);
			}
			return stores;
		}
		
		function randomCategories(){
			var categories = [];
			for(var i = 0; i < numOfCategory; i++){
				var category = {id: i, name: 'category' + i, subCategories: []};
				var randomSubcategory = randomInt(numOfSubCategory);
				for(var j = 0; j< randomSubcategory; j++){
					var subCategory = {id: i * 100 + j, name: 'category' + i + '-' + j};
					category.subCategories.push(subCategory);
				}
				categories.push(category);
			}
			return categories;
		}
		
		// Utility Function
		function spliceArray(array, n){
			if(array.length > n){
				return array.splice(n);
			} else {
				return array;
			}
		}
		function addRecent(store) {
			if(!$rootScope.recents){
				$rootScope.recents = [];
			}
			$rootScope.recents.push(store);
		}
		function openPopover(id, $event) {
			var coordinate = GetScreenCordinates(document.querySelector('#store-block-' + id));
			var element = angular.element(document.querySelector('#store-popover-' + id));
			element.addClass('active');
			var screenWidth = document.getElementsByTagName("body")[0].offsetWidth;
			if(coordinate.right > screenWidth - 300){
				if(coordinate.left < 300){
					// Bottom popover
					element.css('left', coordinate.left + 'px');
					element.css('top', coordinate.bottom + 'px');
					element.addClass('bottom');
				} else {
					// left popover
					element.css('right', coordinate.left + 'px');
					element.css('top', coordinate.top + 'px');
					element.addClass('left');
				}
			} else {
				// right popover
				element.css('left', coordinate.right + 'px');
				element.css('top', coordinate.top + 'px');
				element.addClass('right');				
			}
		}
		function closePopover(id, $event) {
			angular.element(document.querySelector('#store-popover-' + id)).removeClass('active left right top bottom');
		}
		function GetScreenCordinates(obj) {
	        var p = {};
			var width = obj.offsetWidth;
			var height = obj.offsetHeight;
	        p.left = obj.offsetLeft;
	        p.top = obj.offsetTop;
	        while (obj.offsetParent) {
	            p.left = p.left + obj.offsetParent.offsetLeft;
	            p.top = p.top + obj.offsetParent.offsetTop;
	            if (obj == document.getElementsByTagName("body")[0]) {
	                break;
	            }
	            else {
	                obj = obj.offsetParent;
	            }
	        }
			p.right = p.left + width;
			p.bottom = p.top + height;
	        return p;
	    }
		function changeStatus(id, newStatus) {
			var store = {};
			for (var i = 0; i < vm.stores.length; i++) {
				if (vm.stores[i].id == id) {
					store = vm.stores[i];
					vm.stores[i].status = newStatus;
					break;
				}
		    }
			for (var i = 0; i < vm.feature_stores.length; i++) {
				if (vm.feature_stores[i].id == id) {
					store = vm.feature_stores[i];
					vm.feature_stores[i].status = newStatus;
					break;
				}
		    }
			//toastr.warning(store.name + ' changed');
		}
		function onStatusChange(id, newStatus){
			socket.emit('store:statuschange', {
		        id: id,
				status: newStatus
		    });
		}
	}
})();