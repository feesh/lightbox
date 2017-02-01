// Main JS for Lightbox gallery
// Author: Trish Ang / github.com/feesh
/* global Main:true */
/* global Flickr:true */
/* global Gallery:true */

(function(document, window) {
  'use strict';

  var gallery;
  var galleryContainer;
  var searchBox;
  var searchBtn;
  var searchText = '#NoBanNoWall'; // initial search term

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
      gallery.showPrevious.bind(gallery)();
    });

    // Activate next button
    nextBtn.addEventListener('click', function(event) {
      event.preventDefault();
      gallery.showNext.bind(gallery)();
    });

    // Activate close button
    closeBtn.addEventListener('click', function(event) {
      event.preventDefault();
      gallery.closeLightbox();
    });

    // Close lightbox when clicking on the overlay also
    overlay.addEventListener('click', function(event) {
      event.preventDefault();
      gallery.closeLightbox();
    });
  }

  // Event listener for key presses
  function setupKeyCheck() {
    function checkKey(e) {
      e = e || window.event;

      if (e.keyCode === 37) {
        // left arrow toggle previous
        gallery.showPrevious.bind(gallery)();
      } else if (e.keyCode === 39) {
        // right arrow toggle next
        gallery.showNext.bind(gallery)();
      } else if (e.keyCode === 27) {
        // esc key exit lightbox
        gallery.closeLightbox();
      } else if (e.keyCode === 13) {
        // enter key
        if (searchBox === document.activeElement) {
          e.preventDefault();
          newSearch(galleryContainer);
        }
      }
    }

    // Set up key press checks
    document.onkeydown = checkKey;
  }

  // Add header content to top of gallery
  function setupHeader(target) {
    // Title
    var title = document.createElement('h1');
    title.id = 'searchtitle';
    title.innerHTML = searchText;

    // Search box
    searchBox = document.createElement('input');
    searchBox.type = 'text';
    searchBox.id = 'searchbox';
    searchBox.placeholder = 'Search here';

    searchBtn = document.createElement('a');
    searchBtn.className = 'btn submit';
    searchBtn.id = 'searchbtn';
    searchBtn.alt = 'Submit search';
    searchBtn.title = 'Submit search';
    searchBtn.innerHTML = 'Search';

    // Add function to activate search box
    searchBtn.addEventListener('click', function(event) {
      event.preventDefault();
      newSearch(galleryContainer);
    });

    var searchform = document.createElement('div');
    searchform.className = 'searchform';
    searchform.appendChild(searchBox);
    searchform.appendChild(searchBtn);

    // Containers
    var content = document.createElement('div');
    content.className = 'content';
    content.appendChild(title);
    content.appendChild(searchform);

    var header = document.createElement('header');
    header.appendChild(content);
    header.id = 'header';

    var container = document.getElementById(target);
    target.appendChild(header);
  }

  // When data is available, set up the gallery
  function setupGallery(data, target) {
    var container = document.getElementById(target);
    var header = document.getElementById('header');

    // Only set up the header the first time
    if (!header) {
      setupHeader(container);
    }

    gallery = new Gallery(data.photos.photo, container);

    // Set up handlers
    setupLightboxNav();
    setupKeyCheck();
  }

  // Once data is received, set up gallery
  function processData(data, container) {
    setupGallery(data, container);
  }

  // Display error message
  function displayError(target) {
    var container = document.getElementById(target);

    // Heading for error message
    var errorMsg = document.createElement('h3');
    errorMsg.innerHTML = 'Unfortunately, no photos are available at this time, please try again.';
    errorMsg.className = 'err-message';

    // Image for error page
    var errorImg = document.createElement('img');
    errorImg.src = 'https://media3.giphy.com/media/MJTOHmGiGPHgI/200.gif#6';
    errorImg.alt = 'Beemo search fail';
    errorImg.className = 'err-img';

    // Retry button
    var retryBtn = document.createElement('a');
    retryBtn.href = '/';
    retryBtn.alt = 'Click here to reload the gallery';
    retryBtn.title = 'Click here to reload the gallery';
    retryBtn.innerHTML = 'Try again';
    retryBtn.className = 'btn err-btn';

    // Content container
    var contentContainer = document.createElement('div');
    contentContainer.className = 'content error';
    contentContainer.appendChild(errorImg);
    contentContainer.appendChild(errorMsg);
    contentContainer.appendChild(retryBtn);
    container.appendChild(contentContainer);
  }

  // Trigger a new search
  function newSearch(container) {
    // Delete existing thumbs
    gallery.resetGallery();

    // Submit new search
    var newSearchText = searchBox.value;
    Flickr.callFlickr(processData, newSearchText, container);
    searchBox.value = '';

    // Update title
    var title = document.getElementById('searchtitle');
    title.innerHTML = newSearchText;
  }

  // Initialize page with query
  function init(container) {
    galleryContainer = container;

    Flickr.callFlickr(processData, searchText, galleryContainer);
  }

  window.Main = {
    init: init,
    processData: processData,
    displayError: displayError
  };
})(document, window);
