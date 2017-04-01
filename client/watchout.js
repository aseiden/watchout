// start slingin' some d3 here.
var height = 500;
var width = 960;
var asteroids = 'abcdefg'.split('');
var ship = [{key: 'theLoneWanderer', x: 0, y: 0}];
var drag = d3.behavior.drag();
var highScore = [0];
var currentScore = [0];
var collisions = [0];

/*
==========================================
CODE TO MOVE PIECES ON BOARD
==========================================
*/

function update(data) {
  board.selectAll('.asteroid')
    .data(data)
    .transition()
    .duration(1000)
    .attr('x', function() { return Math.min(Math.random() * (ship[0].x + width), width - 30); })
    .attr('y', function() { return Math.min(Math.random() * (ship[0].y + height), height - 30); });

    currentScore[0]++; 
    d3.selectAll('.current').text(currentScore[0]);
}

var drag = d3.behavior.drag()
        .on("drag", function(d,i) {
          if(!borderDetection(d3.event.dx, d3.event.dy)) {
            d.x += d3.event.dx
            d.y += d3.event.dy
            d3.select(this).attr("transform", function(d,i){
                return "translate(" + [ d.x,d.y ] + ")"
            })
          }
        });

/*
==========================================
CODE TO MAKE BOARD AND ADD PIECES TO BOARD
==========================================
*/

var board = d3.select('.board')
              .append('svg')
              .attr('class', 'realBoard')
              .attr('width', width)
              .attr('height', height)
              .style('background-color', 'black');

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



/*
==========================================
CODE TO DETECT COLLISIONS
==========================================
*/

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
    var shipXCoordinate = Number(shipCoordinates[0]) + Number(ship[0].x);
    var shipYCoordinate = Number(shipCoordinates[1]) + Number(ship[0].y); 
    var xDiff = asteroidXCoordinate - shipXCoordinate;
    var yDiff = asteroidYCoordinate - shipYCoordinate;
    var distSquared = Math.pow(xDiff, 2) + Math.pow(yDiff, 2);
    var distance = Math.sqrt(distSquared);
    if(distance < 30) {
      highScore[0] = Math.max(currentScore[0], highScore[0]);
      d3.selectAll('.highscore').text(highScore[0]);
      currentScore[0] = 0;
      d3.selectAll('.current').text(currentScore[0]);
      collisions[0]++;
      d3.selectAll('.collisions').text(collisions[0]);
    }
  })
}

function borderDetection(dx, dy) {
  if(width / 2 + ship[0].x + dx > width - 30) {
    return true;
  }
  if(0 > width / 2 + ship[0].x + dx) {
    return true;
  }
  if(height/ 2 + ship[0].y + dy > height - 30) {
    debugger;
    return true;
  }
  if(0 > height / 2 + ship[0].y + dy) {
    debugger;
    return true;
  }
  return false;
}

/*
==========================================
CODE TO INITIALIZE
==========================================
*/

update(asteroids);
setInterval(function(){ update(asteroids); }, 1000);
setInterval(function() {detectCollisions(); }, 100);