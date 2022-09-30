
var define: any = require('define-property');
var use: any = require('..');

function App(name: string): any {
  this.name = name;
  use(this);
}

App.prototype.create = function(name: string) {
  return new App(name);
};

var a: any = new App('a');
var b: any = a.create('b');
var c: any = b.create('c');
var d: any = c.create('d');
var e: any = d.create('e');
var f: JQuery = e.create('f');

a.children = [];
a.use(function fn(config: any): any {
  if (!config.name) return fn;
  a.children.push(config.name);
  return fn;
});

var config: {} = {};

a.run(b);
b.run(c);
c.run(d);
d.run(e);
e.run(f);
f.run(config);

console.log(a)
