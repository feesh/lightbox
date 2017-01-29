// Gallery functions

(function(document, window) {
  'use strict';

  var lightbox = document.getElementById('lightbox');
  var overlay = document.getElementById('overlay');

  // Set up gallery with ref to photos and DOM
  function Gallery(photos) {
    this.currentIndex = 0;
    this.photos = photos;

    // Initialize by showing the thumbs
    this.showThumbnails();
  }

  // Show the current photo
  Gallery.prototype.showPhoto = function(index) {
    // Make lightbox visible if it's not
    lightbox.classList.add('visible');
    overlay.classList.add('visible');

    if (index >= 0 && index < this.photos.length) {
      this.currentIndex = index;
      console.log(this.currentIndex);
      console.log(this.photos[this.currentIndex]);

      var container = document.getElementById('currentphoto');
      var currentPhoto = this.photos[this.currentIndex];
      var imgURL = Flickr.buildLargePhotoURL(currentPhoto);

      // Display current image in display area
      container.innerHTML = '<img src="' + imgURL + '"/>';
      container.innerHTML = container.innerHTML + '<h3>' + currentPhoto.title + '</h3>';
    }
  }

  // Close lightbox
  Gallery.prototype.closeLightbox = function() {
    lightbox.classList.remove('visible');
    overlay.classList.remove('visible');
  }

  // Show the previous photo
  Gallery.prototype.showPrevious = function() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      // Currently at the start, so show the last photo
      this.currentIndex = this.photos.length - 1;
    }

    this.showPhoto(this.currentIndex);
  }

  // Show the next photo
  Gallery.prototype.showNext = function() {
    if (this.currentIndex < this.photos.length - 1) {
      this.currentIndex++;
    } else {
      // Currently at the end, so show the first photo
      this.currentIndex = 0;
    }

    this.showPhoto(this.currentIndex);
  }

  // Format thumbnails
  Gallery.prototype.showThumbnails = function() {
    function handleClick(index, gallery) {
       return function (event) {
          event.preventDefault();

          gallery.showPhoto(index);
       };
    }

    var thumbnails = document.getElementById('thumbnails');

    // For each photo, generate a thumbnail and show on page
    for (var i = 0; i < this.photos.length; i++) {
      var currentPhoto = this.photos[i];
      var thumbURL = Flickr.buildThumbnailURL(currentPhoto);
      var img;
      var link;
      var li;

      // Set up image
      img = document.createElement('img');
      img.src = thumbURL;

      // Set up link for triggering show photo
      link = document.createElement('a');
      link.href = img.src;
      link.addEventListener('click', handleClick(i, this));
      link.appendChild(img);

      // Set up li
      li = document.createElement('li');
      li.className = 'thumbnail';
      li.appendChild(link);

      // Append to a gallery container
      thumbnails.appendChild(li);
    }
  };

  window.Gallery = Gallery;
})(document, window);
