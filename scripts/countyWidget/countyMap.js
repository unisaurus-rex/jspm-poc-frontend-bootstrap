import $ from 'jquery';
import drawRegions from 'drawMapRegions';
import {getD3ClassFunction} from 'county-widget/countySalesStyle';
import {initTooltip, positionTooltip, hideTooltip, addTooltipHTML} from 'tooltip';

/*
  config is object with params:
  salesData: path to sale data file
  countyFilePath: path to county geo json
  leafletMap: leaflet map object
  tooltipId: id to be used by tooltip that goes with map
  tooltipClass: css to be used by tooltip that goes with map
*/

export function initCountyMap(config){
  $.getJSON(config.countyFilePath, function(data){
    var sales = config.salesData.data;
    var regions = data.features;

    // merge sales data with geojson data
    for(var i = 0; i < config.salesData.data.length; i++){
      var region = sales[i].region;
      var salesFigures = sales[i].sales;
      for(var j = 0; j < regions.length; j++){
        if(regions[j].properties.NAME == region){
          regions[j].saleKeys = config.salesData.keys;
          regions[j].sales = salesFigures;
        }
      }
    }

    drawRegions(config.leafletMap, regions, "countypath");

    // select all county paths
    var counties = d3.selectAll("path.countypath");

    // add hidden tooltip
    initTooltip(config.tooltipId, config.tooltipClass);

    // show/hide tooltip on hover
    counties.on("mouseover", function(d) {
      var tooltipBody = `
          <table>
          <thead><tr><th>Group</th><th>Sales</th></tr></thead>
          <tbody>
          <tr><td>College Student</td><td>$ ${d.sales[0]}</td></tr>
          <tr><td>Outdoorsman</td><td>$ ${d.sales[1]}</td></tr>
          <tr><td>New Home Buyer</td><td>$ ${d.sales[2]}</td></tr>
          <tr><td>Total</td><td>$ ${(d.sales.reduce((a,b) => a+b, 0)).toFixed(2)}</td></tr>
          </tbody>
        </table>`

      positionTooltip(config.tooltipId, d3.mouse(this));
      addTooltipHTML(config.tooltipId, tooltipBody);
    });
    counties.on("mouseout", function(){hideTooltip(config.tooltipId)});
  });
}

// given an array of demographics ranges, style region by the combined sales of the demographics
export function styleCountyBySales(demographics){
  // build a function that d3 can use to apply a style to an element
  var d3func = getD3ClassFunction(demographics);

  var counties = d3.selectAll("path.countypath");

  // remove any sales color classes before applying new ones
  counties.classed("lowSales avgSales highSales", false);

  // apply style function to each county region
  d3.selectAll("path.countypath").attr("class", d3func);
}
