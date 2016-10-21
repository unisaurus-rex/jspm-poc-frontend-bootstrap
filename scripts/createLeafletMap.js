import $ from 'jquery';
// don't need to import leaflet because it's included as a cdn in index.html

/*
config object:
parentSelector: css selector for parent of map container
mapContainerId: id of map container
mapCenter: array of 2 floats representing the longitude and latitude of leaflet map center
initialZoom: int, starting zoom level of map 
*/
export default function(config) {
  // initialize map container height
  setContainerHeight(config.parentSelector);
  
  // change the height of the container on resize
  $(window).resize(function(e){
    setContainerHeight(config.parentSelector);
  });
  
  // L = Leaflet.js object
  var map = L.map(config.mapContainerId);

  map.options.minZoom = 4;
  map.setView(config.mapCenter, config.initialZoom);

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
