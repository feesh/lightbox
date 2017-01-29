// Gallery functions

(function(document, window) {
  'use strict';

  // Set up gallery with ref to photos and DOM
  function Gallery(photos) {
    this.currentIndex = 0;
    this.photos = photos;

    // Initialize by showing the first photo
    this.showPhoto(this.currentIndex);
  }

  // Show the current photo
  Gallery.prototype.showPhoto = function(index) {
    if (index >= 0 && index < this.photos.length) {
      this.currentIndex = index;
      console.log(this.currentIndex);
      console.log(this.photos[this.currentIndex]);

      var container = document.getElementById('currentphoto');
      var currentPhoto = this.photos[this.currentIndex];
      var imgURL = Flickr.buildLargePhotoURL(currentPhoto);

      // Display current image in display area
      container.innerHTML = container.innerHTML + '<img src="' + imgURL + '"/>';
    }
  }

  // Show the previous photo

  // Show the next photo

  // Format thumbnails
  Gallery.prototype.showThumbnails = function(data) {
    var thumbnails = document.getElementById('thumbnails');

    // For each photo, generate a thumbnail and show on page
    for (var i = 0; i < data.photoset.photo.length; i++) {
      var currentPhoto = data.photoset.photo[i];
      var thumbURL = Flickr.buildThumbnailURL(currentPhoto);

      // Append to a gallery container
      thumbnails.innerHTML = thumbnails.innerHTML + '<li><img src="' + thumbURL + '"/></li>';
    }
  };

  window.Gallery = Gallery;
})(document, window);
