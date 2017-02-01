'use strict';

// Gallery functions
// Author: Trish Ang / github.com/feesh
/* global Flickr:true */

(function (document, window) {
  'use strict';

  var lightbox;
  var overlay;

  // Set up gallery with ref to photos and DOM
  function Gallery(photos, element) {
    this.currentIndex = 0;
    this.container = element;
    this.photos = photos;

    // Initialize by showing the thumbs
    this.setupThumbnails();

    // Attach containers for overlay and lightbox
    this.setupOverlay();
    this.setupLightbox();
  }

  // Reset gallery content
  Gallery.prototype.resetGallery = function () {
    var content = document.getElementById('content');
    lightbox.parentNode.removeChild(lightbox);
    overlay.parentNode.removeChild(overlay);
    content.parentNode.removeChild(content);
  };

  // Set up overlay
  Gallery.prototype.setupOverlay = function () {
    overlay = document.createElement('div');
    overlay.className = 'overlay';
    overlay.id = 'overlay';
    overlay.title = 'Click anywhere to close';
    this.container.appendChild(overlay);
  };

  // Set up lightbox
  Gallery.prototype.setupLightbox = function () {

    // Close button
    var closeBtn = document.createElement('a');
    closeBtn.href = '';
    closeBtn.id = 'toggleclose';
    closeBtn.title = 'Close lightbox';
    closeBtn.alt = 'Close button for lightbox';
    closeBtn.className = 'iconbtn close';
    closeBtn.innerHTML = '<i class="fa fa-close fa-2x"></i>';

    // Prev button
    var prevBtn = document.createElement('a');
    prevBtn.href = '';
    prevBtn.id = 'toggleprev';
    prevBtn.title = 'View previous photo';
    prevBtn.alt = 'View previous photo';
    prevBtn.className = 'iconbtn prev';
    prevBtn.innerHTML = '<i class="fa fa-chevron-left fa-2x"></i>';

    // Next button
    var nextBtn = document.createElement('a');
    nextBtn.href = '';
    nextBtn.id = 'togglenext';
    nextBtn.title = 'View next photo';
    nextBtn.alt = 'View next photo';
    nextBtn.className = 'iconbtn next';
    nextBtn.innerHTML = '<i class="fa fa-chevron-right fa-2x"></i>';

    // Lightboxed photo
    var lightboxPhoto = document.createElement('div');
    lightboxPhoto.className = 'lightbox-photo';
    lightboxPhoto.id = 'currentphoto';

    // Photo container
    var photoContainer = document.createElement('div');
    photoContainer.className = 'photo-container';
    photoContainer.appendChild(prevBtn);
    photoContainer.appendChild(lightboxPhoto);
    photoContainer.appendChild(nextBtn);

    // Lightbox container
    lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.className = 'modal';
    lightbox.appendChild(closeBtn);
    lightbox.appendChild(photoContainer);
    this.container.appendChild(lightbox);
  };

  // Show the current photo
  Gallery.prototype.showPhoto = function (index) {
    // Make lightbox visible if it's not
    lightbox.classList.add('visible');
    overlay.classList.add('visible');

    if (index >= 0 && index < this.photos.length) {
      this.currentIndex = index;

      var container = document.getElementById('currentphoto');
      var currentPhoto = this.photos[this.currentIndex];
      var imgURL = Flickr.buildPhotoURL(currentPhoto);
      var orientation = this.checkOrientation(currentPhoto);

      // Display current image in display area
      container.innerHTML = '<figure class="' + orientation + '"><img src="' + imgURL + '" /><figcaption>' + currentPhoto.title + '</figcaption></figure>';
    }
  };

  // Check photo orientation
  Gallery.prototype.checkOrientation = function (photo) {
    var height = photo.height_m;
    var width = photo.width_m;

    if (height > width) {
      return 'portrait';
    } else if (width > height) {
      return 'landscape';
    } else {
      return 'square';
    }
  };

  // Close lightbox
  Gallery.prototype.closeLightbox = function () {
    lightbox.classList.remove('visible');
    overlay.classList.remove('visible');
  };

  // Show the previous photo
  Gallery.prototype.showPrevious = function () {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      // Currently at the start, so show the last photo
      this.currentIndex = this.photos.length - 1;
    }

    this.showPhoto(this.currentIndex);
  };

  // Show the next photo
  Gallery.prototype.showNext = function () {
    if (this.currentIndex < this.photos.length - 1) {
      this.currentIndex++;
    } else {
      // Currently at the end, so show the first photo
      this.currentIndex = 0;
    }

    this.showPhoto(this.currentIndex);
  };

  // Format thumbnails
  Gallery.prototype.setupThumbnails = function () {
    function handleClick(index, gallery) {
      return function (event) {
        event.preventDefault();

        gallery.showPhoto(index);
      };
    }

    // Generate HTML for thumbnails and add to DOM
    var thumbnails = document.createElement('ul');
    thumbnails.className = 'thumbnails';
    thumbnails.id = 'thumbnails';

    var thumbnailsContainer = document.createElement('div');
    thumbnailsContainer.className = 'content';
    thumbnailsContainer.id = 'content';
    thumbnailsContainer.appendChild(thumbnails);
    this.container.appendChild(thumbnailsContainer);

    // For each photo, generate a thumbnail and show on page
    for (var i = 0; i < this.photos.length; i++) {
      var currentPhoto = this.photos[i];
      var thumbURL = Flickr.buildThumbnailURL(currentPhoto);
      var orientation = this.checkOrientation(currentPhoto);
      var img, link, li;

      // Set up image
      img = document.createElement('img');
      img.src = thumbURL;

      // Set up link for triggering show photo
      link = document.createElement('a');
      link.href = img.src;
      link.appendChild(img);

      // Set up li
      li = document.createElement('li');
      li.className = 'thumbnail ' + orientation;
      li.addEventListener('click', handleClick(i, this));
      li.appendChild(link);

      // Append to a gallery container
      thumbnails.appendChild(li);
    }
  };

  window.Gallery = Gallery;
})(document, window);
//# sourceMappingURL=gallery.js.map

