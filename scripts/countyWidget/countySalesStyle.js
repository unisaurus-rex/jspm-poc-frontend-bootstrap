// return a css class based on the salesDollars amount
function classBySales(salesDollars) {
  if(salesDollars < 2000000){
    return "lowSales";
  } else if(salesDollars < 10000000) {
    return "avgSales";
  } else {
    return "highSales";
  }
}

/*
  demographics -> array, array of demographic groups requested
  sales -> array, array of dollar amounts, each position corresponds to a specific demographic group
  keys -> array, each key corresponds to the name of the demographic at the matching index in sales
  sum any value in the sales array that corresponds to a demographic listed in the demographics
*/
function sumSales(demographics, sales, keys) {
  // take the demographics strings in demographics and figure out what index in sales
  // contains the corresponding demographics data
  var salesIndicesArr = demographics.map(function(val){
    return keys.indexOf(val);
  });

  // sum the sales value corresponding to each index in salesIndices
  return salesIndicesArr.reduce(function(prev, current){
    return prev + sales[current];
  }, 0);
}

/*
 * @function getD3ClassFunction
 * @param {demographics} an array of strings representing the demographic values to display
 * @description to style d3 with a function, we need to give d3 a function that takes one parameter
 * to style by sales amounts we need to consider more than one parameter. This function takes
 * the demographic information and returns a function that wraps demographic information so we can pass
 * it to d3
 */
export function getD3ClassFunction(demographics){
  return function getSalesClass(d) {
    // only want to add to existing classes, not overwrite them
    // so need to get a string of the existing classes on the element
    var elementClasses = d3.select(this).attr("class");

    // return the sales class style based on total sales of the demographic categories selected
    var salesDollars = sumSales(demographics, d.sales, d.saleKeys);

    // append the new class to the existing classes
    return elementClasses + " " + classBySales(salesDollars);
  }
}
