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
    svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
            .selectAll('rect').data(data).enter().append('rect')
            .attr('x', function(d){return xscale(d.Date);})
            .attr('y', function(d){return yscale(d.cases);})
            .attr('width', xscale.bandwidth())
            .attr('height', function(d){return height - margin.top - margin.bottom - yscale(d.cases);})
            .attr('fill', "orange");
    svg.append('g')
            .attr('transform', 'translate('+ margin.left +','+ margin.top +')')
            .call(d3.axisLeft(yscale));
    svg.append('g')
          .attr('transform', 'translate('+margin.left+','+ (height + margin.top ) +')')
          .call(d3.axisBottom(xscale))
         // .tickFormat(d3.timeFormat("%d-%b-%y"))
         // .tickValues(x.domain().filter(function(d,i){ return !(i%20)}));
    svg.append("text")
          .attr("x", (width / 2))             
          .attr("y", height - (margin.bottom / 3))
          .attr("text-anchor", "middle")  
          .style("font-size", "16px") 
          .style("text-decoration", "bold")  
          .text("Total Ebola Reported Cases over Time (Hover for Details)");    
}``

