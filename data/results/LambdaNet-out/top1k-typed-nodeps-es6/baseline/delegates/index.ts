
/**
 * Expose `Delegator`.
 */

export default Delegator;

/**
 * Initialize a delegator.
 *
 * @param {Object} proto
 * @param {String} target
 * @api public
 */

function Delegator(proto: object, target: HTMLElement): string {
  if (!(this instanceof Delegator)) return new Delegator(proto, target);
  this.proto = proto;
  this.target = target;
  this.methods = [];
  this.getters = [];
  this.setters = [];
  this.fluents = [];
}

/**
 * Automatically delegate properties
 * from a target prototype
 *
 * @param {Object} proto
 * @param {object} targetProto
 * @param {String} targetProp
 * @api public
 */

Delegator.auto = function(proto: any[], targetProto: any[], targetProp: number){
  var delegator: HTMLElement = Delegator(proto, targetProp);
  var properties: any[] = Object.getOwnPropertyNames(targetProto);
  for (var i = 0; i < properties.length; i++) {
    var property: string = properties[i];
    var descriptor: object = Object.getOwnPropertyDescriptor(targetProto, property);
    if (descriptor.get) {
      delegator.getter(property);
    }
    if (descriptor.set) {
      delegator.setter(property);
    }
    if (descriptor.hasOwnProperty('value')) { // could be undefined but writable
      var value: string = descriptor.value;
      if (value instanceof Function) {
        delegator.method(property);
      } else {
        delegator.getter(property);
      }
      if (descriptor.writable) {
        delegator.setter(property);
      }
    }
  }
};

/**
 * Delegate method `name`.
 *
 * @param {String} name
 * @return {Delegator} self
 * @api public
 */

Delegator.prototype.method = function(name: string){
  var proto: object = this.proto;
  var target: HTMLElement = this.target;
  this.methods.push(name);

  proto[name] = function(){
    return this[target][name].apply(this[target], arguments);
  };

  return this;
};

/**
 * Delegator accessor `name`.
 *
 * @param {String} name
 * @return {Delegator} self
 * @api public
 */

Delegator.prototype.access = function(name: string){
  return this.getter(name).setter(name);
};

/**
 * Delegator getter `name`.
 *
 * @param {String} name
 * @return {Delegator} self
 * @api public
 */

Delegator.prototype.getter = function(name: string){
  var proto: HTMLElement = this.proto;
  var target: HTMLElement = this.target;
  this.getters.push(name);

  proto.__defineGetter__(name, function(){
    return this[target][name];
  });

  return this;
};

/**
 * Delegator setter `name`.
 *
 * @param {String} name
 * @return {Delegator} self
 * @api public
 */

Delegator.prototype.setter = function(name: string){
  var proto: HTMLElement = this.proto;
  var target: HTMLElement = this.target;
  this.setters.push(name);

  proto.__defineSetter__(name, function(val: string){
    return this[target][name] = val;
  });

  return this;
};

/**
 * Delegator fluent accessor
 *
 * @param {String} name
 * @return {Delegator} self
 * @api public
 */

Delegator.prototype.fluent = function (name: string) {
  var proto: object = this.proto;
  var target: HTMLElement = this.target;
  this.fluents.push(name);

  proto[name] = function(val: any[]){
    if ('undefined' != typeof val) {
      this[target][name] = val;
      return this;
    } else {
      return this[target][name];
    }
  };

  return this;
};
