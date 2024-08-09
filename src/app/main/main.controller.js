(function () {
	'use restrict';
	
	angular.module('eleme')
		.controller('mainController', mainController);
		
	mainController.$inject = ['$window', '$translate'];
		
	function mainController($window, $translate) {
		var vm = this;
		vm.openApp = openApp;
		vm.switchLanguage = switchLanguage;
		vm.images = [
			'//fuss2.ele.me/5/89/ab19ea64b6ba5d4d52b7f2fb0b0f9gif.gif?imageMogr2/format/webp/quality/85',
			'//fuss2.ele.me/d/aa/10ea2f228dce4ef61c56c52ae5f9agif.gif?imageMogr2/format/webp/quality/85',
			'//fuss2.ele.me/9/3e/21c6199b1fe36f7d04e6df4d30e84gif.gif?imageMogr2/format/webp/quality/85'
		];
		
		function openApp() {
	        var user_agent_header = navigator.userAgent;
	
	        if(user_agent_header.indexOf('iPhone')!=-1 || user_agent_header.indexOf('iPod')!=-1 || user_agent_header.indexOf('iPad')!=-1){
	            setTimeout(function() { $window.location.href="myApp://www.myapp.com";}, 25);
	        } else {
				
			}
		}
		
		function switchLanguage(lang){
			$translate.use(lang);
		}
	}
})();