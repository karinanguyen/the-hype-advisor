var myData4 = "date,Yeezy v2 Cream (Size 6),Travis Scott Jordan 4 (Size 12),Serena OW AM97 (Size 10)\n20190117,292.00,408.00,900.00\n20190122,294.00,416.00,900.00\n20190127,305.00,429.00,915.00\n20190201,298.00,435.00,890.00\n20190206,294.00,426.00,915.00\n20190206,294.00,426.00,915.00\n20190211,293.00,434.00,915.00\n20190216,299.00,475.00,950.00\n20190221,311.00,462.00,950.00\n20190226,354.00,483.00,950.00\n20190301,364.00,450.00,950.00\n20190305,358.00,473.00,950.00\n20190310,355.00,476.00,910.00\n20190315,358.00,500.00,999.00\n20190320,365.00,487.00,999.00\n20190325,377.00,495.00,999.00\n20190330,383.00,474.00,999.00\n20190404,377.00,488.00,1000.00\n20190409,375.00,515.00,907.00\n20190414,377.00,520.00,1080.00\n20190419,358.00,485.00,1080.00\n20190424,355.00,481.00,1080.00\n20190429,351.00,513.00,1035.00\n20190504,360.00,503.00,1121.00\n20190509,367.00,516.00,1113.00\n20190514,368.00,528.00,1141.00\n20190519,367.00,544.00,1063.00\n20190524,375.00,504.00,1095.00\n20190529,391.00,520.00,1134.00\n20190603,376.00,529.00,1134.00\n20190608,393.00,541.00,1134.00\n20190613,394.00,526.00,1150.00\n20190618,395.00,505.00,1150.00\n20190623,388.00,540.00,1150.00\n20190628,400.00,547.00,1150.00\n20190703,415.00,559.00,1200.00\n20190708,419.00,537.00,1200.00\n20190713,408.00,549.00,1200.0\n20190718,418.00,553.00,1200.00";
var default_width4 = 250;
var default_height4 = 280;
var default_ratio4 = default_width4 / default_height4;

var margin4 = {
        top: 30,
        right: 30,
        bottom: 60,
        left: 30
    },
    width4 = default_width4 - margin4.left - margin4.right,
    height4 = default_height4 - margin4.top - margin4.bottom;

function scale() {
  if (window.innerWidth > 1300) {
    current_width4 = window.innerWidth * 0.21;
    current_height4 = window.innerWidth * 0.21;
  } else if (window.innerWidth > 600) {
    current_width4 = window.innerWidth * 0.23;
    current_height4 = window.innerWidth * 0.23;
  } else {
    current_width4 = window.innerWidth * 0.45;
    current_height4 = window.innerWidth * 0.45;
  }

  current_ratio4 = current_width4 / current_height4;

  if ( current_ratio4 > default_ratio4 ){
    h = current_height4;
    w = h * default_ratio4;
  } else {
    w = current_width4;
    h = w / default_ratio4;
  }

  width4 = w - margin4.left - margin4.right;
  height4 = h - margin4.top - margin4.bottom;

};

scale();

var parseDate = d3.time.format("%Y%m%d").parse;

var x4 = d3.time.scale()
    .range([0, width4]);

var y4 = d3.scale.linear()
    .range([height4, 0]);

var color4 = d3.scale.ordinal().range(["#70685C", "#A89C8C", "#E4D4BF"])

var xAxis4 = d3.svg.axis()
    .scale(x4)
    .orient("bottom");

var yAxis4 = d3.svg.axis()
    .scale(y4)
    .orient("left");

var line4 = d3.svg.line()
    .interpolate("basis")
    .x(function(d) {
        return x4(d.date);
    })
    .y(function(d) {
        return y4(d.price);
    });

var svg4 = d3.select("#stock3").append("svg")
    .attr("width", width4 + margin4.left + margin4.right)
    .attr("height", height4 + margin4.top + margin4.bottom)
    .style("fill", "white")
    .append("g")
    .attr("transform", "translate(" + margin4.left + "," + margin4.top + ")");

var data4 = d3.csv.parse(myData4)

color4.domain(d3.keys(data4[0]).filter(function(key) {

    return key !== "date";
}));

data4.forEach(function(d) {
    d.date = parseDate(d.date);
});

var cities4 = color4.domain().map(function(name) {
    return {
        name: name,
        values: data4.map(function(d) {
            return {
                date: d.date,
                price: +d[name]
            };
        })
    };
});

x4.domain(d3.extent(data4, function(d) {
    return d.date;
}));

y4.domain([
    d3.min(cities4, function(c) {
        return d3.min(c.values, function(v) {
            return v.price;
        });
    }),
    d3.max(cities4, function(c) {
        return d3.max(c.values, function(v) {
            return v.price;
        });
    })
]);

