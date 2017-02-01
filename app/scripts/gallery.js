// Gallery functions
// Author: Trish Ang / github.com/feesh
/* global Flickr:true */

(function(document, window) {
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
    this.setupLightbox();
    this.setupOverlay();
  }

  // Reset gallery content
  Gallery.prototype.resetGallery = function() {
    var content = document.getElementById('content');
    content.parentNode.removeChild(content);
  };

  // Set up overlay
  Gallery.prototype.setupOverlay = function() {
    // Check to see if it exists first
    var currentOverlay = document.getElementById('overlay');

    if(currentOverlay) {
      return;
    } else {
      overlay = document.createElement('div');
      overlay.className = 'overlay';
      overlay.id = 'overlay';
      overlay.title = 'Click anywhere to close';
      this.container.appendChild(overlay);
    }
  };

  // Set up lightbox
  Gallery.prototype.setupLightbox = function() {
    // Check to see if it exists first
    var currentOverlay = document.getElementById('overlay');

    if(currentOverlay) {
      return;
    } else {
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
    }
  };

  // Show the current photo
  Gallery.prototype.showPhoto = function(index) {
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
      container.innerHTML = `<figure class="${orientation}"><img src="${imgURL}" /><figcaption>${currentPhoto.title}</figcaption></figure>`;
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
  Gallery.prototype.closeLightbox = function() {
    lightbox.classList.remove('visible');
    overlay.classList.remove('visible');
  };

  // Show the previous photo
  Gallery.prototype.showPrevious = function() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      // Currently at the start, so show the last photo
      this.currentIndex = this.photos.length - 1;
    }

    this.showPhoto(this.currentIndex);
  };

  // Show the next photo
  Gallery.prototype.showNext = function() {
    if (this.currentIndex < this.photos.length - 1) {
      this.currentIndex++;
    } else {
      // Currently at the end, so show the first photo
      this.currentIndex = 0;
    }

    this.showPhoto(this.currentIndex);
  };

  // Format thumbnails
  Gallery.prototype.setupThumbnails = function() {
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
      var img, link, li, width;

      // Set up image
      img = document.createElement('img');
      img.src = thumbURL;

      // Set up link for triggering show photo
      link = document.createElement('a');
      link.href = img.src;

      // Crop photo if too tall
      if (orientation === 'portrait') {
        width = currentPhoto.width_m;
        link.style.maxHeight = `${width}px`;
      }

      link.appendChild(img);

      // Set up li
      li = document.createElement('li');
      li.className = `thumbnail ${orientation}`;
      li.addEventListener('click', handleClick(i, this));
      li.appendChild(link);

      // Append to a gallery container
      thumbnails.appendChild(li);
    }
  };

  window.Gallery = Gallery;
})(document, window);
