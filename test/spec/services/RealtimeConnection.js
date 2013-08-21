'use strict';

describe('Service: RealtimeConnection', function () {

  // load the service's module
  beforeEach(module('todoApp'));

  // instantiate service
  var RealtimeConnection;
  beforeEach(inject(function (_RealtimeConnection_) {
    RealtimeConnection = _RealtimeConnection_;
  }));

  it('should do something', function () {
    expect(!!RealtimeConnection).toBe(true);
  });

});
