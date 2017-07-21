d3.custom = {};
d3.custom.barChart = function module(){

	var margin = {top:20, right:20, bottom:120, left:80};
	var width = 400;
	var height = 300;
	var gap = 0;
	var _index = 0;
	
	var svg;
	
	var year = '';

	
	
	
	
	function exports(_selection) {
        _selection.each(function(_data) {
        
        	console.log(_data);
        
        	var chartW = width - margin.left - margin.right,
                chartH = height - margin.top - margin.bottom;
        
        	var x = d3.scale.ordinal()
        		.domain(_data.map(function(d) { return d.Country; }))
        		.rangeRoundBands([0, chartW], .4);
			var y = d3.scale.linear()
			    .domain((d3.extent(_data, function(d) { return parseInt(d[year]); })))
			    .nice()
			    .range([chartH,0]);
			    
			console.log(y.domain());
			console.log(year);
			    
			var xAxis = d3.svg.axis()
                    .scale(x)
                    .orient("bottom");

            var yAxis = d3.svg.axis()
                    .scale(y)
                    .ticks(8)
                    .orient("left");
            
             var barW = width / _data.length;
             
             if (!svg) {
                svg = d3.select(this)
                    .append("svg")
                    .classed("chart", true);
                var container = svg.append("g").classed("container-group", true);
                container.append("g").classed("chart-group", true);
                container.append("g").classed("x-axis-group axis", true);
                container.append("g").classed("y-axis-group axis", true);
            }
        	
        	
        	svg.transition().attr({width: width, height: height});
            svg.select(".container-group")
                .attr({transform: "translate(" + margin.left + "," + margin.top + ")"});

            svg.select(".x-axis-group.axis")
                .attr({transform: "translate(0," + (chartH) + ")"})
                .call(xAxis)
                .selectAll("text")	
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", function(d) {
                return "rotate(-65)" 
                });


            svg.select(".y-axis-group.axis")
                .transition()
                .call(yAxis);
            
            var gapSize = x.rangeBand() / 100 * gap;
            var barW = x.rangeBand() - gapSize;
			

            var bars = svg.select(".chart-group")
                    .selectAll(".bar")
                    .data(_data);
                    
            bars.enter().append("rect")
                .classed("bar", true)
                .attr("x", function(d) { return x(d.Country); })
      			.attr("y", function(d) { return y(d[year]); })
      			.attr("width", barW)
      			.attr("height", function(d) { return chartH - y(d[year]); })
      			.attr("fill","#2166ac");
               
        	
        	bars.transition()
        	 .attr("x", function(d) { return x(d.Country); })
      			.attr("y", function(d) { return y(d[year]); })
      			.attr("width", barW)
      			.attr("height", function(d) { return chartH - y(d[year]); });

        	
            bars.exit().transition().style({opacity: 0}).remove();
        
        });
        
    }
    
    exports.width = function(_x) {
        if (!arguments.length) return width;
        width = parseInt(_x);
        return this;
    };
    exports.height = function(_x) {
        if (!arguments.length) return height;
        height = parseInt(_x);
        return this;
    };
    
    exports._index = function(_x) {
        if (!arguments.length) return _index;
        _index = parseInt(_x);
        return this;
    };
    
    exports.year = function(_x) {
        if (!arguments.length) return year;
        year = parseInt(_x);
        return this;
    };

    return exports;
} 












