/*
  Bootstrap checkboxes are wrapped in labels. Ex:

  <label class="btn">
  <input type="checkbox"></input
  </label>

  A selected checkbox in bootstrap has a class named active added
  to the label. Ex:

  <label class="btn active">
  <input type="checkbox"></input
  </label>

  Bootstrap should also add a checked property
  to the input box, but this cannot be guaranteed based on testing
  The only reliable way to determine if a box has been checked
  is to observe the addition of the active class to the label

  No events are fired for the addition or removal of classes from a dom
  element, so we cannot register an event listener for addition or removal
  of the active class to a bootstrap checkbox label.
  Mutation Observer's are a part of the DOM standard and supported by all
  major browsers. Mutation Observers allow you to watch for changes to
  element attributes.
  See this link for more detail:
  https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
*/

/*
 * @function addCheckboxObservers
 * @param cboxGropuName {string} name attribute of the bootstrap checkbox group
          both the label and the input element need this attribute
 * @param callback {function} function to call if the checkbox is checked or unchecked. This function must take an array of strings. These strings are the value associated with each checked input.
 */
export function addCheckboxObservers(cboxGroupName, callback){
  // build css selectors for the label and for inputs of active labels
  var labelSelector = ["label[name=", cboxGroupName, "]"].join("");
  var inputSelector = ["label.active input[name=", cboxGroupName, "]"].join("");

  $(labelSelector).each(function(idx, el){
    addObserver(el, callback, inputSelector);
  });
}

/*
 * @function addObserver
 * @param el {DOM Node} a dom element (ie not a jquery object but the element
 *        a jquery object would wrap
 * @param callback {function} a function to execute when a checkbox is checked or
 *        unchecked.  The function will receive no arguments.
 * @param inputSelector {string} css selector for choosing selected checkboxes
 * @description execute a callback function when a bootstrap checkbox is checked
 *              or unchecked
 */
function addObserver(el, callback, inputSelector) {
  // wrap the callback so it can be used if the mutation alters the checkbox
  var mutationFunc = mutationFuncBuilder(callback, inputSelector);
  var observer = new MutationObserver(function(mutations){
    mutations.forEach(mutationFunc);
  });

  // mutation observer config object, use oldValue: true so we can compare current value to old value
  // otherwise we won't be able to tell if the active value changed
  var config = {attributes: true, attributeOldValue: true, attributeFilter: ['class']};

  // apply the observer to el
  observer.observe(el, config);

}

/*
 * @function mutationFuncBuilder
 * @param callback {function} function to call if checkbox is checked or unchecked
 * @param inputSelector {string} css selector string which selects active checkboxes
 * @returns {function}
 * @description builds a callback function for use in array.forEach()
 */
function mutationFuncBuilder(callback, inputSelector) {
  return function(mutation){
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
      callback(selectedRanges);
    }
  }
}

/*
 * @function getCheckedValues
 * @param selector {string} css selector string for inputs of checked bootstrap checkboxes
 * @description return array of values associated with checkboxes found by selector
 * @returns array of strings
 */
export function getCheckedValues(selector){
  // calling .get() on a jquery object returns a plain array of elements
  return $(selector).get().map(function(el){return el.value;});
}
