(function () {
    'use strict';

    angular
        .module('eleme')
        .directive('elemeSlider', elemeSlider);

    elemeSlider.$inject = ['$timeout'];

    function elemeSlider($timeout) {
        return {
            scope: {
                elemeSlider: '=',
                elemeSliderImage: '='
            },
            template:'\
            <div class="slider-inner">\
                <img ng-swipe-right="elemeSlider = previousImage(elemeSlider, elemeSliderImage.length)" ng-swipe-left="nextImage(elemeSlider, elemeSliderImage.length)" ng-src="{{image}}" ng-class="{active: elemeSlider == $index}" ng-repeat="image in elemeSliderImage"/>\
            </div>\
            <div class="slider-caption">\
                <span ng-class="{active:$parent.elemeSlider == $index}" ng-click="$parent.elemeSlider = $index" ng-repeat="image in elemeSliderImage">{{$index + 1}}</span>\
            </div>\
            <a class="slider-left" ng-click="elemeSlider = previousImage(elemeSlider, elemeSliderImage.length)"></a>\
            <a class="slider-right" ng-click="elemeSlider = nextImage(elemeSlider, elemeSliderImage.length)"></a>',
            link: function (scope, element, attrs) {
                scope.elemeSlider = 0;
                scope.nextImage = nextImage;
                scope.previousImage = previousImage;
                scope.$watch('elemeSlider', function () {
                    var current = scope.elemeSlider;
                    var max = scope.elemeSliderImage.length;
                    if(scope.timer){
                        $timeout.cancel(scope.timer);
                    }
                    scope.timer = $timeout(function () {
                        scope.elemeSlider = nextImage(current, max);
                    }, 5000);
                });
            }
        };
        
        function nextImage(current, max) {
            if(current < max - 1){
                current++;
            } else {
                current = 0;
            }
            return current;
        }
        function previousImage(current, max) {
            if(current - 1 < 0){
                current = max - 1;
            } else {
                current--;
            }
            return current;
        }
    };
})();