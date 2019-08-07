async function chartBar() {
    scene = 2;
    var width = document.getElementById('chartArea').clientWidth;
    //this allows us to collect the width of the div where the SVG will go.
    var height = width / 3.236;
    var margin = {top: 40, right: 20, bottom: 30, left: 40};

    var xscale = d3.scaleBand().range([width - margin.left - margin.right, 0]);
    var yscale = d3.scaleLinear().domain([0,9000]).range([height - margin.top - margin.bottom,0]);
    
    d3.select("#myChart")
      .select("p")
      .html("The spread of the virus was rapid at the onset of the outbreak in 2014<br>"+ 
          "The number of new cases reported began to stabilize during late 2014 and early 2015<br>"+
          "within the three most affected countries");

    const data = await d3.csv("Data/cases_date.csv");
    var parseTime = d3.timeParse("%B %d, %Y");
    data.forEach(function(d) {
        d.cases = + d.cases;
        d.Date = parseTime(d.Date);
    });
    xscale.domain(data.map(function(d) { return d.Date; }));
    var svg = d3.select('#chartArea').append('svg')
                    .attr("width", width)
                    .attr("height", height);
                
        //We add our svg to the div area
    //We add our svg to the div area
    var tooltip = d3.select('#chartArea')
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "black")
    .style("border-radius", "5px")
    .style("padding", "10px")
    .style("color", "white")

    var formatTime = d3.timeFormat("%d-%b-%y");
    var showTooltip = function(d) {
    tooltip
        .transition()
        .duration(200)
    tooltip
        .style("opacity", 1)
        .html(formatTime(d.Date) + '<br>' +"Total cases: " + d.cases )
        .style("left", (d3.mouse(this)[0]+30) + "px")
        .style("top", (d3.mouse(this)[1]+30) + "px")
    }
    var moveTooltip = function(d) {
    tooltip
        .style("left", (d3.mouse(this)[0]+30) + "px")
        .style("top", (d3.mouse(this)[1]+30) + "px")
    }
    var hideTooltip = function(d) {
    tooltip
        .transition()
        .duration(200)
        .style("opacity", 0)
    }
    svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
            .selectAll('rect').data(data).enter().append('rect')
            .attr('x', function(d){return xscale(d.Date);})
            .attr('y', function(d){return yscale(d.cases);})
            .attr('width', xscale.bandwidth())
            .attr('height', function(d){return height - margin.top - margin.bottom - yscale(d.cases);})
            .attr('fill', "orange")
            .on("mouseover", showTooltip )
            .on("mousemove", moveTooltip )
            .on("mouseleave", hideTooltip );
    svg.append('g')
            .attr('transform', 'translate('+ margin.left +','+ margin.top +')')
            .call(d3.axisLeft(yscale));
    svg.append('g')
          .attr('transform', 'translate('+margin.left+','+ (height + margin.top ) +')')
          .call(d3.axisBottom(xscale));
          //.tickFormat(d3.timeFormat("%d-%b-%y"))
          //.tickValues(xscale.domain().filter(function(d,i){ return !(i%20)}));
    svg.append("text")
          .attr("x", (width / 2))             
          .attr("y", height - (margin.bottom / 3))
          .attr("text-anchor", "middle")  
          .style("font-size", "16px") 
          .style("text-decoration", "bold")  
          .text("Total Ebola Reported Cases over Time (Hover for Details)");    
}``

