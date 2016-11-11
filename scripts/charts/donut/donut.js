//import {tip} from 'charts/tip';
import {hasClass} from 'charts/helper';

var allData;

//draw donut
export function drawDonut(config) {
  //initialize tool tip
  /*var tiptwo = d3.tip()
    .attr('class', 'd3-tip')
    .offset([0, 0])
    .html(function(d) {
      return "<strong>" + d.data.transactionType + ":</strong> <span>" + d.data.number + "</span>";
    })
  svg.call(tiptwo);*/
  
  //variable declarations
  var radius = Math.min( config.width, config.height) / 2;
  var innerRad = radius / 4;
  var hoverRad = 15;
  var padAngle = 0.03;

  //add the svg and relevant classes
  var svg = d3.select(config.parentDiv)
    .classed("svg-container", true)
    .append("svg")
    .attr("viewBox", "0 0 " + config.width + " " + config.height)
    //class to make it responsive
    .classed("svg-content-responsive-pie", true)
    .attr("width", config.width)
    .attr("height", config.height)
    .append("g")
    .attr("id", "donutchart")
    .attr("transform", "translate(" + config.width / 2 + "," + config.height / 2 + ")")
  ;

  //sizing for arc segments
  var arc = d3.arc()
    .outerRadius(radius) 
    .innerRadius(radius - innerRad) 
  ;

  //sizing for hover arc segments
  var hoverArc = d3.arc()
    .innerRadius(radius - innerRad)
    .outerRadius(radius + hoverRad)
  ;

  //pie config
  var pie = d3.pie()
    .sort(null)
    .value(function(d) {
      //return the numbers in csv(column 2)
      return d[ config.keys[1] ];
    })
    .padAngle(padAngle)
  ;

  //get and plot data
  d3.csv(config.filePath, type, function(error, data) {
    if (error) throw error;

    //get the divs of all the checkboxes
    var divs = [];
    for (var i =0; i< config.checkboxIds.length; i++){
      divs[i] =  document.getElementById( config.checkboxIds[i] )
    }

    //make a copy of the data for update function
    allData = data;


    //console.log("data", data);
    //console.log(data[0][0]);

    //get the sum for the inner text 
    var sum = 0;
    data.forEach(function(d, j) {
      for (var i=0; i< config.checkboxIds.length; i++)
      {
        if ( hasClass( divs[i], "active") && d[config.keys[i]] == d[config.keys[j]] )
        {
          sum+= d[ config.keys[1]];
        }
      }
    })

    //add arc elements
    var g = svg.selectAll(".arc")
      .data(pie(data))
      .enter().append("g")
      .attr("class", "arc")
      //.on('mouseover', tiptwo.show)
      //.on('mouseout', tiptwo.hide)
    ;

    //add path elements and define hover behavior
    g.append("path")
      .attr("d", arc)
      .attr("class", function(d){
        return config.colorMap [ d.data[config.keys[0]] ];
      })
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
    ;

    //add text for inner circle
    svg.append("text")
      .attr("dy", "-0.5em")
      .style("text-anchor", "middle")
      .attr("class", "inside")
      .text(function() {
        return config.innerText;
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

  //return data as number
  function type(d) {
    d[ config.keys[1]] = +d[ config.keys[1]];
    return d;
  }

}//end drawDonut

export function updateDonut() {


  //initialize tool tip
  /*var tiptwo = d3.tip()
    .attr('class', 'd3-tip')
    .offset([0, 0])
    .html(function(d) {
      return "<strong>" + d.data.transactionType + ":</strong> <span>" + d.data.number + "</span>";
    })
  svg.call(tiptwo);*/


  var svg = d3.select("g#donutchart");
  var auth = document.getElementById("auth");
  var chargeBack = document.getElementById("chargeback");
  var decline = document.getElementById("decline");

  var newdata = allData.filter(function(d) {
      if (d.transactionType == "Authorizations") {
        if (!d3.select("#auth").classed("active")) {
          return true;
        } else return false;
      }

      return true;


      /*if(d.transactionType == "Authorizations"){
        if (hasClass(auth, "active")){
          return false;
        }
        else return true;
      }
      if(d.transactionType == "Chargebacks"){
        if (hasClass(chargeback, "active")){
          return false;
        }
        else return true;
      }
      if(d.transactionType == "Declines"){
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
      return d[ config.keys[1]];
    })
    .padAngle(.03)
    (newdata)
    ;

  //select path divs for merge
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
      return config.colorMap [ d.data[config.keys[0]] ];
    })

  .merge(path)
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
    .data(pie)
    .transition()
    .duration(1000)
    .attrTween("d", arcTween)
    ;

  var g = svg.selectAll(".arc")
    .data(pie);
  /*g
    .on('mouseover', tiptwo.show)
    .on('mouseout', tiptwo.hide)
  */
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

