// Main JS for Lightbox gallery

(function(document, window) {
  'use strict';

  var gallery;

  // When data is available, set up the gallery
  function setupGallery(data) {
    gallery = new Gallery(data.photos.photo);
  }

  function processData(data) {
    setupGallery(data);
  }

  // Initialize page with query
  function init() {
    Flickr.callFlickr(processData);

    // Set up buttons
    var prevBtn = document.getElementById('toggleprev');
    var nextBtn = document.getElementById('togglenext');
    var closeBtn = document.getElementById('toggleclose');
    var overlay = document.getElementById('overlay');

    // Activate previous button
    prevBtn.addEventListener('click', function(event) {
      event.preventDefault();
      console.log('toggle prev');
      gallery.showPrevious.bind(gallery)();
    });

    // Activate next button
    nextBtn.addEventListener('click', function(event) {
      event.preventDefault();
      console.log('toggle next');
      gallery.showNext.bind(gallery)();
    });

    // Activate close button
    closeBtn.addEventListener('click', function(event) {
      event.preventDefault();
      console.log('toggle close');
      gallery.closeLightbox();
    });

    // Close lightbox when clicking on the overlay also
    overlay.addEventListener('click', function(event) {
      event.preventDefault();
      console.log('toggle close');
      gallery.closeLightbox();
    });

    // Set up keydown checks
    document.onkeydown = checkKey;

    function checkKey(e) {
      e = e || window.event;

      if (e.keyCode == '37') {
        // left arrow
        console.log('toggle prev with key');
        gallery.showPrevious.bind(gallery)();
      } else if (e.keyCode == '39') {
        // right arrow
        console.log('toggle next with key');
        gallery.showNext.bind(gallery)();
      } else if (e.keyCode == '27') {
        // esc key
        console.log('exit lightbox with key');
        gallery.closeLightbox();
      }
    }
  }

  window.Main = {
    init: init,
    processData: processData
  };
})(document, window);

Main.init();
