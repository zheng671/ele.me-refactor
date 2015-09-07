(function () {
    'use strict';

    var app = angular.module('eleme', ['ui.router', 'pascalprecht.translate', 'ngTouch']);
    apprun.$inject = ['$rootScope'];
    app.run(apprun);
    
    // Demonstrate how to register services
// In this case it is a simple value service.
    app.factory('socket', function ($rootScope) {
      var socket = io.connect();
      return {
        on: function (eventName, callback) {
          socket.on(eventName, function () {  
            var args = arguments;
            $rootScope.$apply(function () {
              callback.apply(socket, args);
            });
          });
        },
        emit: function (eventName, data, callback) {
          socket.emit(eventName, data, function () {
            var args = arguments;
            $rootScope.$apply(function () {
              if (callback) {
                callback.apply(socket, args);
              }
            });
          });
        }
      };
    });

    function apprun($rootScope) {
        $rootScope.year = new Date().getFullYear();
        $rootScope.footerLinks = [{ 
                title: '用户帮助',
                options: [
                    { name: '服务中心', link: 'www.eleme.com' },
                    { name: '常见问题', link: 'www.eleme.com' },
                    { name: '意见反馈', link: 'www.eleme.com' },
                    { name: '在线客服', link: 'www.eleme.com' },
                ]
            }, { 
                title: '商务合作', 
                options: [
                    { name: '我要开店', link: 'www.eleme.com' },
                    { name: '加盟指南', link: 'www.eleme.com' },
                    { name: '市场合作', link: 'www.eleme.com' },
                ]
            }, { 
                title: '关于我们', 
                options: [
                    { name: '饿了么介绍', link: 'www.eleme.com' },
                    { name: '加入我们', link: 'www.eleme.com' },
                    { name: '联系我们', link: 'www.eleme.com' },
                    { name: '服务协议', link: 'www.eleme.com' },
                ]
            }
        ];
    }
})();