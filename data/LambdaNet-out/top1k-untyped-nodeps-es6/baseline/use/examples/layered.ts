
import define from 'define-property';
import use from '..';

function App(name: string): Void {
  this.name = name;
  use(this);
}

App.prototype.create = function(name: string) {
  return new App(name);
};

var a: HTMLElement = new App('a');
var b: object = a.create('b');
var c: object = b.create('c');
var d: object = c.create('d');
var e: object = d.create('e');
var f: object = e.create('f');

a.children = [];
a.use(function fn(config: object): Function {
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
