'use strict';

import Base from 'base';
import toPath from './';

function App(options) {
  Base.call(this);
  this.options = options || {};
}

Base.extend(App);

App.prototype.option = function(key, value) {
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
