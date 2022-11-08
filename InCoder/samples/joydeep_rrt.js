let rrt = require('rrt');
let Point = rrt.Point;
let Line = rrt.Line;
let c = lib220.newCanvas(400, 400);

function drawMap(canvas, map) {
  map.forEach(function(l) {
    drawLine(canvas, l.p1, l.p2, [0, 0, 0]);
  });
}

function drawPoint(canvas, p, color) {
  canvas.drawFilledCircle(p.x, p.y, 2, color);
}

function drawLine(canvas, p1, p2, color) {
  canvas.drawLine(p1.x, p1.y, p2.x, p2.y, color);
}

function drawTree(canvas, tree) {
  let p1 = tree.node;
  tree.children.forEach(function(p2) {
    canvas.drawLine(p1.x, p1.y, p2.node.x, p2.node.y, [0, 0, 1]);
    drawTree(canvas, p2);
  });
}

function drawPath(canvas, path, color) {
  for (let i = 1; i < path.length; ++i) {
    drawLine(c, path[i], path[i - 1], color);
  }
}

class Tree {
  constructor(node, parent) {
    this.node = node;
    this.parent = parent;
    this.children = [];
  }
  nearest(p, map) {
    let d = distance(this.node, p);
    let best = this;
    if (collides(map, p, this.node)) {
      d = d * 1000;
    }
    for (let i = 0; i < this.children.length; ++i) {
      let p2 = this.children[i].nearest(p, map);
      let d2 = distance(p2.node, p);
      if (collides(map, p2.node, p)) {
        d2 = d2 * 1000;
      }
      if (d2 < d) {
        best = p2;
        d = d2;
      }
    }
    return best;
  }
  extend(p, maxExtension) {
    let p2 = p;
    if (distance(p, this.node) > maxExtension) {
      const d = distance(p, this.node);
      p2 = new Point(this.node.x + maxExtension / d * (p.x - this.node.x),
        this.node.y + maxExtension / d * (p.y - this.node.y));
    }
    return p2;
  }
  add(p) {
    let qNew = new Tree(p, this);
    this.children.push(qNew);
    return qNew;
  }
}

function distance(p1, p2) {
  return Math.sqrt((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y));
}

function samplePoint(mapSize, goal, goalBias) {
  const r = Math.random();
  if (r < goalBias) {
    return goal;
  }
  return new rrt.Point(mapSize * Math.random(), mapSize * Math.random());
}

function collides(map, p1, p2) {
  const l = new Line(p1, p2);
  for (let i = 0; i < map.length; ++i) {
    if (rrt.intersects(map[i], l)) {
      return true;
    }
  }
  return false;
}

function getPath(leaf, goal) {
  let path = [goal];
  while (leaf !== 0) {
    path.push(leaf.node);
    leaf = leaf.parent;
  }
  return path;
}

function plan(start, goal, map, options) {
  let n = 0;
  let tree = new Tree(start, 0);
  while (n < options.maxSamples) {
    let p = samplePoint(options.mapSize, goal, options.goalBias);
    let q = tree.nearest(p, map);
    let r = q.extend(p, options.maxExtension);
    if (!collides(map, q.node, r)) {
      let qNew = q.add(r);
      if (!collides(map, r, goal)) {
        options.callback(p, q, r, tree);
        //console.log('Path found');
        return getPath(qNew, goal);
      }
    }
    options.callback(p, q, r, tree);
    ++n;
  }
  //console.log('No path found');
  return [];
}

function visualize(p, q, r, t) {
  c.clear();
  drawMap(c, map);
  drawPoint(c, start, [1, 0, 0]);
  drawPoint(c, goal, [0, 0.75, 0]);
  drawPoint(c, p, [0.5, 0.5, 0]);
  drawPoint(c, q.node, [0, 1, 0.5]);
  drawPoint(c, r, [0.25, 0.5, 0]);
  drawLine(c, q.node, r, [1, 0, 0]);
  drawLine(c, p, r, [1, 0.5, 0.8]);
  drawTree(c, t);
  lib220.sleep(10);
}

