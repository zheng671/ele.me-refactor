/// <reference path="../typings/angularjs/angular.d.ts"/>
(function() {
    'use strict';

    angular
        .module('eleme')
        .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {
        $stateProvider
        .state('default', {
            abstract: true,
			url:'',
            templateUrl: 'app/layout/layout.html',
            controller: 'mainController as vm'
        })
        .state('default.store', {
            abstract: true,
			url:'/store',
            templateUrl: 'app/store/store.tab.html',
            controller: 'storeController as vm'
        })
        .state('default.store.index', {
			url:'',
            templateUrl: 'app/store/all/store.nearby.html',
            data: { tab: 'all' }
        })
        .state('default.store.recent', {
			url:'/recent',
            templateUrl: 'app/store/recent/store.recent.html',
            data: { tab: 'recent' }
        })
        .state('default.store.group', {
			url:'/group',
            templateUrl: 'app/store/group/store.group.html',
            data: { tab: 'group' }
        })
        .state('default.store.status', {
			url:'/status',
            templateUrl: 'app/store/status/status.html',
            data: { tab: 'group' }
        });
        $urlRouterProvider.otherwise('/store');
    }
})();
