var allData;
var width = 500,
  height = 500,
  radius = Math.min(width, height) / 2;
var innerrad = radius / 3;

var arc = d3.arc()
  .outerRadius(radius)
  .innerRadius(radius - innerrad)
  ;

var arcOver = d3.arc()
  .innerRadius(radius - innerrad)
  .outerRadius(radius + 15)
  ;


//draw donut
function drawDonut() {
  //draw the pie 
  var svg = d3.select("div#donutid")
    .classed("svg-container", true)
    .append("svg")
    //.attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", "0 0 " + width + " " + height)
    //class to make it responsive
    .classed("svg-content-responsive-pie", true)
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("id", "donutchart")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
    //.style("opacity", "1")
  ;

  //pie config
  var pie = d3.pie()
    .sort(null)
    .value(function(d) {
      return d.population;
    })
    .padAngle(.02);

  //plot data
  d3.csv("charts/donut/donutdata.csv", type, function(error, data) {
    if (error) throw error;


    //select checkbox divs
    var auth = document.getElementById("auth");
    var chargeBack = document.getElementById("chargeback");
    var decline = document.getElementById("decline");

    allData = data;

    //initialize tool tip
    var tiptwo = d3.tip()
      .attr('class', 'd3-tip')
      .offset([0, 0])
      .html(function(d) {
        return "<strong>" + d.data.age + ":</strong> <span>" + d.data.population + "</span>";
      })
    svg.call(tiptwo);

    //sum for center text
    var sum = 0;
    data.forEach(function(d) {
      if (hasClass(auth, "active") && d.age == "Authorizations") {
        sum += d.population;
      }
      if (hasClass(chargeback, "active") && d.age == "Chargebacks") {
        sum += d.population;
      }
      if (hasClass(decline, "active") && d.age == "Declines") {
        sum += d.population;
      }
    });

    //add hover tooltip
    var g = svg.selectAll(".arc")
      .data(pie(data))
      .enter().append("g")
      .attr("class", "arc")
      .on('mouseover', tiptwo.show)
      .on('mouseout', tiptwo.hide)
      ;



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
      .text(function() {
        return 'TOTAL TRANS';
      })
      ;
    svg.append("text")
      .attr("dy", ".95em")
      .style("text-anchor", "middle")
      .attr("class", "data")
      .text(function() {
        return sum;
      })
      ;

  }); //end d3 read

}

function updateDonut() {
  var svg = d3.select("g#donutchart");
  var auth = document.getElementById("auth");
  var chargeBack = document.getElementById("chargeback");
  var decline = document.getElementById("decline");

  var newdata = allData.filter(function(d) {
      if (d.age == "Authorizations") {
        if (!d3.select("#auth").classed("active")) {
          return true;
        } else return false;
      }

      return true;


      /*if(d.age == "Authorizations"){
        if (hasClass(auth, "active")){
          return false;
        }
        else return true;
      }
      if(d.age == "Chargebacks"){
        if (hasClass(chargeback, "active")){
          return false;
        }
        else return true;
      }
      if(d.age == "Declines"){
        if (hasClass(decline, "active")){
          return false;
        }
        else return true;
      }*/

    })

  //pie config
  var pie = d3.pie()
    .sort(null)
    .value(function(d) {
      return d.population;
    })
    .padAngle(.03)
    (newdata)
    ;

  //initialize tool tip
  var tiptwo = d3.tip()
    .attr('class', 'd3-tip')
    .offset([0, 0])
    .html(function(d) {
      return "<strong>" + d.data.age + ":</strong> <span>" + d.data.population + "</span>";
    })
  svg.call(tiptwo);


  var path = svg.selectAll("path");
  var g = svg.selectAll(".arc")
    .data(pie)
    ;

  g
    .exit("path").transition()
    .duration(1000)
    .style("opacity", 0)
    //.attr("d", arcTweenOut)
    .remove()
    ;

  g
    .enter().append("g")
    .attr("class", "arc")
    .append("path")
    .style("fill", function(d) {
      if (d.data.age == "Authorizations")
        return "#40c1ac";
      if (d.data.age == "Declines")
        return "#fd0000";
      if (d.data.age == "Chargebacks")
        return "#ffa300";
    })

  .merge(path)
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
    .data(pie)
    .transition()
    .duration(1000)
    .attrTween("d", arcTween)
    ;

  var g = svg.selectAll(".arc")
    .data(pie);
  g
    .on('mouseover', tiptwo.show)
    .on('mouseout', tiptwo.hide)

  function arcTween(a) {
    var startAngle = a.startAngle; //<-- keep reference to start angle
    var i = d3.interpolate(a.startAngle, a.endAngle); //<-- interpolate start to end
    return function(t) {
      return arc({ //<-- return arc at each iteration from start to interpolate end
        startAngle: startAngle,
        endAngle: i(t) - 0.02
      });
    };
  }

}

//return data as number
function type(d) {
  d.population = +d.population;
  return d;
}