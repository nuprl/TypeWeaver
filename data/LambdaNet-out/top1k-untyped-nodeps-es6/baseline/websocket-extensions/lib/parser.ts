'use strict';

var TOKEN: RegExp    = /([!#\$%&'\*\+\-\.\^_`\|~0-9A-Za-z]+)/,
    NOTOKEN: RegExp  = /([^!#\$%&'\*\+\-\.\^_`\|~0-9A-Za-z])/g,
    QUOTED: RegExp   = /"((?:\\[\x00-\x7f]|[^\x00-\x08\x0a-\x1f\x7f"\\])*)"/,
    PARAM: Object    = new RegExp(TOKEN.source + '(?:=(?:' + TOKEN.source + '|' + QUOTED.source + '))?'),
    EXT: Object      = new RegExp(TOKEN.source + '(?: *; *' + PARAM.source + ')*', 'g'),
    EXT_LIST: HTMLElement = new RegExp('^' + EXT.source + '(?: *, *' + EXT.source + ')*$'),
    NUMBER: RegExp   = /^-?(0|[1-9][0-9]*)(\.[0-9]+)?$/;

var hasOwnProperty: Function = Object.prototype.hasOwnProperty;

var Parser: Object = {
  parseHeader: function(header: String) {
    var offers: Array = new Offers();
    if (header === '' || header === undefined) return offers;

    if (!EXT_LIST.test(header))
      throw new SyntaxError('Invalid Sec-WebSocket-Extensions header: ' + header);

    var values: Array = header.match(EXT);

    values.forEach(function(value: String) {
      var params: Array = value.match(new RegExp(PARAM.source, 'g')),
          name: String   = params.shift(),
          offer: Object  = {};

      params.forEach(function(param: String) {
        var args: Object = param.match(PARAM), key: String = args[1], data: Boolean;

        if (args[2] !== undefined) {
          data = args[2];
        } else if (args[3] !== undefined) {
          data = args[3].replace(/\\/g, '');
        } else {
          data = true;
        }
        if (NUMBER.test(data)) data = parseFloat(data);

        if (hasOwnProperty.call(offer, key)) {
          offer[key] = [].concat(offer[key]);
          offer[key].push(data);
        } else {
          offer[key] = data;
        }
      }, this);
      offers.push(name, offer);
    }, this);

    return offers;
  },

  serializeParams: function(name: String, params: Object) {
    var values: Array = [];

    var print: Function = function(key: String, value: Array) {
      if (value instanceof Array) {
        value.forEach(function(v: Array) { print(key, v) });
      } else if (value === true) {
        values.push(key);
      } else if (typeof value === 'number') {
        values.push(key + '=' + value);
      } else if (NOTOKEN.test(value)) {
        values.push(key + '="' + value.replace(/"/g, '\\"') + '"');
      } else {
        values.push(key + '=' + value);
      }
    };

    for (var key in params) print(key, params[key]);

    return [name].concat(values).join('; ');
  }
};

var Offers: Function = function() {
  this._byName  = {};
  this._inOrder = [];
};

Offers.prototype.push = function(name: String, params: String) {
  if (!hasOwnProperty.call(this._byName, name))
    this._byName[name] = [];

  this._byName[name].push(params);
  this._inOrder.push({ name: name, params: params });
};

Offers.prototype.eachOffer = function(callback: Function, context: String) {
  var list: Array = this._inOrder;
  for (var i = 0, n = list.length; i < n; i++)
    callback.call(context, list[i].name, list[i].params);
};

Offers.prototype.byName = function(name: String) {
  return this._byName[name] || [];
};

Offers.prototype.toArray = function() {
  return this._inOrder.slice();
};

export default Parser;
