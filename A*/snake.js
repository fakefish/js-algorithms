var ctx = document.querySelector("#c").getContext('2d');
var W = 600;
var H = 400;
var DOT_SIZE = 10;
var i,
    _this,
    next,
    x,y,
    map = [],
    len;
for(y = 0; y < H / 10; y++) {
  map[y] = [];
  for(x = 0; x < W / 10; x++) {
    map[y][x] = {};
  }
}
var snake = {
  body: [[0,0]],
  food: [2,2],
  path: [],
  render: function() {
    _this = this;
    ctx.fillStyle = "#"+Math.floor(Math.random()*0xFFFFFF).toString(16);
    _this.body.forEach(function(arr) {
      map[arr[1]][arr[0]].closed = true;
      // console.log(map[arr[1]][arr[0]])
    });
    // console.log(_this.body)
    _this.path = _this.findPath({
      x: _this.body[0][0],
      y: _this.body[0][1]
    }, {
      x: _this.food[0],
      y: _this.food[1]
    }, map, _this.body);
    if(_this.path) {
      _this.path = _this.path.map(function(obj){
        return [obj.x,obj.y]}
      );
      if(_this.path.length !== 0) {
        // _this.path.forEach(function(point) {
        //   _this.drawDot(point);
        // });
        _this.getPath(_this.path);
      } else if(getManhattan(_this.body[0], _this.food) === 1) {
        _this.getPoint();
      }
    }
    
    ctx.fillStyle = "#000";
    _this.body.forEach(function(point) {
      _this.drawDot(point);
    });
    ctx.fillStyle = "#"+Math.floor(Math.random()*0xFFFFFF).toString(16);
    _this.drawDot(_this.food);
  },
  getPoint: function() {
    this.body.unshift(this.food);
    // console.log(this.body)
    
    while(1) {
      this.food = [~~(Math.random()*W/10), ~~(Math.random()*H/10)];
      if(this.isContain(this.food)) {
        this.food = [~~(Math.random()*W/10), ~~(Math.random()*H/10)];
      } else {
        break;
      }
    }
  },
  getPath: function(path) {
    this.body.unshift(path[0]);
    this.body.pop();
    // console.log(path.splice(0, 1))
  },
  findPath: function(start, end, map, stones) {
    return AStarSearch(start, end, map, stones);
  },
  drawDot: function(position) {
    ctx.fillRect(position[0]*DOT_SIZE, position[1]*DOT_SIZE, DOT_SIZE, DOT_SIZE);
  },
  isContain: function(point) {

    return this.body.every(function(body) {
      if(body[0] == point[1] && body[1] == point[0]) {
        return true;
      } else {
        return false;
      }
    });
  }
}

function render() {
    ctx.clearRect(0,0,W,H);
    snake.render();
}
// 计算曼哈顿距离
function getManhattan (start, end) {
  // console.log(start.x +' '+start.y,end.x +' '+ end.y)
  return Math.abs(start[0] - end[0]) + Math.abs(start[1] - end[1]);
}

render()
var timer = setInterval(render,1);