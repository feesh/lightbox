# 📸 Gallery lightbox
An example gallery and lightbox using vanilla Javascript and Sass. This demo generates a gallery using the Flickr API, in particular their search query, to return a set of photos to display. Photos can be selected to view in lightbox mode, and you can navigate backwards and forwards through the set.

[View lightbox online. 👀](http://static.trishang.com/sl/)

![Screenshot of demo](http://static.trishang.com/sl/screenshot-lightbox.jpg "Screenshot of lightbox demo")

### 🌟 Features
- Loads a set of photos through Flickr search API.
- View an image larger by clicking on a thumbnail.
- Navigate to next and previous images in the set.

### 🚀 Future upgrades
Although this was a fun project to start on, given the time constraints there are definitely additional features I'd love to continue implementing, including:
- [ ] Tests (also largely due to the no library constraint).
- [ ] Better error handling in case we get a set of images back, but the image server farms are down and no actual image is displayed.
- [ ] Improved animations, between opening the lightbox, and also when navigating.
- [ ] Dynamic search, change the search query to load a new set.
- [ ] Lazy loading for images.
- [ ] Infinite scroll to continue pulling new pages of images.
- [ ] Dynamically set max-height or max-width for too-tall or too-wide photos.

### 🖥 Technologies used
- Javascript
- Sass & PostCSS
- Gulp
- Babel
- Yeoman Gulp webapp boilerplate
- Tested across Chrome, Safari, Firefox, and IE
