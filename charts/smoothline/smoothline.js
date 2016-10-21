function drawSmoothLine(){
  //generate initial chart from tsv
  updateChart();

  function updateChart() {

    //clear current graph
    var svgclear = d3.select("div#chartsmoothlineid");
    svgclear.selectAll("*").remove();

    //set margins for axes
    var margin = {top: 20, right: 20, bottom: 30, left: 50},
      width = 400- margin.left - margin.right,
      height = 115 - margin.top - margin.bottom;

    //draw the svg and put classes into the selected div
    var svgtwo = d3.select("div#chartsmoothlineid")
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
    d3.tsv("charts/smoothline/lineyearly.tsv", function(error, data) {
      if (error) throw error;

    //parses time into correct format
    var parseDate = d3.timeParse("%d-%b-%y");
    var formatTime = d3.timeParse("%e %B");
    var parseMonthYear = d3.timeParse("%b-%y");
      data.forEach(function(d) {
        d.date = parseMonthYear(d.date);
        d.close = +d.close;
        d.pin = +d.pin;

        console.log(d.date, d.close, d.pin);
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
        //.innerTickSize(-height)
        //.outerTickSize(0)
        .tickPadding(10)
     //   .tickFormat(d3.time.format("%b"))
        ;
      var yAxis = d3.axisLeft()
        .scale(y)
     //   .orient("left")
        .ticks(5)
        //.innerTickSize(-width)
        //.outerTickSize(0)
        .tickPadding(10)
        .tickFormat(function(d) { return d + "MM"; })
        ;

      //set domains
      x.domain(d3.extent(data, function(d) { return d.date; }));
      y.domain([0, d3.max(data, function(d) { return Math.max(d.close, d.pin); })]);

      //x axis
      svgtwo.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        ;
      //y axis
      svgtwo.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        ;

      //create the areas
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

      //select checkmark divs
      var curr = document.getElementById("current");
      var last = document.getElementById("last");

      //if checkmark is checked draw area
      if(hasClass(last, "active")){
          svgtwo.append("path")
          .datum(data)
          .attr("class", "area")
          .attr("d", area)
          //.style("stroke", "#00a9e0")
          .style("fill", "#8b8c8d")
          ;          
      }
      //if checkmark is checked draw area
      if(hasClass(curr, "active")){
        svgtwo.append("path")
          .datum(data)
          .attr("class", "area")
          .attr("d", areatwo)
          //.style("stroke", "#ff0000")
          .style("fill", "#00a9e0")
          ;
      }
    }) //end yearly plot
  } // end update chart function
}//end drawsmoothline