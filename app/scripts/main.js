// Main JS for Lightbox gallery

(function(document, window) {
  'use strict';

  // Format thumbnails
  function showThumbnails(data) {
    var thumbnails = document.getElementById('thumbnails');

    // For each photo, generate a thumbnail and show on page
    for (var i = 0; i < data.photoset.photo.length; i++) {
      var currentPhoto = data.photoset.photo[i];
      var thumbURL = Flickr.buildThumbnailURL(currentPhoto);

      // Append to a gallery container
      thumbnails.innerHTML = thumbnails.innerHTML + '<li><img src="' + thumbURL + '"/></li>';
    }
  };

  // Initialize page with query
  function init() {
    Flickr.callFlickr();
  }

  window.Main = {
    init: init,
    showThumbnails: showThumbnails
  }
})(document, window);

Main.init();
