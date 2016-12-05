import addToggle from 'toggle';
import initMap from '../scripts/createLeafletMap.js'; 

describe("hello world", function(){
  it("passes", function(){
    var t = true;

    expect(t).toBe(true);
  });
  
  it("fails", function(){
    var f = true;
    
    expect(f).toBe(true);
  });
});

describe("test the initMap() in createLeafletMap.js", function(){
	it("should throw an error if given null parameters", function(){
		var mapObjectWithNullValues = {
			parentSelector: null,
			mapContainerId: null, 
			mapCenter: null,
			initialZoom: null
		}
		expect(function() {initMap(mapObjectWithNullValues);}).toThrowError("L is not defined");
		
	});	

	it("should throw an error if undefined", function(){
		var mapObjectUndefined = undefined;

		expect(function () {initMap(mapObjectUndefined);}).toThrow();
	});

	it("should throw an error if undefined parameters", function(){
		var mapObjectWithUndefinedValues = {
			parentSelector: undefined,
			mapContainerId: undefined, 
			mapCenter: undefined,
			initialZoom: undefined
		}
		expect(function() {initMap(mapObjectWithUndefinedValues);}).toThrowError("L is not defined");

	});


});