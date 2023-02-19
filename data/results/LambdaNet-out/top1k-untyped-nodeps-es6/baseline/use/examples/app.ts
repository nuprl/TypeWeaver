
import util from 'util';
import plugins from 'base-plugins';

function Factory(config: Function): void {
  this.use = function(fn: Function) {
    fn.call(this, this);
    return this;
  };
  this.use(plugins());
}


function Multi(): void {
  Factory.call(this);
  this.isMulti = true;
  this.apps = {};
}
util.inherits(Factory, Multi);

Multi.prototype.app = function(name: string) {
  var app: string = this.apps[name] = new App();
  this.run(app);
  return app;
};


function App(): void {
  Factory.call(this);
  this.isApp = true;
  this.collections = {};
}
util.inherits(Factory, App);

App.prototype.collection = function(name: string) {
  var collection: string = this.collections[name] = new Collection();
  this.run(collection);
  return collection;
};


function Collection(): void {
  Factory.call(this);
  this.isCollection = true;
  this.items = {};
}
util.inherits(Factory, Collection);

Collection.prototype.item = function(name: string) {
  var item: string = this.items[name] = new Item();
  this.run(item);
  return item;
};


function Item(): void {
  Factory.call(this);
  this.isItem = true;
  this.fields = {};
}
util.inherits(Factory, Item);

Item.prototype.field = function(name: string) {
  var field: string = this.fields[name] = new Field();
  this.run(field);
  return field;
};


function Field(): void {
  Factory.call(this);
  this.isField = true;
}
util.inherits(Factory, Field);

Field.prototype.field = function(key: string, val: any[]) {
  this[key] = val;
  this.run(val);
  return this;
};


var multi: HTMLElement = new Multi();
multi.use(function fn(app: object): Function {
  if (!app.isItem) return fn;
  console.log(app)
});

var app: HTMLElement = multi.app('b');
var collection: HTMLElement = app.collection('c');
var item: any[] = collection.item('d');
var field: string = item.field('e');

