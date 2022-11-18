'use strict';

var TOKEN: RegExp    = /([!#\$%&'\*\+\-\.\^_`\|~0-9A-Za-z]+)/,
    NOTOKEN: RegExp  = /([^!#\$%&'\*\+\-\.\^_`\|~0-9A-Za-z])/g,
    QUOTED: RegExp   = /"((?:\\[\x00-\x7f]|[^\x00-\x08\x0a-\x1f\x7f"\\])*)"/,
    PARAM: object    = new RegExp(TOKEN.source + '(?:=(?:' + TOKEN.source + '|' + QUOTED.source + '))?'),
    EXT: object      = new RegExp(TOKEN.source + '(?: *; *' + PARAM.source + ')*', 'g'),
    EXT_LIST: HTMLElement = new RegExp('^' + EXT.source + '(?: *, *' + EXT.source + ')*$'),
    NUMBER: RegExp   = /^-?(0|[1-9][0-9]*)(\.[0-9]+)?$/;

var hasOwnProperty: Function = Object.prototype.hasOwnProperty;

var Parser: object = {
  parseHeader: function(header: string) {
    var offers: any[] = new Offers();
    if (header === '' || header === undefined) return offers;

    if (!EXT_LIST.test(header))
      throw new SyntaxError('Invalid Sec-WebSocket-Extensions header: ' + header);

    var values: any[] = header.match(EXT);

    values.forEach(function(value: string) {
      var params: any[] = value.match(new RegExp(PARAM.source, 'g')),
          name: string   = params.shift(),
          offer: object  = {};

      params.forEach(function(param: string) {
        var args: object = param.match(PARAM), key: string = args[1], data: boolean;

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

  serializeParams: function(name: string, params: object) {
    var values: any[] = [];

    var print: Function = function(key: string, value: any[]) {
      if (value instanceof Array) {
        value.forEach(function(v: any[]) { print(key, v) });
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

Offers.prototype.push = function(name: string, params: string) {
  if (!hasOwnProperty.call(this._byName, name))
    this._byName[name] = [];

  this._byName[name].push(params);
  this._inOrder.push({ name: name, params: params });
};

Offers.prototype.eachOffer = function(callback: Function, context: string) {
  var list: any[] = this._inOrder;
  for (var i = 0, n = list.length; i < n; i++)
    callback.call(context, list[i].name, list[i].params);
};

Offers.prototype.byName = function(name: string) {
  return this._byName[name] || [];
};

Offers.prototype.toArray = function() {
  return this._inOrder.slice();
};

module.exports = Parser;
