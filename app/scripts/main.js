// Main JS for Lightbox gallery

// Test API call
function callIG() {
  var api_key = 'e0bc054b3d94fd9c1f91199ef47ae646';

  var url = 'https://api.flickr.com/services/rest/?&method=flickr.photosets.getPhotos&api_key=' + api_key + '&photoset_id=72157640077865876&format=json&nojsoncallback=1';

  var request = new XMLHttpRequest();
  request.open('GET', url, true);

  console.log('allo allo');

  request.onload = function() {
    if (this.status >= 200 && this.status < 400) {
      // Success!
      var data = this.response;
      console.log(data);
    } else {
      // We reached our target server, but it returned an error
      console.log('error: ');
      console.log(data);
    }
  }

  request.onerror = function() {
    // There was a connection error of some sort
  };

  request.send();

};

callIG();
