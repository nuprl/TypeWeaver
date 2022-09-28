'use strict';

var copy: Function = require('..');

function App(): Void {
  this.cache = {};
}

App.prototype.set = function(key: String, val: String) {
  this.cache[key] = val;
  return this;
};

Object.defineProperty(App.prototype, 'count', {
  get: function() {
    return Object.keys(this.cache).length;
  }
});

copy(App.prototype, 'count', 'len');

var app: Map = new App();
app.set('a', true);
app.set('b', true);
app.set('c', true);

console.log(app.count);
//=> 3
console.log(app.len);
//=> 3
