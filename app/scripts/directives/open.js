'use strict';

angular.module('todoApp')
    .directive('open', function () {
        return {
            restrict: 'A',
            link: function postLink(scope, element, attrs) {
                var selector = attrs["open"];
                element.bind("click", function () {
                    angular.element(selector).toggleClass("open");
                });
            }
        };
    });
