import $ from 'jquery';
import {initCountyMap, styleCountyBySales} from 'county-widget/countyMap.js';
import {addCheckboxObservers, getCheckedValues} from 'bootstrapCheckboxObserver.js';

// draw a county map and add dynamic styles to the county regions
// countyConfig: config object for initCountyMap
// inputGroupSelector: css selector string to select all checkboxes that affect styles
// selector string should end with 'input'
export function createCountyWidget(countyConfig, cboxGroupName){
  // build a css selector string for choosing the active bootstrap checkboxes (ie checkboxes that are checked)
  var inputSelector = ["label.active input[name=", cboxGroupName, "]"].join("");

  // add the active checkboxes to countyConfig so initCountyMap can style them when the map is initialized.  If we don't do this, the regions will start out black.
  countyConfig.dataRanges = getCheckedValues(inputSelector); 
  initCountyMap(countyConfig);


  // on checkbox click update the color style for each region
  // get all the labels with the same cboxGroupName and add mutation observers
  addCheckboxObservers(cboxGroupName, styleCountyBySales);
}


