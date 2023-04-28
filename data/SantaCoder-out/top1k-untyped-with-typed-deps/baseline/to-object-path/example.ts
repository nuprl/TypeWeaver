'use strict';

var Base = require('base');
var toPath = require('./');

function App(options: Object) {
  Base.call(this);
  this.options = options || {};
}

Base.extend(App);

App.prototype.option = function(key: string, value: any) {
  var path = toPath('options', key);
  if (arguments.length === 1) {
    return this.get(path, value);
  }
  this.set(path, value);
  return this;
};

var app = new App();
app.option('foo.bar', 'baz');

console.log(app);
//=> {options: { foo: { bar: 'baz' }}}

console.log(app.option('foo'));
//=> { bar: 'baz' }