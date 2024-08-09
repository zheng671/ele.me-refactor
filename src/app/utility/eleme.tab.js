(function () {
    'use strict';

    angular
        .module('eleme')
        .directive('elemeTab', elemeTab);

    elemeTab.$inject = ['$rootScope'];

    function elemeTab($rootScope) {
        return {
            link: function (scope, element, attrs) {
                var listener = function (event, toState, toParams, fromState, fromParams) {
    				if(attrs.elemeTab == toState.data.tab){
    					element.addClass('active');
    				} else {
    					element.removeClass('active');
    				}
                };
                $rootScope.$on('$stateChangeStart', listener);
            }
        };
    };
})();