export function initTooltip(tooltipId, tooltipClass) {
  d3.select("body")
    .append('div')
    .attr("id", tooltipId)
    .classed('hidden', true)
    .classed(tooltipClass, true);
}

// tooltipCenter is array[how far right, how far down]
export function positionTooltip(tooltipId, tooltipCenter) {
  d3.select("#" + tooltipId)
    .classed('hidden', false)
    .style('left', tooltipCenter[0] + "px")
    .style('top', tooltipCenter[1] + "px");
}

export function hideTooltip(tooltipId){
  d3.select("#" + tooltipId).classed('hidden', true);
}

export function addTooltipHTML(tooltipId, htmlStr){
  d3.select("#" + tooltipId).html(htmlStr);
}
