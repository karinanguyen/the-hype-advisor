var myData2 = "date,Yeezy v2 Cream (Size 6),Travis Scott Jordan 4 (Size 12),Serena OW AM97 (Size 10)\n20190117,292.00,408.00,900.00\n20190122,294.00,416.00,900.00\n20190127,305.00,429.00,915.00\n20190201,298.00,435.00,890.00\n20190206,294.00,426.00,915.00\n20190206,294.00,426.00,915.00\n20190211,293.00,434.00,915.00\n20190216,299.00,475.00,950.00\n20190221,311.00,462.00,950.00\n20190226,354.00,483.00,950.00\n20190301,364.00,450.00,950.00\n20190305,358.00,473.00,950.00\n20190310,355.00,476.00,910.00\n20190315,358.00,500.00,999.00\n20190320,365.00,487.00,999.00\n20190325,377.00,495.00,999.00\n20190330,383.00,474.00,999.00\n20190404,377.00,488.00,1000.00\n20190409,375.00,515.00,907.00\n20190414,377.00,520.00,1080.00\n20190419,358.00,485.00,1080.00\n20190424,355.00,481.00,1080.00\n20190429,351.00,513.00,1035.00\n20190504,360.00,503.00,1121.00\n20190509,367.00,516.00,1113.00\n20190514,368.00,528.00,1141.00\n20190519,367.00,544.00,1063.00\n20190524,375.00,504.00,1095.00\n20190529,391.00,520.00,1134.00\n20190603,376.00,529.00,1134.00\n20190608,393.00,541.00,1134.00/n20190613,394.00,526.00,1150.00/n20190618,395.00,505.00,1150.00\n20190623,388.00,540.00,1150.00\n20190628,400.00,547.00,1150.00\n20190703,415.00,559.00,1200.00\n20190708,419.00,537.00,1200.00\n20190713,408.00,549.00,1200.0\n20190718,418.00,553.00,1200.00";
var default_width2 = 250;
var default_height2 = 280;
var default_ratio2 = default_width2 / default_height2;

var margin2 = {
        top: 30,
        right: 30,
        bottom: 20,
        left: 30
    },
    width2 = default_width2 - margin2.left - margin2.right,
    height2 = default_height2 - margin2.top - margin2.bottom;

function scale() {
  if (window.innerWidth > 1300) {
    current_width2 = window.innerWidth * 0.21;
    current_height2 = window.innerWidth * 0.21;
  } else if (window.innerWidth > 600) {
    current_width2 = window.innerWidth * 0.23;
    current_height2 = window.innerWidth * 0.23;
  } else {
    current_width2 = window.innerWidth * 0.45;
    current_height2 = window.innerWidth * 0.45;
  }

  current_ratio2 = current_width2 / current_height2;

  if ( current_ratio2 > default_ratio2 ){
    h = current_height2;
    w = h * default_ratio2;
  } else {
    w = current_width2;
    h = w / default_ratio2;
  }

  width2 = w - margin2.left - margin2.right;
  height2 = h - margin2.top - margin2.bottom;

};

scale();

var parseDate = d3.time.format("%Y%m%d").parse;

var x2 = d3.time.scale()
    .range([0, width2]);

var y2 = d3.scale.linear()
    .range([height2, 0]);

var color2 = d3.scale.category20();


var xAxis2 = d3.svg.axis()
    .scale(x2)
    .orient("bottom");

var yAxis2 = d3.svg.axis()
    .scale(y2)
    .orient("left");

var line2 = d3.svg.line()
    .interpolate("basis")
    .x(function(d) {
        return x2(d.date);
    })
    .y(function(d) {
        return y2(d.price);
    });

var svg2 = d3.select("#stock2").append("svg")
    .attr("width", width2 + margin2.left + margin2.right)
    .attr("height", height2 + margin2.top + margin2.bottom)
    .style("fill", "white")
    .append("g")
    .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");

var data2 = d3.csv.parse(myData2)

color2.domain(d3.keys(data2[0]).filter(function(key) {

    return key !== "date";
}));

data2.forEach(function(d) {
    d.date = parseDate(d.date);
});

var cities2 = color2.domain().map(function(name) {
    return {
        name: name,
        values: data2.map(function(d) {
            return {
                date: d.date,
                price: +d[name]
            };
        })
    };
});

x2.domain(d3.extent(data2, function(d) {
    return d.date;
}));

y2.domain([
    d3.min(cities2, function(c) {
        return d3.min(c.values, function(v) {
            return v.price;
        });
    }),
    d3.max(cities2, function(c) {
        return d3.max(c.values, function(v) {
            return v.price;
        });
    })
]);

var legend2 = svg2.selectAll('g')
    .data(cities2)
    .enter()
    .append('g')
    .attr('class', 'legend2')


