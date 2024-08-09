(function() {

var app = angular.module('eleme');

    // Configuring $translateProvider
    app.config(['$translateProvider', function ($translateProvider) {
        
        // Simply register translation table as object hash
        $translateProvider.translations('en_EN', {
            '首页': 'Home Page',
            '品牌餐厅' : 'Feature restaurant',
            '我的饿单': 'My restaurant',
            '积分商城': 'Reward Shop',
            '客服中心': 'Help',
            '手机应用': 'Mobile app',
            '登陆': 'Register',
            '注册' : 'Log In',
            '用户帮助': 'Help center',
            '服务中心': 'Service center',
            '常见问题': 'Q&A',
            '意见反馈': 'Feedback',
            '在线客服': 'Online help',
            '商务合作': 'Business Partner',
            '我要开店': '我要开店',
            '加盟指南': 'Orientation',
            '市场合作': 'Marketing partner',
            '关于我们': 'About us',
            '饿了么介绍': 'About eleme',
            '加入我们': 'Join us',
            '联系我们': 'Contact us',
            '服务协议': 'Term & condition'
        });
    
        $translateProvider.translations('ch_CH', {
            '首页': '首页',
            '品牌餐厅' : '品牌餐厅',
            '我的饿单' : '我的饿单',
            '积分商城': '积分商城',
            '客服中心': '客服中心',
            '手机应用': '手机应用',
            '登陆': '登陆',
            '注册': '注册',
            '用户帮助': '用户帮助',
            '服务中心': '用户帮助',
            '常见问题': '常见问题',
            '意见反馈': '意见反馈',
            '在线客服': '在线客服',
            '商务合作': '商务合作',
            '我要开店': '我要开店',
            '加盟指南': '加盟指南',
            '市场合作': '市场合作',
            '关于我们': '关于我们',
            '饿了么介绍': '饿了么介绍',
            '加入我们': '加入我们',
            '联系我们': '联系我们',
            '服务协议': '服务协议'
        });
            
    	$translateProvider.use('en_EN');
    }]);
})();
