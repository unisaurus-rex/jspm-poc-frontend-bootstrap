function hasClass(element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}


/*function toggleTest (){
	console.log("toggle called");
	var auth = document.getElementById("auth");
	var chargeBack = document.getElementById("chargeback");
	var decline = document.getElementById("decline");
}

*/

function transitionOut(tagName, idName ){
	//console.log("transition out called")
	target = d3.select( tagName+ "#" +idName + "path");
	target	
	  .transition()
	  .duration(500)
	  .style("opacity", "0");
}

function transitionIn(tagName, idName ){
	//console.log("transition in called", tagName, idName)
	target = d3.select( tagName+ "#" +idName + "path");
	//console.log(target);
	target	
	  .transition()
	  .duration(500)
	  .style("opacity", "1");
}