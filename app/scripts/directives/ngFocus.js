'use strict';

angular.module('todoApp')
    .directive('ngFocus', function ($timeout) {
        return {
            restrict: 'A',
            link: function postLink(scope, element, attrs) {
                scope.$watch(attrs.ngShow, function (newValue) {
                    if (newValue) {
                        $timeout(function () {
                            element.on('focus', function() {
                                var value = element.val();
                                element.val('');
                                element.val(value);
                                element.off("focus");
                            });
                            element[0].focus();
                        });
                    }
                });
            }
        };
    });
