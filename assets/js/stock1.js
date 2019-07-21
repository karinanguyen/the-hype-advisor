var myData1 = "date,Yeezy v2 Cream (Size 6),Travis Scott Jordan 4 (Size 12),Serena OW AM97 (Size 10)\n20190117,292.00,408.00,900.00\n20190122,294.00,416.00,900.00\n20190127,305.00,429.00,915.00\n20190201,298.00,435.00,890.00\n20190206,294.00,426.00,915.00\n20190206,294.00,426.00,915.00\n20190211,293.00,434.00,915.00\n20190216,299.00,475.00,950.00\n20190221,311.00,462.00,950.00\n20190226,354.00,483.00,950.00\n20190301,364.00,450.00,950.00\n20190305,358.00,473.00,950.00\n20190310,355.00,476.00,910.00\n20190315,358.00,500.00,999.00\n20190320,365.00,487.00,999.00\n20190325,377.00,495.00,999.00\n20190330,383.00,474.00,999.00\n20190404,377.00,488.00,1000.00\n20190409,375.00,515.00,907.00\n20190414,377.00,520.00,1080.00\n20190419,358.00,485.00,1080.00\n20190424,355.00,481.00,1080.00\n20190429,351.00,513.00,1035.00\n20190504,360.00,503.00,1121.00\n20190509,367.00,516.00,1113.00\n20190514,368.00,528.00,1141.00\n20190519,367.00,544.00,1063.00\n20190524,375.00,504.00,1095.00\n20190529,391.00,520.00,1134.00\n20190603,376.00,529.00,1134.00\n20190608,393.00,541.00,1134.00/n20190613,394.00,526.00,1150.00/n20190618,395.00,505.00,1150.00\n20190623,388.00,540.00,1150.00\n20190628,400.00,547.00,1150.00\n20190703,415.00,559.00,1200.00\n20190708,419.00,537.00,1200.00\n20190713,408.00,549.00,1200.0\n20190718,418.00,553.00,1200.00";
var default_width1 = 250;
var default_height1 = 250;
var default_ratio1 = default_width1 / default_height1;

var margin1 = {
        top: 10,
        right: 30,
        bottom: 20,
        left: 30
    },
    width1 = default_width1 - margin1.left - margin1.right,
    height1 = default_height1 - margin1.top - margin1.bottom;

function scale() {
  if (window.innerWidth > 1300) {
    current_width1 = window.innerWidth * 0.19;
    current_height1 = window.innerWidth * 0.19;
  } else if (window.innerWidth > 600) {
    current_width1 = window.innerWidth * 0.2;
    current_height1 = window.innerWidth * 0.2;
  } else {
    current_width1 = window.innerWidth * 0.42;
    current_height1 = window.innerWidth * 0.42;
  }

  current_ratio1 = current_width / current_height;

  if ( current_ratio1 > default_ratio1 ){
    h = current_height;
    w = h * default_ratio1;
  } else {
    w = current_width;
    h = w / default_ratio1;
  }

  width = w - margin.left - margin.right;
  height = h - margin.top - margin.bottom;

};

scale();

var parseDate = d3.time.format("%Y%m%d").parse;

var x1 = d3.time.scale()
    .range([0, width1]);

var y1 = d3.scale.linear()
    .range([height1, 0]);

var color1 = d3.scale.category10();


var xAxis1 = d3.svg.axis()
    .scale(x1)
    .orient("bottom");

var yAxis1 = d3.svg.axis()
    .scale(y1)
    .orient("left");

var line1 = d3.svg.line()
    .interpolate("basis")
    .x(function(d) {
        return x1(d.date);
    })
    .y(function(d) {
        return y1(d.price);
    });

var svg1 = d3.select("#stock1").append("svg")
    .attr("width", width1 + margin1.left + margin1.right)
    .attr("height", height1 + margin1.top + margin1.bottom)
    .style("fill", "white")
    .append("g")
    .attr("transform", "translate(" + margin1.left + "," + margin1.top + ")");

var data1 = d3.csv.parse(myData1)

color1.domain(d3.keys(data1[0]).filter(function(key) {

    return key !== "date";
}));

data1.forEach(function(d) {
    d.date = parseDate(d.date);
});

var cities1 = color1.domain().map(function(name) {
    return {
        name: name,
        values: data1.map(function(d) {
            return {
                date: d.date,
                price: +d[name]
            };
        })
    };
});

x1.domain(d3.extent(data1, function(d) {
    return d.date;
}));

