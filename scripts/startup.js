import bootstrap from 'bootstrap-sass';

import addToggle from './toggle.js';
import initMap from './createLeafletMap.js';
import {createCountyWidget} from 'county-widget/countyWidget.js';

//import {drawSmoothLine} from 'smoothline/smoothline.js'
import {createDonutWidget} from 'donut-widget/donutInteraction.js'

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

var donutConfig = {
  //global config
  width: 500,
  height: 500,
  filePath: "scripts/charts/donut/donutdata.csv",
  parentDiv: "div#donutid",
  keys: ["transactionType", "number"],
  checkboxIds: ["authorizations", "chargebacks", "declines"],
  //row to css class
  classMap: {"declines": "fill-danger", "authorizations": "fill-success", "chargebacks":"fill-warning"},

  //donut
  innerText: "TOTAL TRANS"
};

createDonutWidget(donutConfig, "transactionType");

/*
var xTickFormat = d3.timeFormat("%b");
var parseMonthYear = d3.timeParse("%b-%y");

var maxFunction = function(d){
  return Math.max(d.current, d.last, d.next);
}

var minFunction = function(d){
  return 0;
}*/

/*var smoothConfig = {
  //global config
  width : 400,
  height : 115,
  filePath: "scripts/charts/smoothline/lineyearly.tsv",
  parentDiv: "div#chartsmoothlineid",
  keys: ["date", "last", "current", "next"],
  checkboxIds: {},
  //column to css class
  classMap: {"last": "fill-gray area", "current": "fill-brand-info area"},

  //line config
  margin: {top:20, right: 20, bottom: 30, left: 50},
  interpolate: "true",
  xAxisLines: "true",
  yAxisLines: "false",
  xTickNumber: "8",
  yTickNumber: "5",
  xTickText: "",
  yTickText: "MM",
  xTickFormat: xTickFormat,
  yTickFormat: "",
  timeParse: parseMonthYear,
  maxFunction: maxFunction, 
  minFunction: ""
}


drawSmoothLine(smoothConfig);*/

