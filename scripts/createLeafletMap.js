import $ from 'jquery';
// don't need to import leaflet because it's included as a cdn in index.html

// parentSelector: css selector for parent of map container
// mapContainerId: id of map container
export default function(parentSelector, mapContainerId, mapCenter, initialZoom) {
  // initialize map container height
  setContainerHeight(parentSelector);
  
  // change the height of the container on resize
  $(window).resize(function(e){
    setContainerHeight(parentSelector);
  });
  
  // L = Leaflet.js object
  var map = L.map(mapContainerId);

  map.options.minZoom = 4;
  map.setView(mapCenter, initialZoom);

  // add tile layer to map
  L.tileLayer( 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    subdomains: ['a','b','c']
  }).addTo( map );
  
  return map;
}

// selector: css selector for element
// container will have no height unless it's specified
// this function may or may not be needed if you set the height in
// css
function setContainerHeight(selector) {
  var screenHeight = $(window).height();
  var navbarHeight = $(".navbar-default").height();
  var mapHeight = (screenHeight - navbarHeight) * 0.65;
  $(selector).height(mapHeight);
}
