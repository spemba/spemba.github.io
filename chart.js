var width = document.getElementById('chartArea').clientWidth;
//this allows us to collect the width of the div where the SVG will go.
var height = width / 3.236;
var margin = {top: 40, right: 20, bottom: 30, left: 40}

var xscale = d3.scaleBand().domain(['United Kingdom','Spain','Senegal','Italy','USA','Mali',
                                'Nigeria','Liberia','Guinea','Sierra Leone'])
            .range([0,width - margin.left - margin.right]);
var yscale = d3.scaleLinear().domain([0, 9000]).range([height - margin.top - margin.bottom,0]);

const data = await d3.csv('Data/totalcases_country.csv'); // load file
var svg = d3.select('#chartArea').append('svg')
                .attr("width", width )
                .attr("height", height )
            .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    //We add our svg to the div area
    
    svg.selectAll('rect').data(data).enter().append('rect')
        .attr('x', function(d, i){return xscale(i);})
        .attr('y', function(d, i){return yscale(d);})
        .attr('width', xscale.bandwidth())
        .attr('height', function(d, i){return height-margin.top-margin.bottom - yscale(d);} );


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