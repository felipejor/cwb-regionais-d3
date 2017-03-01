var width = 960,
    height = 1160,
    mwidth = 500,
    mheight = 500;

var projection = d3.geo.albers()
    .center([-25.0, -50.0])
    .rotate([31.56, -25.978])
    .parallels([10.0, -40.0])
    .scale(100000)
    .translate([width / 2, height / 2]);

var path = d3.geo.path().projection(projection);
var svg = d3.select("body")
    .append("svg")
        .attr("width", mwidth)
        .attr("height", mheight);

function tooltipHtml(d) {
    return "<h4>" + d.properties.name + "</h4><table>"+
			"<tr><td>Dado1: </td><td>Valor1</td></tr>"+
            "<tr><td>Dado2: </td><td>Valor2</td></tr>"+
            "<tr><td>Dado3: </td><td>Valor3</td></tr>"+
            "<tr><td>Dado4: </td><td>Valor4</td></tr>"+
			"</table>";
}

function mouseOver(d){  
    d3.select("#tooltip").transition().duration(200).style("opacity", .9);
    d3.select("#tooltip")
        .html(tooltipHtml(d))
        .style("left", (d3.event.pageX) + "px")     
        .style("top", (d3.event.pageY - 28) + "px");
}

function mouseOut(){ 
    d3.select("#tooltip").transition().duration(500).style("opacity", 0);      
}


d3.json("regionais.topo.json", function(error, cwb) {
    var regionais = topojson.feature(cwb, cwb.objects.regionais);
    
    svg.selectAll(".regionais")
        .data(regionais.features).enter()
            .append("path")
                .attr("class", function(d) { return "regional " + d.properties.tag; })
                .attr("d", path)
                .on("mouseover", mouseOver).on("mouseout", mouseOut);

    svg.selectAll(".regional-label")
        .data(regionais.features).enter()
            .append("text")
                .attr("class", function(d) { return "regional-label " + d.id; })
      .attr("transform", function(d) { return "translate(" + path.centroid(d) + ")"; })
      .attr("dy", ".35em")
      .text(function(d) { return d.properties.name; });
});
