// Main JS for Lightbox gallery

// Test API call for Flickr
function callFlickr() {
  var api_key = 'e0bc054b3d94fd9c1f91199ef47ae646';
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

      // Test spit results out to page
      // function displayImages(data) {
        var testdiv = document.getElementById('test');
        for (var i = 0; i < data.photoset.photo.length; i++) {
          var currentPhoto = data.photoset.photo[i];
          // Format URL for image src
          // https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg
          var imgURL = 'https://farm' + currentPhoto.farm + '.staticflickr.com/' + currentPhoto.server +
      '/' + currentPhoto.id + '_' + currentPhoto.secret + '_q.jpg';
          testdiv.innerHTML = testdiv.innerHTML + '<p><img src="' + imgURL + '"/></p>';
        }
    } else {
      // We reached our target server, but it returned an error
      console.log('error: ');
    }
  }

  request.onerror = function() {
    // There was a connection error of some sort
  };

  request.send();
};


// Function calls
callFlickr();