var legend4 = svg4.selectAll('g')
    .data(cities4)
    .enter()
    .append('g')
    .attr('class', 'legend4')


legend4.append('rect')
    .attr('x', width4 - 25)
    .attr('y', function(d, i) {
        return i * 20;
    })
    .attr('width', 10)
    .attr('height', 10)
    .style('fill', function(d) {
        return color4(d.name);
    });

legend4.append('text')
    .attr('x', width4 - 10)
    .attr('y', function(d, i) {
        return (i * 20) + 9;
    }).attr('fill', 'white')
    .text(function(d) {
        return d.name;
    });

svg4.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height4 + ")")
    .style("fill", "white")
    .call(xAxis4);

svg4.append("g")
    .attr("class", "y axis")
    .call(yAxis4)

svg4.append("text")
        .attr("x", (width4 / 2))             
        .attr("y", 0 - (margin4.top / 2))
        .attr("text-anchor", "middle")  
        .style("font-size", width4 / 15) 
        .text("Stock Prices (Indices)");

svg4.append("text")
        .attr("x", (width4 / 2))             
        .attr("y", height4 + 40)
        .attr("text-anchor", "middle")  
        .style("font-size", width4 / 15) 
        .text("S&P: 12.5%, NASDAQ: 16.04%, DJI: 11.27%");

var city4 = svg4.selectAll(".city4")
    .data(cities4)
    .enter().append("g")
    .attr("class", "city4");

city4.append("path")
    .attr("class", "line4")
    .attr("d", function(d) {
        return line4(d.values);
    })
    .style("stroke", function(d) {
        return color4(d.name);
    });

city4.append("text")
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

var mouseG4 = svg4.append("g")
    .attr("class", "mouse-over-effects");

mouseG4.append("path") // this is the black vertical line4 to follow mouse
    .attr("class", "mouse-line4")
    .style("stroke", "white")
    .style("stroke-width4", "1px")
    .style("opacity", "0");

var line4s = document.getElementsByClassName('line4');

var mousePerline4 = mouseG4.selectAll('.mouse-per-line4')
    .data(cities4)
    .enter()
    .append("g")
    .attr("class", "mouse-per-line4");

mousePerline4.append("circle")
    .attr("r", 5)
    .style("stroke", function(d) {
        return color4(d.name);
    })
    .style("fill", "none")
    .style("stroke-width4", "1px")
    .style("opacity", "0");

mousePerline4.append("text")
    .attr("transform", "translate(10,3)")
    .attr('fill', 'white');

mouseG4.append('svg:rect') // append a rect to catch mouse movements on canvas
    .attr('width', width4) // can't catch mouse events on a g element
    .attr('height', height4)
    .attr('fill', 'none')
    .attr('pointer-events', 'all')
    .on('mouseout', function() { // on mouse out hide line4, circles and text
        d3.select(".mouse-line4")
            .style("opacity", "0");
        d3.selectAll(".mouse-per-line4 circle")
            .style("opacity", "0");
        d3.selectAll(".mouse-per-line4 text")
            .style("opacity", "0");

    })
    .on('mouseover', function() { // on mouse in show line4, circles and text
        d3.select(".mouse-line4")
            .style("opacity", "1");
        d3.selectAll(".mouse-per-line4 circle")
            .style("opacity", "1");
        d3.selectAll(".mouse-per-line4 text")
            .style("opacity", "1");
    })
    .on('mousemove', function() { // mouse moving over canvas
        var mouse = d3.mouse(this);
        d3.select(".mouse-line4")
            .attr("d", function() {
                var d = "M" + mouse[0] + "," + height4;
                d += " " + mouse[0] + "," + 0;
                return d;
            });

        d3.selectAll(".mouse-per-line4")
            .attr("transform", function(d, i) {
                console.log(width4 / mouse[0])
                var xDate = x4.invert(mouse[0]),
                    bisect = d3.bisector(function(d) {
                        return d.date;
                    }).right;
                idx = bisect(d.values, xDate);

                var beginning = 0,
                    end = line4s[i].getTotalLength(),
                    target = null;

                while (true) {
                    target = Math.floor((beginning + end) / 2);
                    pos = line4s[i].getPointAtLength(target);
                    if ((target === end || target === beginning) && pos.x !== mouse[0]) {
                        break;
                    }
                    if (pos.x > mouse[0]) end = target;
                    else if (pos.x < mouse[0]) beginning = target;
                    else break; //position found
                }

                d3.select(this).select('text')
                    .text(y4.invert(pos.y).toFixed(2));


                return "translate(" + mouse[0] + "," + pos.y + ")";
            });
    });