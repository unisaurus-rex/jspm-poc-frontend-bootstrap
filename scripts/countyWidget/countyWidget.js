import $ from 'jquery';
import {initCountyMap, styleCountyBySales} from 'county-widget/countyMap';

// draw a county map and add dynamic styles to the county regions
// countyConfig: config object for initCountyMap
// inputGroupSelector: css selector string to select all checkboxes that affect styles
// selector string should end with 'input'
export function createCountyWidget(countyConfig, cboxGroupName){
  // build css selectors for the label and for inputs of active labels
  var labelSelector = ["label[name=", cboxGroupName, "]"].join("");
  var inputSelector = ["label.active input[name=", cboxGroupName, "]"].join("");

  // draw the county map
  countyConfig.dataRanges = getCheckedValues(inputSelector); 
  initCountyMap(countyConfig);

  // regions will show as empty to start if we don't color them ourselves
  // the code below only watches for changes

  // on checkbox click update the color style for each region

  /*
    Bootstrap checkboxes are wrapped in labels, a selected
    checkbox in bootstrap has a class named active added
    to the label. Bootstrap should also add a checked property
    to the input box, but this cannot be guaranteed based on testing
    The only reliable way to determine if a box has been checked
    is to observe the addition of the active class to the label
    We need to do two things
    1) add a mutation observer to watch for class changes on the
    labels associated with the checkboxes
    2) When the class changes, get the input values of each input
    box contained in a label with an active class

    !!!Note!!! For this to work, the label and the input wrapped by the label
    should both have an attribute of name with the same value
    Ex:  <label class="active" name="group1"><input type="checkbox" name="group1"></input></label>
  */

  // get all the labels with the same cboxGroupName and add mutation observers
  $(labelSelector).each(function(idx, el){
    var observer = new MutationObserver(function(mutations){
      mutations.forEach(function(mutation){
        /* mutation will track the old and new value, two cases that we care about
           1) added active class to the label
           2) removed active class from the label
           mutation will fire anytime a class is added or removed, the class may or may
           not be the active class that signals a checkbox click
           so we check to see if the active class is the class that changed betwee old and new
        */
        var newHasActive = mutation.target.classList.contains('active');
        var oldHasActive = mutation.oldValue.includes('active');
        if( (newHasActive && !oldHasActive) || (oldHasActive && !newHasActive) ){
          var selectedRanges = getCheckedValues(inputSelector);
          styleCountyBySales(selectedRanges);
        }
      });
    });

    // mutation observer config object, use oldValue: true so we can compare current value to old value
    // otherwise we won't be able to tell if the active value changed
    var config = {attributes: true, attributeOldValue: true, attributeFilter: ['class']};

    observer.observe(el, config);

  });
}

// get checked values as an array
// selector: css selector that will return an input element that is checked
function getCheckedValues(selector){
  // calling .get() on a jquery object returns a plain array of elements
  return $(selector).get().map(function(el){return el.value;});
}
