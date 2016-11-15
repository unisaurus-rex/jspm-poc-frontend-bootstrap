import {hasClass} from 'charts/helper';

export function drawSmoothLine(config){


    //set margins for axes
    var margin = {top: 20, right: 20, bottom: 30, left: 50},
      width = 400- margin.left - margin.right,
      height = 115 - margin.top - margin.bottom;

    //draw the svg and put classes into the selected div
    var svg = d3.select("div#chartsmoothlineid")
      .append("div")
      .classed("svg-container", true)
      .append("svg")
      .attr("preserveAspectRatio", "xMinYMin meet")
      .classed("svg-container padding", true)
      .attr("viewBox","0 0 " + width + " " + height)
      //class to make it responsive
      //.classed("svg-content-responsive", true)
      ;

    //plot yearly
    d3.tsv("scripts/charts/smoothline/lineyearly.tsv", function(error, data) {
      if (error) throw error;

    //parses time into correct format
    var parseDate = d3.timeParse("%d-%b-%y");
    var formatTime = d3.timeParse("%e %B");
    var parseMonthYear = d3.timeParse("%b-%y");
      data.forEach(function(d) {

        d [ config.keys[0] ] = config.timeParse(d [ config.keys[0] ] )
        for (var i=1; i< config.keys.length; i++)
        {
          //console.log (config.keys[i]);
          d[ config.keys[i]] = +d[ config.keys[i]];
        }
        //d.date = config.timeParse(d.date);
        //d.last = +d.close;
        //d.pin = +d.pin;

        //console.log(d.date, d.close, d.pin);
      });

      //setup axes
      var x = d3.scaleTime()
        .range([0, width]);
      var y = d3.scaleLinear()
        .range([height, 0]);
        
      //draw axes
      var xAxis = d3.axisBottom()
        .scale(x)
     //   .orient("bottom")
        .ticks(8)
        //.tickSizeInner(-height)
        //.tickSizeOuter(0)
        .tickPadding(10)
        .tickFormat(config.xTickFormat)
        ;
      var yAxis = d3.axisLeft()
        .scale(y)
     //   .orient("left")
        .ticks(5)
        .tickSizeInner(-width)
        .tickSizeOuter(0)
        .tickPadding(10)
        .tickFormat(function(d) { return d + "MM"; })
        ;

      //set domains
      x.domain(d3.extent(data, function(d) { return d[ config.keys[0]]; }));
      y.domain( [0, d3.max(data, function (d) { return config.maxFunction(d) })]);

      //x axis
      svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        ;
      //y axis
      svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        ;

      for (var i =1; i < config.keys.length; i++)
      {
        var area = d3.area()
          .curve(d3.curveBasis)
          .x(function(d) {return x(d[ config.keys[0]]); })
          .y0(height)
          .y1(function(d) {  return y(d[ config.keys[i] ]); })
        ;
        svg.append("path")
          .data([data])
          
          .attr("id", config.keys[i] + "path")
          .attr("d", area)
          .attr("class", function(d){
            return config.classMap [[config.keys[i]]];
          })
        ;      
      }


      //create the areas
      /*
      var area = d3.area()
        .curve(d3.curveBasis)
        .x(function(d) { return x(d.date); })
        .y0(height)
        .y1(function(d) { return y(d.close); })
      //  .interpolate("basis") //smooth lines 
        ;
      var areatwo = d3.area()
        .curve(d3.curveBasis)
        .x(function(d) { return x(d.date); })
        .y0(height)
        .y1(function(d) { return y(d.pin); })
    //    .interpolate("basis") //smooth lines 
        ;

          svg.append("path")
          .data([data])
          
          .attr("id", "lastpath")
          .attr("d", area)
          .attr("class", function(d){
            return config.classMap [[config.keys[1]]]
          })
          ;          

        svg.append("path")
          .datum(data)
          .attr("class", "area")
          .attr("id", "currentpath")
          .attr("d", areatwo)
          .attr("class", function(d){
            return config.classMap [[config.keys[2]]];
          })
          ;*/
    }) //end yearly plot
}//end drawsmoothline

//tagName, id of checkbox, id of path
function updateLine(tagName, idName){
  var target = document.getElementById(idName);
  //console.log("update line called", tagName, idName);
  if(hasClass(target, "active")){
    transitionOut( tagName, idName );
  }
  else{
    transitionIn ( tagName, idName);
  }
}