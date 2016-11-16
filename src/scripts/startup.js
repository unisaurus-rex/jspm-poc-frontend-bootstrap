import bootstrap from 'bootstrap-sass';
import addToggle from './toggle.js';
import initMap from './createLeafletMap.js';
import {createCountyWidget} from 'county-widget/countyWidget.js';

addToggle(); 

// config object for map
var map1Config = {
  parentSelector: "#mapParent",
  mapContainerId: "mapContainer", 
  mapCenter: [39.7, -104.99],
  initialZoom: 7
};
var map1 = initMap(map1Config);

var salesData = {
  keys: ["18-34", "35-54", "55+"],
  data: [
    {region: "Grand",
     sales: [550231.17, 679841.28, 457982.84]
    },
    {region: "Jefferson",
     sales: [1872438.19, 3484952.76, 2743956.11]
    },
    {region: "Summit",
     sales: [2743928.14, 5940812.61, 3951408.16]
    }
  ]
};
var countyConfig = {
  salesData: salesData,
  countyFilePath: 'scripts/json/counties.json',
  leafletMap: map1,
  tooltipId: "mapTooltip1",
  tooltipClass: "mapTooltip"
};

createCountyWidget(countyConfig, "countyRange");


