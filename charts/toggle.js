function hasClass(element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}


function toggleTest (){
	console.log("toggle called");
	var auth = document.getElementById("auth");
	var chargeBack = document.getElementById("chargeback");
	var decline = document.getElementById("decline");

	/*console.log("toggle called");
	if(hasClass(test, "active")){
		console.log("true");
	}
	else
		console.log("false");*/


}