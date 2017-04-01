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

var detectCollisions = function() {
  var asteroids = d3.selectAll('.asteroid');
  asteroids = asteroids[0];
  var asteroidCoordinates = asteroids.map(function(item){
    return [item.x.animVal.value, item.y.animVal.value];
  });
  var shipCoordinates = [d3.selectAll('.ship')[0][0].x.animVal.value, d3.selectAll('.ship')[0][0].y.animVal.value];
  asteroidCoordinates.forEach(function(coordinates){
    var asteroidXCoordinate = coordinates[0];
    var asteroidYCoordinate = coordinates[1];
    var shipXCoordinate = shipCoordinates[0];
    var shipYCoordinate = shipCoordinates[1];
    var xDiff = asteroidXCoordinate - shipXCoordinate;
    var yDiff = asteroidYCoordinate - shipYCoordinate;
    var distSquared = Math.pow(xDiff, 2) + Math.pow(yDiff, 2);
    var distance = Math.sqrt(distSquared);
    if(distance < 20) {
      // set score to 0;
    }
  })
}

var drag = d3.behavior.drag()
        .on("drag", function(d,i) {
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

setInterval(function() {detectCollisions(); }, 50);

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

