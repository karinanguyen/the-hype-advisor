var myData3 = "date,Yeezy v2 Cream (Size 6),Travis Scott Jordan 4 (Size 12),Serena OW AM97 (Size 10)\n20190117,292.00,408.00,900.00\n20190122,294.00,416.00,900.00\n20190127,305.00,429.00,915.00\n20190201,298.00,435.00,890.00\n20190206,294.00,426.00,915.00\n20190206,294.00,426.00,915.00\n20190211,293.00,434.00,915.00\n20190216,299.00,475.00,950.00\n20190221,311.00,462.00,950.00\n20190226,354.00,483.00,950.00\n20190301,364.00,450.00,950.00\n20190305,358.00,473.00,950.00\n20190310,355.00,476.00,910.00\n20190315,358.00,500.00,999.00\n20190320,365.00,487.00,999.00\n20190325,377.00,495.00,999.00\n20190330,383.00,474.00,999.00\n20190404,377.00,488.00,1000.00\n20190409,375.00,515.00,907.00\n20190414,377.00,520.00,1080.00\n20190419,358.00,485.00,1080.00\n20190424,355.00,481.00,1080.00\n20190429,351.00,513.00,1035.00\n20190504,360.00,503.00,1121.00\n20190509,367.00,516.00,1113.00\n20190514,368.00,528.00,1141.00\n20190519,367.00,544.00,1063.00\n20190524,375.00,504.00,1095.00\n20190529,391.00,520.00,1134.00\n20190603,376.00,529.00,1134.00\n20190608,393.00,541.00,1134.00/n20190613,394.00,526.00,1150.00/n20190618,395.00,505.00,1150.00\n20190623,388.00,540.00,1150.00\n20190628,400.00,547.00,1150.00\n20190703,415.00,559.00,1200.00\n20190708,419.00,537.00,1200.00\n20190713,408.00,549.00,1200.0\n20190718,418.00,553.00,1200.00";
var default_width3 = 250;
var default_height3 = 280;
var default_ratio3 = default_width3 / default_height3;

var margin3 = {
        top: 30,
        right: 30,
        bottom: 20,
        left: 30
    },
    width3 = default_width3 - margin3.left - margin3.right,
    height3 = default_height3 - margin3.top - margin3.bottom;

function scale() {
  if (window.innerWidth > 1300) {
    current_width3 = window.innerWidth * 0.21;
    current_height3 = window.innerWidth * 0.21;
  } else if (window.innerWidth > 600) {
    current_width3 = window.innerWidth * 0.23;
    current_height3 = window.innerWidth * 0.23;
  } else {
    current_width3 = window.innerWidth * 0.45;
    current_height3 = window.innerWidth * 0.45;
  }

  current_ratio3 = current_width3 / current_height3;

  if ( current_ratio3 > default_ratio3 ){
    h = current_height3;
    w = h * default_ratio3;
  } else {
    w = current_width3;
    h = w / default_ratio3;
  }

  width3 = w - margin3.left - margin3.right;
  height3 = h - margin3.top - margin3.bottom;

};

scale();

var parseDate = d3.time.format("%Y%m%d").parse;

var x3 = d3.time.scale()
    .range([0, width3]);

var y3 = d3.scale.linear()
    .range([height3, 0]);

var color3 = d3.scale.category20c();


var xAxis3 = d3.svg.axis()
    .scale(x3)
    .orient("bottom");

var yAxis3 = d3.svg.axis()
    .scale(y3)
    .orient("left");

var line3 = d3.svg.line()
    .interpolate("basis")
    .x(function(d) {
        return x3(d.date);
    })
    .y(function(d) {
        return y3(d.price);
    });

var svg3 = d3.select("#stock3").append("svg")
    .attr("width", width3 + margin3.left + margin3.right)
    .attr("height", height3 + margin3.top + margin3.bottom)
    .style("fill", "white")
    .append("g")
    .attr("transform", "translate(" + margin3.left + "," + margin3.top + ")");

var data3 = d3.csv.parse(myData3)

color3.domain(d3.keys(data3[0]).filter(function(key) {

    return key !== "date";
}));

data3.forEach(function(d) {
    d.date = parseDate(d.date);
});

var cities3 = color3.domain().map(function(name) {
    return {
        name: name,
        values: data3.map(function(d) {
            return {
                date: d.date,
                price: +d[name]
            };
        })
    };
});

x3.domain(d3.extent(data3, function(d) {
    return d.date;
}));