legend2.append('rect')
    .attr('x', width2 - 80)
    .attr('y', function(d, i) {
        return i * 20;
    })
    .attr('width', 10)
    .attr('height', 10)
    .style('fill', function(d) {
        return color2(d.name);
    });

legend2.append('text')
    .attr('x', width2 - 65)
    .attr('y', function(d, i) {
        return (i * 20) + 9;
    }).attr('fill', 'white')
    .text(function(d) {
        return d.name;
    });

svg2.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height2 + ")")
    .style("fill", "white")
    .call(xAxis2);

svg2.append("g")
    .attr("class", "y axis")
    .call(yAxis2)

svg2.append("text")
        .attr("x", (width2 / 2))             
        .attr("y", 0 - (margin2.top / 2))
        .attr("text-anchor", "middle")  
        .style("font-size", width2 / 15) 
        .text("Stock Prices (Biotech)");

var city2 = svg2.selectAll(".city2")
    .data(cities2)
    .enter().append("g")
    .attr("class", "city2");

city2.append("path")
    .attr("class", "line2")
    .attr("d", function(d) {
        return line2(d.values);
    })
    .style("stroke", function(d) {
        return color2(d.name);
    });

city2.append("text")
    .datum(function(d) {
        return {
            name: d.name,
            value: d.values[d.values.length - 1]
        };
    }).attr('fill', 'white')
    .attr("transform", function(d) {
        console.log(d.value.date)
        return "translate(" + x(d.value.date) + "," + y(d.value.price) + ")";
    })
    .attr("x", 3)
    .attr("dy", ".35em").attr('fill', 'white')
    .text(function(d) {
        return d.name;
    }).attr('fill', 'white');

var mouseG2 = svg2.append("g")
    .attr("class", "mouse-over-effects");

mouseG2.append("path") // this is the black vertical line2 to follow mouse
    .attr("class", "mouse-line2")
    .style("stroke", "white")
    .style("stroke-width2", "1px")
    .style("opacity", "0");

var line2s = document.getElementsByClassName('line2');

var mousePerline2 = mouseG2.selectAll('.mouse-per-line2')
    .data(cities2)
    .enter()
    .append("g")
    .attr("class", "mouse-per-line2");

mousePerline2.append("circle")
    .attr("r", 5)
    .style("stroke", function(d) {
        return color2(d.name);
    })
    .style("fill", "none")
    .style("stroke-width2", "1px")
    .style("opacity", "0");

mousePerline2.append("text")
    .attr("transform", "translate(10,3)")
    .attr('fill', 'white');

mouseG2.append('svg:rect') // append a rect to catch mouse movements on canvas
    .attr('width', width2) // can't catch mouse events on a g element
    .attr('height', height2)
    .attr('fill', 'none')
    .attr('pointer-events', 'all')
    .on('mouseout', function() { // on mouse out hide line2, circles and text
        d3.select(".mouse-line2")
            .style("opacity", "0");
        d3.selectAll(".mouse-per-line2 circle")
            .style("opacity", "0");
        d3.selectAll(".mouse-per-line2 text")
            .style("opacity", "0");

    })
    .on('mouseover', function() { // on mouse in show line2, circles and text
        d3.select(".mouse-line2")
            .style("opacity", "1");
        d3.selectAll(".mouse-per-line2 circle")
            .style("opacity", "1");
        d3.selectAll(".mouse-per-line2 text")
            .style("opacity", "1");
    })
    .on('mousemove', function() { // mouse moving over canvas
        var mouse = d3.mouse(this);
        d3.select(".mouse-line2")
            .attr("d", function() {
                var d = "M" + mouse[0] + "," + height2;
                d += " " + mouse[0] + "," + 0;
                return d;
            });

        d3.selectAll(".mouse-per-line2")
            .attr("transform", function(d, i) {
                console.log(width2 / mouse[0])
                var xDate = x2.invert(mouse[0]),
                    bisect = d3.bisector(function(d) {
                        return d.date;
                    }).right;
                idx = bisect(d.values, xDate);

                var beginning = 0,
                    end = line2s[i].getTotalLength(),
                    target = null;

                while (true) {
                    target = Math.floor((beginning + end) / 2);
                    pos = line2s[i].getPointAtLength(target);
                    if ((target === end || target === beginning) && pos.x !== mouse[0]) {
                        break;
                    }
                    if (pos.x > mouse[0]) end = target;
                    else if (pos.x < mouse[0]) beginning = target;
                    else break; //position found
                }

                d3.select(this).select('text')
                    .text(y2.invert(pos.y).toFixed(2));


                return "translate(" + mouse[0] + "," + pos.y + ")";
            });
    });