'use strict';

// Flickr utilities
// Author: Trish Ang / github.com/feesh
/* global Main:true */

(function (document, window) {
  'use strict';

  var apiKey = 'e0bc054b3d94fd9c1f91199ef47ae646';

  // API call for Flickr
  function callFlickr(processData, search, container) {
    var searchText = search;
    var apiMethod = 'flickr.photos.search';
    var extras = 'url_m,owner_name,views,geo,date_taken';
    var perPage = 33;

    var url = 'https://api.flickr.com/services/rest/?&method=' + apiMethod + '&api_key=' + apiKey + '&text=' + searchText + '&per_page=' + perPage + '&format=json&nojsoncallback=1&extras=' + extras;

    var request = new XMLHttpRequest();
    request.open('GET', url, true);

    request.onload = function () {
      if (this.status >= 200 && this.status < 400) {
        var data = JSON.parse(this.response);
        if (data.stat === 'ok') {
          // Success!
          // Preload images as soon as we get a response
          for (var i = 0; i < data.photos.photo.length; i++) {
            var thumbURL = buildThumbnailURL(data.photos.photo[i]);
            var photoURL = buildPhotoURL(data.photos.photo[i]);
            preloadImage(thumbURL);
            preloadImage(photoURL);
          }

          Main.processData(data, container);
        } else {
          // We reached the server, but it returned an API error
          Main.displayError(container);
        }
      } else {
        // We reached the server, but it returned an error
        Main.displayError(container);
      }
    };

    request.onerror = function () {
      // There was a connection error
      Main.displayError(container);
    };

    request.send();
  }

  // Preload images to speed up transitions
  function preloadImage(url) {
    var image = new Image();
    image.src = url;
  }

  // Utilities for working with Flickr image URLs
  // Docs: https://www.flickr.com/services/api/misc.urls.html
  function buildThumbnailURL(photo) {
    // Thumbnail format: https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg
    return 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '.jpg';
  }

  function buildPhotoURL(photo) {
    // Photo format: https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}_c.jpg
    return 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '_c.jpg';
  }

  window.Flickr = {
    callFlickr: callFlickr,
    buildThumbnailURL: buildThumbnailURL,
    buildPhotoURL: buildPhotoURL
  };
})(document, window);
//# sourceMappingURL=flickr.js.map
//# sourceMappingURL=flickr.js.map

'use strict';

// Main JS for Lightbox gallery
// Author: Trish Ang / github.com/feesh
/* global Main:true */
/* global Flickr:true */
/* global Gallery:true */

(function (document, window) {
  'use strict';

  var gallery;
  var galleryContainer;
  var searchBox = document.getElementById('searchbox');
  var searchBtn = document.getElementById('searchbtn');

  // Event listeners for the lightbox
  function setupLightboxNav() {
    // Set up buttons
    var prevBtn = document.getElementById('toggleprev');
    var nextBtn = document.getElementById('togglenext');
    var closeBtn = document.getElementById('toggleclose');
    var overlay = document.getElementById('overlay');

    // Activate previous button
    prevBtn.addEventListener('click', function (event) {
      event.preventDefault();
      gallery.showPrevious.bind(gallery)();
    });

    // Activate next button
    nextBtn.addEventListener('click', function (event) {
      event.preventDefault();
      gallery.showNext.bind(gallery)();
    });

    // Activate close button
    closeBtn.addEventListener('click', function (event) {
      event.preventDefault();
      gallery.closeLightbox();
    });

    // Close lightbox when clicking on the overlay also
    overlay.addEventListener('click', function (event) {
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
        e.preventDefault();
        newSearch(galleryContainer);
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
    var searchText = searchBox.value;
    Flickr.callFlickr(processData, searchText, container);

    // Update title
    var title = document.getElementById('searchtitle');
    title.innerHTML = searchText;
  }

  // Initialize page with query
  function init(container) {
    galleryContainer = container;

    Flickr.callFlickr(processData, 'nobannowall', galleryContainer);

    // Add function to activate search box
    searchBtn.addEventListener('click', function (event) {
      event.preventDefault();
      newSearch(galleryContainer);
    });
  }

  window.Main = {
    init: init,
    processData: processData,
    displayError: displayError
  };
})(document, window);

Main.init('ui-gallery');
//# sourceMappingURL=main.js.map
