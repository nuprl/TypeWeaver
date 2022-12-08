
import define from 'define-property';
import use from '..';

function App(name: String) {
  this.name = name;
  use(this);
}

App.prototype.create = function(name: String) {
  return new App(name);
};

var a = new App('a');
var b = a.create('b');
var c = b.create('c');
var d = c.create('d');
var e = d.create('e');
var f = e.create('f');

a.children = [];
a.use(function fn(config: Config) {
  if (!config.name) return fn;
  a.children.push(config.name);
  return fn;
});

var config = {};

a.run(b);
b.run(c);
c.run(d);
d.run(e);
e.run(f);
f.run(config);

console.log(a)