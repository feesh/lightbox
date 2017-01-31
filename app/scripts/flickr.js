// Flickr utilities
// Author: Trish Ang / github.com/feesh
/* global Main:true */

(function (document, window) {
  'use strict';

  var apiKey = 'e0bc054b3d94fd9c1f91199ef47ae646';

  // API call for Flickr
  function callFlickr(processData, container) {
    var searchText = 'nobannowall';
    var apiMethod = 'flickr.photos.search';
    var extras = 'url_m,owner_name,views,geo,date_taken';

    var url = 'https://api.flickr.com/services/rest/?&method=' + apiMethod + '&api_key=' + apiKey + '&text=' + searchText + '&format=json&nojsoncallback=1&extras=' + extras;

    var request = new XMLHttpRequest();
    request.open('GET', url, true);

    request.onload = function () {
      if (this.status >= 200 && this.status < 400) {
        // Success!
        var data = JSON.parse(this.response);
        console.log(data);

        Main.processData(data, container);
      } else {
        // We reached our target server, but it returned an error
        console.log('error: ');
      }
    };

    request.onerror = function () {
      // There was a connection error of some sort
    };

    request.send();
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
