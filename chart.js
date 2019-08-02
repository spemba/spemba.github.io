var width = document.getElementById('chartArea').clientWidth;
//this allows us to collect the width of the div where the SVG will go.
var height = width / 3.236;
var margin = {top: 40, right: 20, bottom: 30, left: 40}

const data = await d3.csv('ebola.csv'); // load file
var svg = d3.select('#chartArea').append('svg')
                .attr("width", width )
                .attr("height", height )
            .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    //We add our svg to the div area


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