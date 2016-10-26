


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
 * @function addCheckboxObserver
 * @param el {DOM Node} a dom element (ie not a jquery object but the element
 *        a jquery object would wrap
 * @param callback {function} a function to execute when a checkbox is checked or
 *        unchecked.  The function will receive no arguments.
 * @description execute a callback function when a bootstrap checkbox is checked
 *              or unchecked
 */
export function addCheckboxObserver(el, callback) {
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
        callback();
      }
    });
  });

  // mutation observer config object, use oldValue: true so we can compare current value to old value
  // otherwise we won't be able to tell if the active value changed
  var config = {attributes: true, attributeOldValue: true, attributeFilter: ['class']};

  observer.observe(el, config);

}

// function that returns function to be called by foreach, it needs to take the 
// callback function and return a function that takes a mutation
