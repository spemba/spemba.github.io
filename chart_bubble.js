async function chartBubble() {
    var width = document.getElementById('chartArea').clientWidth;
    //this allows us to collect the width of the div where the SVG will go.
    var height = width / 2.236;
    var margin = {top: 40, right: 20, bottom: 30, left: 40};

    var xscale = d3.scaleBand().domain(['United Kingdom','Spain','Senegal','Italy','USA','Mali',
                                        'Nigeria','Liberia','Guinea','Sierra Leone'])
                .range([0,width - margin.left - margin.right]);
    var yscale = d3.scaleLinear().domain([0,8704]).range([height - margin.top - margin.bottom,0]);
    var rscale = d3.scaleLinear().domain([0,8704]).range([4, 80]);
    var colorScale = d3.scaleOrdinal(d3.schemeCategory10);
    
    const data = await d3.csv("Data/cases_counry.csv");
    data.forEach(function(d) {
        d.cases = + d.cases;
    });
    colorScale.domain(data.map(function (d){ return d.country; })); 
    var svg = d3.select('#chartArea').append('svg')
                    .attr("width", width)
                    .attr("height", height);
    
    d3.select("#myChart")
      .select("p")
      .html("The Western African Ebola virus epidemic was the most widespread outbreak<br>"+ 
      "of Ebola virus disease in history. The countries of Guinea, Liberia, and Sierra Leone<br>"+
      "were the most affected.");
    var tooltip = d3.select('#chartArea')
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "black")
    .style("border-radius", "5px")
    .style("padding", "10px")
    .style("color", "white");
    
    var showTooltip = function(d) {
    tooltip
        .transition()
        .duration(200)
    tooltip
        .style("opacity", 1)
        .html(d.country + '<br>' +"Total cases: " + d.cases )
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
         
        //We add our svg to the div area
    svg.append("rect")
        .attr("width", "100%")
        .attr("height", "90%")
        .attr("fill", "steelblue");  
    svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
            .selectAll('circle').data(data).enter().append('circle')
            .attr('cx', function(d){return Math.random() * (width - 120);})
            .attr('cy', function(d){return Math.random() * (height - 140);})
            .attr('r', function(d){return rscale(d.cases);})
            .attr("fill", function (d){ return colorScale(d.country); })
            .style("opacity", "0.7")
            .attr("stroke", "black")
            .on("mouseover", showTooltip )
            .on("mousemove", moveTooltip )
            .on("mouseleave", hideTooltip );
        svg.append("text")
            .attr("x", (width / 2))             
            .attr("y", height - (margin.bottom / 3))
            .attr("text-anchor", "middle")  
            .style("font-size", "16px") 
            .style("text-decoration", "underline")  
            .text("Total Ebola Cases By Country (Hover for Details)"); 
        
}``
chartBubble();

