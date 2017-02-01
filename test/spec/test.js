// Tests for lightbox gallery
// Author: Trish Ang / github.com/feesh
/* global Main:true */
/* global assert:true */

(function () {
  'use strict';

  describe('Initial state', function () {
    describe('Gallery container before initialization', function () {
      it('should be empty', function () {
        assert.equal(document.getElementById('test-gallery').innerHTML, '');
      });
    });

    beforeEach(function(done) {
      setTimeout(function() {
        done();
      }, 1500);
    });

    describe('Gallery container upon initialization', function () {
      it('initializes the gallery', function (done) {
        setTimeout(function () {
          Main.init('test-gallery');
        }, 50);
        done();
      });
      it('should have a header', function () {
        // Find the header
        assert.ok(document.getElementById('header'));
      });
      it('should have a content container', function () {
        // Find the content element
        assert.ok(document.getElementById('content'));
      });
      it('should have a lightbox container', function () {
        // Find the lightbox element
        assert.ok(document.getElementById('lightbox'));
      });
      it('should have an overlay container', function () {
        // Find the overlay element
        assert.ok(document.getElementById('overlay'));
      });
      it('should not have more than one content container', function () {
        // Check that multiple content divs weren't created
        assert.operator(document.querySelectorAll('#content').length, '<', 2);
      });
      it('should load thumbnails if successful', function () {
        // Make sure thumbnails list is not empty
        assert.operator(document.querySelectorAll('#thumbnails li').length, '>', 0);
      });
    });

    describe('Lightbox interaction', function () {
      it('should have selectable thumbnails', function () {
        // Find ul#thumbnails > li:first-child > a
        var testLink = document.getElementById('photo-1');
        console.log(testLink);
        testLink.click();
        assert.ok(testLink);
      });
      it('should show the lightbox when clicked', function () {
        // Click thumbnail and check for visible class on lightbox
        assert.equal(document.getElementById('lightbox').className, 'modal visible');
      });
      it('should show the overlay when clicked', function () {
        // Click thumbnail and check for visible class on overlay
        assert.equal(document.getElementById('overlay').className, 'overlay visible');
      });
      it('should show the next image when right arrow clicked', function () {
        // Click next link and check for a different image
        var nextLink = document.getElementById('togglenext');
        var firstImage = document.querySelector('.lightbox-photo img');

        // Navigate
        nextLink.click();
        var secondImage = document.querySelector('.lightbox-photo img');
        assert.not.equal(firstImage, secondImage);
      });
      it('should show the next image when right key pressed', function () {
        // Click next link and check for a different image
        var nextLink = document.getElementById('togglenext');
        var firstImage = document.querySelector('.lightbox-photo img');

        // Navigate
        nextLink.click();
        var secondImage = document.querySelector('.lightbox-photo img');
        assert.not.equal(firstImage, secondImage);
      });
      it('should hide overlay and lightbox when close is clicked', function () {
        // Click close button then check for 'visible' on overlay and lightbox
        var closeBtn = document.getElementById('toggleclose');
        closeBtn.click();
        assert.not.equal(document.getElementById('lightbox').className, 'modal visible');
        assert.not.equal(document.getElementById('overlay').className, 'overlay visible');
      });
    });

    describe('New search functionality', function () {
      it('should return nothing if the searchbox is empty and submitted', function () {

        // Click the search button and check contents of #content
        var searchBtn = document.getElementById('searchbtn');
        var searchBox = document.getElementById('searchbox');

        searchBox.value = '';
        searchBtn.click();
        assert.equal(document.querySelectorAll('#thumbnails li').length, 0);
        assert.ok(document.querySelector('.content.error'));
      });
      it('should update the title after a search', function () {
        // Check that title text equals search text after submitting
        var newSearchText = 'shark week';
        var searchTitle = document.getElementById('searchtitle');
        var searchBtn = document.getElementById('searchbtn');
        var searchBox = document.getElementById('searchbox');

        searchBox.value = newSearchText;
        searchBtn.click();

        assert.equal(searchTitle.innerHTML, newSearchText);
      });
      it('should load photos after submitting search', function () {
        // Check that content is not empty, although how to check if it's not the old array?
        assert.operator(document.querySelectorAll('#thumbnails li').length, '>', 0);
      });
      it('should not have more than one content container', function () {
        // Check that the old content div was cleared out
        assert.operator(document.querySelectorAll('#content').length, '<', 2);
      });
    });
  });

})();