function hardMap(mapSize, spacing, opening) {
  let map = [
    new Line(new Point(0, 0), new Point(0, mapSize)),
    new Line(new Point(mapSize, mapSize), new Point(0, mapSize)),
    new Line(new Point(mapSize, mapSize), new Point(mapSize, 0)),
    new Line(new Point(mapSize, 0), new Point(0, 0))
  ];
  for (let y = 0; y < mapSize; y = y + spacing) {
    let x1 = Math.random() * (1 - opening) * mapSize;
    let x2 = x1 + opening * mapSize;
    map.push(new Line(new Point(0, y), new Point(x1, y)));
    map.push(new Line(new Point(x2, y), new Point(mapSize, y)));
  }
  return map;
}

let options = {
  mapSize: 400,
  maxExtension: 10,
  goalBias: 0.05,
  maxSamples: 10000,
  callback: visualize
};


function rotate(p, theta) {
  return new Point(p.x * Math.cos(theta) - p.y * Math.sin(theta), 
    p.x * Math.sin(theta) + p.y * Math.cos(theta)); 
}

function obstacle(p, a, b, theta) {
  let lines = [];
  let p1 = new Point(-a, -b);
  let p2 = new Point(a, -b);
  let p3 = new Point(a, b);
  let p4 = new Point(-a, b);
}


function simplifyPath(path, map) {
  function reducer(newPath, p) {
    if (newPath.length < 2) {
      newPath.push(p);
      return newPath;
    }
    const last = newPath[newPath.length - 2];
    if (collides(map, p, last)) {
      newPath.push(p);
    } else {
      newPath[newPath.length - 1] = p;
    }
    return newPath;
  }
  return path.reduce(reducer, []);
}

let start = new Point(5, 5);
let goal = new Point(385, 385);

let map = [
  new Line(new Point(0, 0), new Point(0, 400)),
  new Line(new Point(400, 400), new Point(0, 400)),
  new Line(new Point(400, 400), new Point(400, 0)),
  new Line(new Point(400, 0), new Point(0, 0)),
  new Line(new Point(0, 200), new Point(300, 200)),
  new Line(new Point(0, 100), new Point(200, 100)),
  new Line(new Point(300, 100), new Point(400, 100)),
  new Line(new Point(100, 200), new Point(100, 300)),
  new Line(new Point(200, 300), new Point(200, 400)),
  new Line(new Point(300, 300), new Point(400, 300)),
];

if (false) {
  map = hardMap(options.mapSize, 80, 0.1);
  goal = new Point(385, 385);
}
let path = plan(start, goal, map, options);
drawPath(c, path, [0, 0.8, 0]);
let simplifiedPath = simplifyPath(path, map);
drawPath(c, simplifiedPath, [0.8, 0, 0]);


function verifyPath(path, map) {
  if (path.length < 1) {
    assert(true);
    return;
  }
  let init = {
    collides: false,
    prev: path[0]
  }
  let reducer = function(check, p) {
    check.collides = check.collides || collides(map, p, check.prev);
    check.prev = p;
    return check;
  };
  let result = path.reduce(reducer, init);
  // console.log(path);
  assert(!result.collides);
}

options = {
  mapSize: 400,
  maxExtension: 10,
  goalBias: 0.05,
  maxSamples: 10000,
  callback: visualize // function(p, q, r, t) {}
};

for (let i = 0; i < 10; ++i) {
  test('Verify path' + i.toString(), function() {
    let path = plan(start, goal, map, options);
    let simplePath = simplifyPath(path, map);
    drawPath(c, path, [0, 0.8, 0]);
    drawPath(c, simplePath, [1, 0.4, 0]);
    lib220.sleep(500);
    verifyPath(path, map);
    verifyPath(simplePath, map);
    if (path.length >= 2) {
    assert(path[0].x === goal.x && path[0].y === goal.y);
    let lastPoint = path[path.length - 1];
    assert(lastPoint.x === start.x && lastPoint.y === start.y);
    }
  });
  console.log(i);
  lib220.sleep(1);
}