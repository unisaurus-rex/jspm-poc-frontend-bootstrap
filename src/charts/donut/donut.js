//draw donut
function drawDonut(){
  //clear current chart
  var svgclear = d3.select("div#donutid");
  svgclear.selectAll("*").remove();

  //select checkbox divs
  var auth = document.getElementById("auth");
  var chargeBack = document.getElementById("chargeback");
  var decline = document.getElementById("decline");

   //set sizes
  console.log ();
  var width =  500,
      height =  500,
      radius = Math.min(width, height) / 2;
  var innerrad = radius/3;

  //set size of outer arc
  var arc = d3.arc()
      .outerRadius(radius)
      .innerRadius(radius - innerrad);

  //pie config
  var pie = d3.pie()
      .sort(null)
      .value(function(d) { return d.population; })
      .padAngle(.05)
      ;

  //draw the pie 
  var svg = d3.select("div#donutid")
    .classed("svg-container", true)
    .append("svg")
    //.attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox","0 0 " + width + " " + height)
    //class to make it responsive
    .classed("svg-content-responsive-pie", true)
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  //Draw the inner Circle
  /*svg.append("circle")
    .attr("cx", 0)
    .attr("cy", 0)
    .attr("r", 500)
    .attr("fill", "white");*/

  //initialize tool tip
  var tiptwo = d3.tip()
    .attr('class', 'd3-tip')
    .offset([0, 0])
    .html(function(d) {
      return "<strong>" + d.data.age +":</strong> <span>" + d.data.population  + "</span>";
    })
  svg.call(tiptwo);

  //plot data
  d3.csv("charts/donut/donutdata.csv", type, function(error, data) {
    if (error) throw error;

  //filter data
  data = data.filter(function(d){  
        if(d.age == "Authorizations"){
          if (hasClass(auth, "active")){
            return true;
          }
        }
        if(d.age == "Chargebacks"){
          if (hasClass(chargeback, "active")){
            return true;
          }
        }
        if(d.age == "Declines"){
          if (hasClass(decline, "active")){
            return true;
          }
        }
        else{
          return false;
        }
        
      })

  //sum for center text
  var sum =0;
    data.forEach(function(d) {
      if(hasClass(auth, "active") && d.age == "Authorizations"){
        sum += d.population;
      }

      if(hasClass(chargeback, "active") && d.age == "Chargebacks"){
        sum += d.population;
      }

      if(hasClass(decline, "active") && d.age == "Declines"){
        sum += d.population;
      }
      console.log(sum);
  });

  //add hover tooltip
  var g = svg.selectAll(".arc")
    .data(pie(data))
    .enter().append("g")
    .attr("class", "arc")
    .on('mouseover', tiptwo.show)
    .on('mouseout', tiptwo.hide)
    ;

  //hover circle
  var arcOver = d3.arc()
    .innerRadius(radius-innerrad)
    .outerRadius(radius + 15);

  //plot the data and create the hover transitions
  g.append("path")
    .attr("d", arc)
    .style("fill", function(d) { 
      if (d.data.age == "Authorizations")
        return "#40c1ac";
      if (d.data.age == "Declines")
        return "#fd0000";
      if (d.data.age == "Chargebacks")
        return "#ffa300";
      })
    .on("mouseover", function(d) {
      d3.select(this).transition()
        .duration(1000)
        .attr("d", arcOver);
    })
    .on("mouseout", function(d) {
      d3.select(this).transition()
        .duration(1000)
        .attr("d", arc);
    })
  ;

  //set text for inner circle
  svg.append("text")
    .attr("dy", "-0.5em")
    .style("text-anchor", "middle")
    .attr("class", "inside")
    .text(function() { return 'TOTAL TRANS'; });
  svg.append("text")
    .attr("dy", ".95em")
    .style("text-anchor", "middle")
    .attr("class", "data")
    .text(function() { return sum;  });
  
  }); //end d3 read

  //return data as number
  function type(d) {
    d.population = +d.population;
    return d;
  }

}
