'use strict';

var TOKEN: RegExp    = /([!#\$%&'\*\+\-\.\^_`\|~0-9A-Za-z]+)/,
    NOTOKEN  = /([^!#\$%&'\*\+\-\.\^_`\|~0-9A-Za-z])/g,
    QUOTED   = /"((?:\\[\x00-\x7f]|[^\x00-\x08\x0a-\x1f\x7f"\\])*)"/,
    PARAM    = new RegExp(TOKEN.source + '(?:=(?:' + TOKEN.source + '|' + QUOTED.source + '))?'),
    EXT      = new RegExp(TOKEN.source + '(?: *; *' + PARAM.source + ')*', 'g'),
    EXT_LIST = new RegExp('^' + EXT.source + '(?: *, *' + EXT.source + ')*$'),
    NUMBER   = /^-?(0|[1-9][0-9]*)(\.[0-9]+)?$/;

var hasOwnProperty: any = Object.prototype.hasOwnProperty;

var Parser: any = {
  parseHeader: function(header: string) {
    var offers: any = new Offers();
    if (header === '' || header === undefined) return offers;

    if (!EXT_LIST.test(header))
      throw new SyntaxError('Invalid Sec-WebSocket-Extensions header: ' + header);

    var values: string[] = header.match(EXT);

    values.forEach(function(value: string) {
      var params: any = value.match(new RegExp(PARAM.source, 'g')),
          name   = params.shift(),
          offer  = {};

      params.forEach(function(param: any) {
        var args: any = param.match(PARAM), key = args[1], data;

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

  serializeParams: function(name: string, params: any) {
    var values: any[] = [];

    var print: void = function(key: any, value: any) {
      if (value instanceof Array) {
        value.forEach(function(v: any) { print(key, v) });
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

var Offers: void = function() {
  this._byName  = {};
  this._inOrder = [];
};

Offers.prototype.push = function(name: any, params: any) {
  if (!hasOwnProperty.call(this._byName, name))
    this._byName[name] = [];

  this._byName[name].push(params);
  this._inOrder.push({ name: name, params: params });
};

Offers.prototype.eachOffer = function(callback: any, context: any) {
  var list: any = this._inOrder;
  for (var i = 0, n = list.length; i < n; i++)
    callback.call(context, list[i].name, list[i].params);
};

Offers.prototype.byName = function(name: any) {
  return this._byName[name] || [];
};

Offers.prototype.toArray = function() {
  return this._inOrder.slice();
};

module.exports = Parser;
