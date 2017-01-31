// Flickr utilities
// Author: Trish Ang / github.com/feesh
/* global Main:true */
/* global Gallery:true */

(function (document, window) {
  'use strict';

  var apiKey = 'e0bc054b3d94fd9c1f91199ef47ae646';

  // API call for Flickr
  function callFlickr(processData, container, page = 1) {
    var searchText = 'nobannowall';
    var apiMethod = 'flickr.photos.search';
    var extras = 'url_m,owner_name,views,geo,date_taken';
    var perPage = 33;
    var currentPage = page;

    var url = `https://api.flickr.com/services/rest/?&method=${apiMethod}&api_key=${apiKey}&text=${searchText}&per_page=${perPage}&page=${currentPage}&format=json&nojsoncallback=1&extras=${extras}`;

    var request = new XMLHttpRequest();
    request.open('GET', url, true);

    request.onload = function () {
      if (this.status >= 200 && this.status < 400) {
        var data = JSON.parse(this.response);
        if (data.stat === 'ok') {
          // Success!
          console.log(data);

          // Preload images as soon as we get a response
          for( var i = 0; i < data.photos.photo.length; i++ ) {
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
  };


  // Utilities for working with Flickr image URLs
  // Docs: https://www.flickr.com/services/api/misc.urls.html
  function buildThumbnailURL(photo) {
    // Thumbnail format: https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg
    return `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;
  }

  function buildPhotoURL(photo) {
    // Photo format: https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}_c.jpg
    return `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_c.jpg`;
  }

  window.Flickr = {
    callFlickr: callFlickr,
    buildThumbnailURL: buildThumbnailURL,
    buildPhotoURL: buildPhotoURL
  };
})(document, window);
//# sourceMappingURL=flickr.js.map
