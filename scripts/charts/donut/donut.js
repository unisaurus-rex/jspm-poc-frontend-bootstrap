import {hasClass} from 'charts/helper';

var allData;

export function drawDonut(config) {
  var radius = Math.min( config.width, config.height) / 2;
  var innerRad = radius / 4;
  var hoverRad = 15;
  var padAngle = 0;
  var svg = drawSvg();
  var arc = defineArc (radius, radius-innerRad);
  var hoverArc = defineArc (radius-innerRad, radius+hoverRad);
  var pie = definePie();
  
  drawText();

  d3.csv(config.filePath, type, function(error, data) {
    if (error) throw error;

    //add sum to center 
    updateSum(svg, config, data);

    //make a copy of the data
    allData = data;

    var path = svg.selectAll("path");
    var g = svg.selectAll(".arc")
      .data(pie(allData), function(d){return d[ config.keys[0]]})
    ;

    enterAndUpdate(g, path, allData);
  }); //end d3 read

  return function updateDonut() {

    var filteredData = filterData();
    updateSum(svg, config, filteredData);

    var path = svg.selectAll("path");
    var g = svg.selectAll(".arc")
      .data(pie(filteredData), function(d){return d[ config.keys[0]]})
    ;
    
    enterAndUpdate(g, path, filteredData);
    exit(g);
  } //end updateDonut


  function type(d) {
    d[ config.keys[1]] = +d[ config.keys[1]];
    return d;
  }

  function drawSvg(){  
    return d3.select(config.parentDiv)
      .classed("svg-container", true)
      .append("svg")
      .attr("viewBox", "0 0 " + config.width + " " + config.height)
      //class for responsivenesss
      .classed("svg-content-responsive-pie", true)
      .attr("width", config.width)
      .attr("height", config.height)
      .append("g")
      .attr("id", "donutchart")
      .attr("transform", "translate(" + config.width / 2 + "," + config.height / 2 + ")")
    ;
  }

  function defineArc (outer, inner){
    return d3.arc()
      .outerRadius(outer)
      .innerRadius(inner)
    ;
  }

  function definePie(){
    return d3.pie()
      .sort(null)
      .value(function(d) {
        //return the numbers in csv(column 2)
        return d[ config.keys[1] ];
      })
      .padAngle(padAngle)
    ;
  }

  function filterData(){
    var divs = [];
    for (var i =0; i< config.data.length; i++){
      divs[ config.data[i] ] = document.getElementById( config.data[i] )
    }

    var filteredData= allData.filter( function(d) {
      if(divs[ d[ config.keys[0] ] ]) {
        if (hasClass( divs[ d[ config.keys[0] ] ] , "active"))
          return true;
        else
          return false;        
      }
      return false;
    })
    return filteredData;
  }

  function updateSum(svg, config, data){   
    var sum = 0;
    
    data.forEach(function (d, j) {
        sum += d [config.keys[1]];
      })

    //remove current total
    svg.select( "text.data" )
      .transition()
      .duration(100)
      .style("opacity", 0)
      .remove()
    ;
    
    //update total
    svg.append("text")
      .attr("dy", ".95em")
      .style("text-anchor", "middle")
      .style("opacity", 0)
      .attr("class", "data")
      .text(function() {
        return sum;
      })
      .transition()
      .duration(1000)
      .style("opacity", 1)
    ;
  }

  function drawText(){
    //add text for inner circle
    svg.append("text")
      .attr("dy", "-0.5em")
      .style("text-anchor", "middle")
      .attr("class", "inside")
      .text(function() {
        return config.innerText;
      })
    ;
  }

  function arcTween(a) {
    var startAngle = a.startAngle; //<-- keep reference to start angle
    var i = d3.interpolate(a.startAngle, a.endAngle); //<-- interpolate start to end
    return function(t) {
      return arc({ //<-- return arc at each iteration from start to interpolate end
        startAngle: startAngle,
        endAngle: i(t)
      });
    };
  }

  function enterAndUpdate(g, path, data){
    g
    .data(pie(data))
    .enter().append("g")
      .attr("class", "arc")
      .append("path")
    .merge(path)
    .data(pie(data))
      .on("mouseover", function(d) {
        d3.select(this).transition()
          .duration(1000)
          .attr("d", hoverArc);
      })
      .on("mouseout", function(d) {
        d3.select(this).transition()
          .duration(1000)
          .attr("d", arc);
      })
      .attr("class", function(d){
        return config.classMap [ d.data[ config.keys[0]] ]  + ' ' + d[ config.keys[0]];
      })
      .transition()
      .duration(700)
      .attrTween("d", arcTween)
    ;
  }

  function exit(g){
    g
    .exit()
      .transition()
      .duration(700)
      .attr("d", arcTween)
      .style("opacity", 0)
      .remove()
    ;
  }

}//end drawDonut