y1.domain([
    d3.min(cities1, function(c) {
        return d3.min(c.values, function(v) {
            return v.price;
        });
    }),
    d3.max(cities1, function(c) {
        return d3.max(c.values, function(v) {
            return v.price;
        });
    })
]);

var legend1 = svg1.selectAll('g')
    .data(cities1)
    .enter()
    .append('g')
    .attr('class', 'legend1')


legend1.append('rect')
    .attr('x', width1 - 80)
    .attr('y', function(d, i) {
        return i * 20;
    })
    .attr('width', 10)
    .attr('height', 10)
    .style('fill', function(d) {
        return color1(d.name);
    });

legend1.append('text')
    .attr('x', width1 - 65)
    .attr('y', function(d, i) {
        return (i * 20) + 9;
    }).attr('fill', 'white')
    .text(function(d) {
        return d.name;
    });

svg1.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height1 + ")")
    .style("fill", "white")
    .call(xAxis1);

svg1.append("g")
    .attr("class", "y axis")
    .call(yAxis1)
    .append("text")
    .style("fill", "white")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("Price (USD) Over Time (Months in 2019)");

var city1 = svg1.selectAll(".city1")
    .data(cities1)
    .enter().append("g")
    .attr("class", "city1");

city1.append("path")
    .attr("class", "line1")
    .attr("d", function(d) {
        return line1(d.values);
    })
    .style("stroke", function(d) {
        return color1(d.name);
    });

city1.append("text")
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

var mouseG1 = svg1.append("g")
    .attr("class", "mouse-over-effects");

mouseG1.append("path") // this is the black vertical line1 to follow mouse
    .attr("class", "mouse-line1")
    .style("stroke", "white")
    .style("stroke-width1", "1px")
    .style("opacity", "0");

var line1s = document.getElementsByClassName('line1');

var mousePerline1 = mouseG1.selectAll('.mouse-per-line1')
    .data(cities1)
    .enter()
    .append("g")
    .attr("class", "mouse-per-line1");

mousePerline1.append("circle")
    .attr("r", 5)
    .style("stroke", function(d) {
        return color1(d.name);
    })
    .style("fill", "none")
    .style("stroke-width1", "1px")
    .style("opacity", "0");

mousePerline1.append("text")
    .attr("transform", "translate(10,3)")
    .attr('fill', 'white');

mouseG1.append('svg:rect') // append a rect to catch mouse movements on canvas
    .attr('width', width1) // can't catch mouse events on a g element
    .attr('height', height1)
    .attr('fill', 'none')
    .attr('pointer-events', 'all')
    .on('mouseout', function() { // on mouse out hide line1, circles and text
        d3.select(".mouse-line1")
            .style("opacity", "0");
        d3.selectAll(".mouse-per-line1 circle")
            .style("opacity", "0");
        d3.selectAll(".mouse-per-line1 text")
            .style("opacity", "0");

    })
    .on('mouseover', function() { // on mouse in show line1, circles and text
        d3.select(".mouse-line1")
            .style("opacity", "1");
        d3.selectAll(".mouse-per-line1 circle")
            .style("opacity", "1");
        d3.selectAll(".mouse-per-line1 text")
            .style("opacity", "1");
    })
    .on('mousemove', function() { // mouse moving over canvas
        var mouse = d3.mouse(this);
        d3.select(".mouse-line1")
            .attr("d", function() {
                var d = "M" + mouse[0] + "," + height1;
                d += " " + mouse[0] + "," + 0;
                return d;
            });

        d3.selectAll(".mouse-per-line1")
            .attr("transform", function(d, i) {
                console.log(width1 / mouse[0])
                var xDate = x1.invert(mouse[0]),
                    bisect = d3.bisector(function(d) {
                        return d.date;
                    }).right;
                idx = bisect(d.values, xDate);

                var beginning = 0,
                    end = line1s[i].getTotalLength(),
                    target = null;

                while (true) {
                    target = Math.floor((beginning + end) / 2);
                    pos = line1s[i].getPointAtLength(target);
                    if ((target === end || target === beginning) && pos.x !== mouse[0]) {
                        break;
                    }
                    if (pos.x > mouse[0]) end = target;
                    else if (pos.x < mouse[0]) beginning = target;
                    else break; //position found
                }

                d3.select(this).select('text')
                    .text(y1.invert(pos.y).toFixed(2));


                return "translate(" + mouse[0] + "," + pos.y + ")";
            });
    });