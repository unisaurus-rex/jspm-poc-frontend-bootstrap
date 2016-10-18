import {initCountyMap, styleCountyBySales} from 'county-widget/countyMap';

export function createCountyWidget(config){
  initCountyMap(config);

  // on checkbox click update the color style for each region
  $("input[name=demographics]").on("click", function(){
    var selectedDemographics = getCheckedValues("demographics");
    styleCountyBySales(selectedDemographics);
  });

}

// get checked values as an array
function getCheckedValues(checkboxName){
  var selector = "input[name=" + checkboxName + "]:checked";
  // calling .get() on a jquery object returns a plain array of elements
  return $(selector).get().map(function(el){return el.value;});
}
