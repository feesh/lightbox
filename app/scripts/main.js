// Main JS for Lightbox gallery

(function(document, window) {
  'use strict';

  // Initialize page with query
  function init() {
    Flickr.callFlickr();
  }

  window.Main = {
    init: init
  }
})(document, window);

Main.init();
