// start slingin' some d3 here.
var height = 500;
var width = 960;
var board = d3.select('.board')
              .append('svg')
              .attr('width', width)
              .attr('height', height)
              .style('background-color', 'black');

var asteroids = 'abcdefg'.split('');
var ship = [{key: 'theLoneWanderer', x: 0, y: 0}];
var drag = d3.behavior.drag();

function update(data) {
  board.selectAll('.asteroid')
    .data(data)
    .transition()
    .duration(1000)
    .attr('x', function() { return Math.random() * width; })
    .attr('y', function() { return Math.random() * height; });
}


var drag = d3.behavior.drag()
        .on("drag", function(d,i) {
            debugger;
            d.x += d3.event.dx
            d.y += d3.event.dy
            d3.select(this).attr("transform", function(d,i){
                return "translate(" + [ d.x,d.y ] + ")"
            })
        });

        // return "translate(" + [ d.x,d.y ] + ")"

board.selectAll('.asteroid')
     .data(asteroids)
     .enter()
     .append('svg:image')
     .attr('class', 'asteroid')
     .attr('xlink:href', 'asteroid.png')
     .attr('width', 30)
     .attr('height', 36)
     .attr('x', function() { return Math.random() * width; })
     .attr('y', function() { return Math.random() * height; });

update(asteroids);
setInterval(function(){ update(asteroids); }, 1000);

board.selectAll('.ship')
     .data(ship)
     .enter()
     .append('svg:image')
     .attr('class', 'ship')
     .attr('xlink:href', 'spacestation.png')
     .attr('width', 40)
     .attr('height', 40)
     .attr('x', function() { return width / 2; })
     .attr('y', function() { return height / 2; })
     .call(drag);

// d3.select('.ship').on("click", function(d) { // ignore drag
//   // d3.select('.ship').call(force.drag);
//   alert('AHHHHH');
// });

