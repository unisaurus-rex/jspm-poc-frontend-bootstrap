import {initCountyMap, styleCountyBySales} from 'county-widget/countyMap';

// draw a county map and add dynamic styles to the county regions
// countyConfig: config object for initCountyMap
// inputGroupSelector: css selector string to select all checkboxes that affect styles
// selector string should end with 'input'
export function createCountyWidget(countyConfig, inputGroupSelector){
  initCountyMap(countyConfig);

  // on checkbox click update the color style for each region
  $(inputGroupSelector).change(function(){
    var checkedSelector = inputGroupSelector + ":checked";
    var selectedRanges = getCheckedValues(checkedSelector);
    styleCountyBySales(selectedRanges);
  });

}

// get checked values as an array
// selector: css selector that will return an input element that is checked
function getCheckedValues(selector){
  // calling .get() on a jquery object returns a plain array of elements
  return $(selector).get().map(function(el){return el.value;});
}
