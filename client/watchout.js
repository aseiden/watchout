// start slingin' some d3 here.
var height = 500;
var width = 960;
var board = d3.select('.board')
              .append('svg')
              .attr('width', width)
              .attr('height', height)
              .style('background-color', 'black');

var asteroids = 'abcdefg'.split('');

var randomize = function(size) {
  return Math.floor(Math.random() * size);
}

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
