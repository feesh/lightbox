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
    this.currentPage = 1;
    this.container = element;
    this.photos = photos;
    this.photoURLs = [];

    // Only run initial set up once
    if (this.currentPage < 2) {
      // Get content div reference
      this.setupContainer();
      this.thumbnails = document.getElementById('thumbnails');

      // Attach containers for overlay and lightbox
      this.setupOverlay();
      this.setupLightbox();
    }

    // Initialize by showing the thumbs
    this.setupThumbnails();
  }

  // Set up overlay
  Gallery.prototype.setupOverlay = function() {
    overlay = document.createElement('div');
    overlay.className = 'overlay';
    overlay.id = 'overlay';
    overlay.title = 'Click anywhere to close';
    this.container.appendChild(overlay);
  };

  // Set up lightbox
  Gallery.prototype.setupLightbox = function() {

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
  Gallery.prototype.showPhoto = function(index) {
    // Make lightbox visible if it's not
    lightbox.classList.add('visible');
    overlay.classList.add('visible');

    if (index >= 0 && index < this.photoURLs.length) {
      this.currentIndex = index;

      var container = document.getElementById('currentphoto');
      var currentPhoto = this.photoURLs[this.currentIndex];
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

    // Figure out which set of images to append next
    // first set 0-32, second 33-65, etc
    var i = (this.currentPage - 1) * 33;

    // For each photo, generate a thumbnail and show on page
    for (i; i < this.photos.length; i++) {
      var currentPhoto = this.photos[i];
      var thumbURL = Flickr.buildThumbnailURL(currentPhoto);
      var photoURL = Flickr.buildPhotoURL(currentPhoto);
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
      li.className = `thumbnail ${orientation}`;
      li.dataset.src = photoURL;
      li.addEventListener('click', handleClick(i, this));
      li.appendChild(link);

      // Add to array of URLs
      this.photoURLs.push(currentPhoto);

      // Append to a gallery container
      this.thumbnails.appendChild(li);
    }
  };

  // Set up content block
  Gallery.prototype.setupContainer = function() {
    // Thumbnails holder
    var thumbnails = document.createElement('ul');
    thumbnails.className = 'thumbnails';
    thumbnails.id = 'thumbnails';

    // Content block for holding content
    var contentContainer = document.createElement('div');
    contentContainer.className = 'content';
    contentContainer.id = 'content';
    contentContainer.appendChild(thumbnails);
    this.container.appendChild(contentContainer);
  }

  window.Gallery = Gallery;
})(document, window);
