async function chart_bar_deaths() {
    scene = 3;
    var width = document.getElementById('chartArea').clientWidth;
    //this allows us to collect the width of the div where the SVG will go.
    var height = width / 3.236;
    var margin = {top: 40, right: 20, bottom: 30, left: 40};

    var xscale = d3.scaleBand().domain(['Liberia','Sierra Leone','Guinea','Italy','Nigeria',
                                         'Mali','USA','United Kingdom','Spain','Senegal'])
                .range([0,width - margin.left - margin.right]);
    var yscale = d3.scaleLinear().domain([0,4000]).range([height - margin.top - margin.bottom,0]);
    var colorScale = d3.scaleOrdinal(d3.schemeCategory10);
    const data = await d3.csv("Data/deaths_country.csv");
    data.forEach(function(d) {
        d.deaths = + d.deaths;
    });
    var svg = d3.select('#chartArea').append('svg')
                    .attr("width", width)
                    .attr("height", height);
                
        //We add our svg to the div area
        var tooltip = d3.select('#chartArea')
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("background-color", "black")
        .style("border-radius", "5px")
        .style("padding", "10px")
        .style("color", "white")
    
    
        var showTooltip = function(d) {
        tooltip
            .transition()
            .duration(200)
        tooltip
            .style("opacity", 1)
            .html(d.country + '<br>' +"Total deaths: " + d.deaths )
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
             
    colorScale.domain(data.map(function (d){ return d.country; }));    
    svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
            .selectAll('rect').data(data).enter().append('rect')
            .attr('x', function(d){return xscale(d.country);})
            .attr('y', function(d){return yscale(d.deaths);})
            .attr('width', xscale.bandwidth())
            .attr('height', function(d){return height - margin.top - margin.bottom - yscale(d.deaths);})
            .attr("fill", function (d){ return colorScale(d.country); })
            .on("mouseover", showTooltip )
            .on("mousemove", moveTooltip )
            .on("mouseleave", hideTooltip );
    svg.append('g')
            .attr('transform', 'translate('+ margin.left +','+ margin.top +')')
            .call(d3.axisLeft(yscale));
    svg.append('g')
          .attr('transform', 'translate('+margin.left+','+ (height - margin.top + margin.bottom/3) +')')
          .call(d3.axisBottom(xscale));
    svg.append("text")
          .attr("x", (width / 2))             
          .attr("y", margin.top)
          .attr("text-anchor", "middle")  
          .style("font-size", "16px") 
          .style("text-decoration", "bold")  
          .text("Total Ebola Deaths By Country (Hover for Details)"); 
    d3.select("#myChart")
          .select("p")
          .html("The virus caused major loss of life and socioeconomic disruption in the region.<br>"+
                "By the end of the epidemy in June 2016, Total loss of life topped 11,325 deaths.");

    // tooltips
    var div = d3.select('#chartArea').append('div')
        .attr('class', 'tooltip')
        .style('display', 'none');
    function mouseover(){
        div.style('display', 'inline');
    }
    function mousemove(){
        var d = d3.select(this).data()[0]
        div
            .html(d.country + '<hr/>' + d.deaths)
            .style('left', (d3.event.pageX ) + 'px')
            .style('top', (d3.event.pageY) + 'px');
    }
    function mouseout(){
        div.style('display', 'none');
    }
              
}``


