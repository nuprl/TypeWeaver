const Node: Node = require('./');
console.log(new Node({ type: 'star', value: '*' }));
console.log(new Node('star', '*'));
// both result in => Node { type: 'star', value: '*' }
