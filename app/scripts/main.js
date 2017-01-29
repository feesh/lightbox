// Main JS for Lightbox gallery

(function(document, window) {
  'use strict';

  var gallery;
  var data;

  function processData(data) {
    data = data;
    setupGallery(data);
  }

  // When data is available, set up the gallery
  function setupGallery(data) {
    gallery = new Gallery(data.photoset.photo);
  }

  // Initialize page with query
  function init() {
    Flickr.callFlickr(processData);

    var prevBtn = document.getElementById('toggleprev');
    var nextBtn = document.getElementById('togglenext');

    prevBtn.addEventListener('click', function(event) {
      event.preventDefault();
      console.log('toggle prev');
      gallery.showPrevious.bind(gallery)();
    });

    nextBtn.addEventListener('click', function(event) {
      event.preventDefault();
      console.log('toggle next');
      gallery.showNext.bind(gallery)();
    });
  }

  window.Main = {
    init: init,
    processData: processData
  }
})(document, window);

Main.init();