y3.domain([
    d3.min(cities3, function(c) {
        return d3.min(c.values, function(v) {
            return v.price;
        });
    }),
    d3.max(cities3, function(c) {
        return d3.max(c.values, function(v) {
            return v.price;
        });
    })
]);

var legend3 = svg3.selectAll('g')
    .data(cities3)
    .enter()
    .append('g')
    .attr('class', 'legend3')


legend3.append('rect')
    .attr('x', width3 - 80)
    .attr('y', function(d, i) {
        return i * 20;
    })
    .attr('width', 10)
    .attr('height', 10)
    .style('fill', function(d) {
        return color3(d.name);
    });

legend3.append('text')
    .attr('x', width3 - 65)
    .attr('y', function(d, i) {
        return (i * 20) + 9;
    }).attr('fill', 'white')
    .text(function(d) {
        return d.name;
    });

svg3.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height3 + ")")
    .style("fill", "white")
    .call(xAxis3);

svg3.append("g")
    .attr("class", "y axis")
    .call(yAxis3)

svg3.append("text")
        .attr("x", (width3 / 2))             
        .attr("y", 0 - (margin3.top / 2))
        .attr("text-anchor", "middle")  
        .style("font-size", width3 / 15) 
        .text("Stock Prices (Transportation)");

var city3 = svg3.selectAll(".city3")
    .data(cities3)
    .enter().append("g")
    .attr("class", "city3");

city3.append("path")
    .attr("class", "line3")
    .attr("d", function(d) {
        return line3(d.values);
    })
    .style("stroke", function(d) {
        return color3(d.name);
    });

city3.append("text")
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

var mouseG3 = svg3.append("g")
    .attr("class", "mouse-over-effects");

mouseG3.append("path") // this is the black vertical line3 to follow mouse
    .attr("class", "mouse-line3")
    .style("stroke", "white")
    .style("stroke-width3", "1px")
    .style("opacity", "0");

var line3s = document.getElementsByClassName('line3');

var mousePerline3 = mouseG3.selectAll('.mouse-per-line3')
    .data(cities3)
    .enter()
    .append("g")
    .attr("class", "mouse-per-line3");

mousePerline3.append("circle")
    .attr("r", 5)
    .style("stroke", function(d) {
        return color3(d.name);
    })
    .style("fill", "none")
    .style("stroke-width3", "1px")
    .style("opacity", "0");

mousePerline3.append("text")
    .attr("transform", "translate(10,3)")
    .attr('fill', 'white');

mouseG3.append('svg:rect') // append a rect to catch mouse movements on canvas
    .attr('width', width3) // can't catch mouse events on a g element
    .attr('height', height3)
    .attr('fill', 'none')
    .attr('pointer-events', 'all')
    .on('mouseout', function() { // on mouse out hide line3, circles and text
        d3.select(".mouse-line3")
            .style("opacity", "0");
        d3.selectAll(".mouse-per-line3 circle")
            .style("opacity", "0");
        d3.selectAll(".mouse-per-line3 text")
            .style("opacity", "0");

    })
    .on('mouseover', function() { // on mouse in show line3, circles and text
        d3.select(".mouse-line3")
            .style("opacity", "1");
        d3.selectAll(".mouse-per-line3 circle")
            .style("opacity", "1");
        d3.selectAll(".mouse-per-line3 text")
            .style("opacity", "1");
    })
    .on('mousemove', function() { // mouse moving over canvas
        var mouse = d3.mouse(this);
        d3.select(".mouse-line3")
            .attr("d", function() {
                var d = "M" + mouse[0] + "," + height3;
                d += " " + mouse[0] + "," + 0;
                return d;
            });

        d3.selectAll(".mouse-per-line3")
            .attr("transform", function(d, i) {
                console.log(width3 / mouse[0])
                var xDate = x3.invert(mouse[0]),
                    bisect = d3.bisector(function(d) {
                        return d.date;
                    }).right;
                idx = bisect(d.values, xDate);

                var beginning = 0,
                    end = line3s[i].getTotalLength(),
                    target = null;

                while (true) {
                    target = Math.floor((beginning + end) / 2);
                    pos = line3s[i].getPointAtLength(target);
                    if ((target === end || target === beginning) && pos.x !== mouse[0]) {
                        break;
                    }
                    if (pos.x > mouse[0]) end = target;
                    else if (pos.x < mouse[0]) beginning = target;
                    else break; //position found
                }

                d3.select(this).select('text')
                    .text(y3.invert(pos.y).toFixed(2));


                return "translate(" + mouse[0] + "," + pos.y + ")";
            });
    });