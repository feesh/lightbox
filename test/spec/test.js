(function () {
  'use strict';

  describe('Initial state', function () {
    describe('Gallery container before initialization', function () {
      it('should be empty', function () {
        assert.equal(document.getElementById('test-gallery').innerHTML, '');
      });
    });
    describe('Gallery container upon initialization', function () {

      // Main.init('test-gallery', function () {
      //   it('should have a header', function () {
      //     assert.ok(document.getElementById('header'));
      //   });
      //   it('should have a content container', function () {
      //     assert.ok(document.getElementById('content'));
      //   });
      //   it('should have a lightbox container', function () {
      //     assert.ok(document.getElementById('lightbox'));
      //   });
      //   it('should have an overlay container', function () {
      //     assert.ok(document.getElementById('overlay'));
      //   });
      //   done();
      // });
    });
  });

})();
