// Main JS for Lightbox gallery

(function(document, window) {
  'use strict';

  var gallery;

  // Event listeners for the lightbox
  function setupLightboxNav() {
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
  }

  // Event listener for key presses
  function setupKeyCheck() {
    function checkKey(e) {
      e = e || window.event;

      if (e.keyCode === '37') {
        // left arrow toggle previous
        gallery.showPrevious.bind(gallery)();
      } else if (e.keyCode === '39') {
        // right arrow toggle next
        gallery.showNext.bind(gallery)();
      } else if (e.keyCode === '27') {
        // esc key exit lightbox
        gallery.closeLightbox();
      }
    }

    // Set up key press checks
    document.onkeydown = checkKey;
  }

  // When data is available, set up the gallery
  function setupGallery(data, target) {
    var container = document.getElementById(target);
    gallery = new Gallery(data.photos.photo, container);

    // Set up handlers
    setupLightboxNav();
    setupKeyCheck();
  }

  // Once data is received, set up gallery
  function processData(data, container) {
    setupGallery(data, container);
  }

  // Initialize page with query
  function init(container) {
    Flickr.callFlickr(processData, container);
  }

  window.Main = {
    init: init,
    processData: processData
  };
})(document, window);

Main.init('ui-gallery');
