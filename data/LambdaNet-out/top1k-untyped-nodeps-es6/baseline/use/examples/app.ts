
import util from 'util';
import plugins from 'base-plugins';

function Factory(config: Function): Void {
  this.use = function(fn: Function) {
    fn.call(this, this);
    return this;
  };
  this.use(plugins());
}


function Multi(): Void {
  Factory.call(this);
  this.isMulti = true;
  this.apps = {};
}
util.inherits(Factory, Multi);

Multi.prototype.app = function(name: String) {
  var app: String = this.apps[name] = new App();
  this.run(app);
  return app;
};


function App(): Void {
  Factory.call(this);
  this.isApp = true;
  this.collections = {};
}
util.inherits(Factory, App);

App.prototype.collection = function(name: String) {
  var collection: String = this.collections[name] = new Collection();
  this.run(collection);
  return collection;
};


function Collection(): Void {
  Factory.call(this);
  this.isCollection = true;
  this.items = {};
}
util.inherits(Factory, Collection);

Collection.prototype.item = function(name: String) {
  var item: String = this.items[name] = new Item();
  this.run(item);
  return item;
};


function Item(): Void {
  Factory.call(this);
  this.isItem = true;
  this.fields = {};
}
util.inherits(Factory, Item);

Item.prototype.field = function(name: String) {
  var field: String = this.fields[name] = new Field();
  this.run(field);
  return field;
};


function Field(): Void {
  Factory.call(this);
  this.isField = true;
}
util.inherits(Factory, Field);

Field.prototype.field = function(key: String, val: Array) {
  this[key] = val;
  this.run(val);
  return this;
};


var multi: HTMLElement = new Multi();
multi.use(function fn(app: Object): Function {
  if (!app.isItem) return fn;
  console.log(app)
});

var app: HTMLElement = multi.app('b');
var collection: HTMLElement = app.collection('c');
var item: Array = collection.item('d');
var field: String = item.field('e');

