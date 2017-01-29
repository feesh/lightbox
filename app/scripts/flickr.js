// Flickr utilities

(function(document, window) {
  'use strict';

  var api_key = 'e0bc054b3d94fd9c1f91199ef47ae646';

  // API call for Flickr
  function callFlickr() {
    var album_id = '72157679089031645';
    var api_method = 'flickr.photosets.getPhotos'

    var url = 'https://api.flickr.com/services/rest/?&method=' + api_method + '&api_key=' + api_key + '&photoset_id=' + album_id + '&format=json&nojsoncallback=1';

    var request = new XMLHttpRequest();
    request.open('GET', url, true);

    request.onload = function() {
      if (this.status >= 200 && this.status < 400) {
        // Success!
        var data = JSON.parse(this.response);
        console.log(data);
        var gallery = new Gallery(data.photoset.photo);

        return data;
      } else {
        // We reached our target server, but it returned an error
        console.log('error: ');
      }
    }

    request.onerror = function() {
      // There was a connection error of some sort
    };

    request.send();
  }

  // Utilities for working with Flickr image URLs
  // Docs: https://www.flickr.com/services/api/misc.urls.html
  function buildThumbnailURL(photo) {
    // Thumbnail format: https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}_m.jpg
    return 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '_m.jpg';
  }

  function buildPhotoURL(photo) {
    // Photo format: https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg
    return 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '.jpg';
  }

  function buildLargePhotoURL(photo) {
    // Large photo format: https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}_b.jpg
    return 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '_b.jpg';
  }

  window.Flickr = {
     callFlickr: callFlickr,
     buildThumbnailURL: buildThumbnailURL,
     buildPhotoURL: buildPhotoURL,
     buildLargePhotoURL: buildLargePhotoURL
  };

})(document, window);
