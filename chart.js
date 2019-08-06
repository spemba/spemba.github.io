async function chart_bar_deaths() {
    var width = document.getElementById('chartArea').clientWidth;
    //this allows us to collect the width of the div where the SVG will go.
    var height = width / 2.236;
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
    colorScale.domain(data.map(function (d){ return d.country; }));    
    svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
            .selectAll('rect').data(data).enter().append('rect')
            .attr('x', function(d){return xscale(d.country);})
            .attr('y', function(d){return yscale(d.deaths);})
            .attr('width', xscale.bandwidth())
            .attr('height', function(d){return height - margin.top - margin.bottom - yscale(d.deaths);})
            .attr("fill", function (d){ return colorScale(d.country); });
    svg.append('g')
            .attr('transform', 'translate('+ margin.left +','+ margin.top +')')
            .call(d3.axisLeft(yscale));
    svg.append('g')
          .attr('transform', 'translate('+margin.left+','+ (height + margin.top) +')')
          .call(d3.axisBottom(xscale));
    svg.append("text")
          .attr("x", (width / 2))             
          .attr("y", height - (margin.bottom / 3))
          .attr("text-anchor", "middle")  
          .style("font-size", "16px") 
          .style("text-decoration", "underline")  
          .text("Total Ebola Deaths By Country"); 
    d3.select("#myChart")
          .select("p")
          .html("The virus caused major loss of life and socioeconomic disruption in the region.<br>"+
                "By the end of the epidemy in June 2016, Total loss of life topped 11,325 deaths.");
              
}``


//We will build a basic function to handle window resizing.
function resize() {
    width = document.getElementById('chartArea').clientWidth;
    height = width / 3.236;
    d3.select('#chartArea svg')
      .attr('width', width)
      .attr('height', height);
}

window.onresize = resize;
//Call our resize function if the window size is changed.