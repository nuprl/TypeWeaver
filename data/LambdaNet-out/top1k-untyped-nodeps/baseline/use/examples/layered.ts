
var define: String = require('define-property');
var use: Function = require('..');

function App(name: String): Void {
  this.name = name;
  use(this);
}

App.prototype.create = function(name: String) {
  return new App(name);
};

var a: HTMLElement = new App('a');
var b: Object = a.create('b');
var c: Object = b.create('c');
var d: Object = c.create('d');
var e: Object = d.create('e');
var f: Object = e.create('f');

a.children = [];
a.use(function fn(config: Object): Function {
  if (!config.name) return fn;
  a.children.push(config.name);
  return fn;
});

var config: Function = {};

a.run(b);
b.run(c);
c.run(d);
d.run(e);
e.run(f);
f.run(config);

console.log(a)
