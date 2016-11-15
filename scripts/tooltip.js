export function initTooltip(tooltipId, tooltipClass) {
  d3.select("body")
    .append('div')
    .attr("id", tooltipId)
    .classed('hidden', true)
    .classed(tooltipClass, true);
}

// tooltipId: css id of the tooltip
// el = d3 element (not a selection, just a member of a selection)
export function positionTooltipByBox(tooltipId, el) {
  // bbox = bounding box, bbox is svg rect object with height, width, x and y values
  var bbox = el.getBBox();
  d3.select("#" + tooltipId)
    .classed("hidden", false)
    // need to pad bbox.x and y because of toggle bar and nav bar elements
    .style("left", (bbox.x - 140 + 320) + "px")
    .style("top", (bbox.y + 140) + "px");
}

export function hideTooltip(tooltipId){
  d3.select("#" + tooltipId).classed('hidden', true);
}

export function addTooltipHTML(tooltipId, htmlStr){
  d3.select("#" + tooltipId).html(htmlStr);
}


