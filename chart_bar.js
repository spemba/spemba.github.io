async function chartBar() {
    var width = document.getElementById('chartArea').clientWidth;
    //this allows us to collect the width of the div where the SVG will go.
    var height = width / 2.236;
    var margin = {top: 40, right: 20, bottom: 30, left: 40};

    var xscale = d3.scaleBand().domain([0, 70])
                .range([0,width - margin.left - margin.right]);
    var yscale = d3.scaleLinear().domain([0,9000]).range([height - margin.top - margin.bottom,0]);
    console.log('Running chart scipt now...');
    console.log(width);
    console.log(height);
    const data = await d3.csv("Data/cases_date.csv");
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
        
    svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
            .selectAll('rect').data(data).enter().append('rect')
            .attr('x', function(d, i){return xscale(i);})
            .attr('y', function(d){return yscale(d.cases);})
            .attr('width', xscale.bandwidth())
            .attr('height', function(d){return height - margin.top - margin.bottom - yscale(d.cases);} );
    svg.append('g')
            .attr('transform', 'translate('+ margin.left +','+ margin.top +')')
            .call(d3.axisLeft(yscale));
    svg.append('g')
          .attr('transform', 'translate('+margin.left+','+ (height + margin.top) +')')
          .call(d3.axisBottom(xscale));
        
}``
chartBar();
