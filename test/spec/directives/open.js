'use strict';

describe('Directive: open', function () {
  beforeEach(module('todoApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<open></open>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the open directive');
  }));
});
