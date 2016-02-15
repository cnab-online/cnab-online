describe('CnabOnlineClient', function() {
  beforeEach(module('app'));

  var cnabOnlineClient;

  beforeEach(inject(function(_cnabOnlineClient_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    cnabOnlineClient = _cnabOnlineClient_;
  }));

  describe('exampleMethod', function() {
    it('works', function() {
      var result = cnabOnlineClient.exampleMethod();
      expect(result).toEqual('an valid result');
    });
  });
});