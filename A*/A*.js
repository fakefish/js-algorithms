(function (start, end, map) {
  // A*
  // 通过遍历目标点附近的点，把各个点到目标和起点的距离总和得到的值，找到最小的点，加入结果中
  // 再把这个点作为目标点，计算附近的点，然后得到最佳路径

  // from [0,0]
  // to [99,99]
  // map [[0,0],[0,1]....[99,99]]
  var resultList = [];
  var openList = [];
  var _map = map.concat();
  var H = map.length;
  var W = map[0].length;
  var x,
      y,
      i,
      current, // 当前需要计算的点
      children, // 当前点附近的点
      neighbor, // 邻居点
      step, 
      path;
  function AStarSearch (start, end, map) {

    // 初始化 地图各个点
    for( x = 0; x < W; x++ ) {
      for ( y = 0; y < H; y++ ) {
        _map[x][y].cost = Infinity;
        _map[x][y].open = false;
        _map[x][y].closed = false;
        _map[x][y].parent = null;
      }
    }

    start.cost = 0;
    start.open = true;
    openList.push(start);

    while( openList.length ) {
      // 得到周围点总分最低的点
      current = openList.sort( function (a, b) {
        return a.sum - b.sum;
      }).shift();

      // 获取周围的点
      children = getChidlren( current );
    }
  }

  // 获取周围的点
  // 由于只需要求上下左右四个点（贪吃蛇只能上下左右）
  function getChildren (parent) {
    // left
    // 如果这个点是最左边的点，那么不计算这个点
    if(parent.x > 0) {
      neighbor = _map[parent.y][parent.x - 1];

      if( neighbor.walkable && !neighbor.closed && neighbor.cost > parent.cost ) {
        neighbor.toTarget = Math.abs(neighbor.x - end.x) + Math.abs(neighbor.y - end.y);
        neighbor.sum = neighbor.cost + neighbor.toTarget;
        
      }
    }
  }

  return AStarSearch(start, end, map);
})(start, end, map);