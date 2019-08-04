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
    console.log('Running chart scipt now...');
    console.log(width);
    console.log(height);
    const data = await d3.csv("Data/cases_counry.csv");
    //d3.tsv('Data/totalcases_country.csv'); // load file
    data.forEach(function(d) {
        d.cases = + d.cases;
    });
    console.log(data.columns);
    console.log(data);
    var svg = d3.select('#chartArea').append('svg')
                    .attr("width", width)
                    .attr("height", height);
                
        //We add our svg to the div area
    svg.append("rect")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("fill", "pink");   
    svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
            .selectAll('circle').data(data).enter().append('circle')
            .attr('cx', function(d){return Math.random() * (width - 120);})
            .attr('cy', function(d){return Math.random() * (height - 140);})
            .attr('r', function(d){return rscale(d.cases);})
            .style("fill", "#69b3a2")
            .style("opacity", "0.7")
            .attr("stroke", "black");
        
}``
chartBubble();
