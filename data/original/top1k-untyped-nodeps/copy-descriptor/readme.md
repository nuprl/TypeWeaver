# copy-descriptor [![NPM version](https://img.shields.io/npm/v/copy-descriptor.svg?style=flat)](https://www.npmjs.com/package/copy-descriptor) [![NPM downloads](https://img.shields.io/npm/dm/copy-descriptor.svg?style=flat)](https://npmjs.org/package/copy-descriptor) [![Build Status](https://img.shields.io/travis/jonschlinkert/copy-descriptor.svg?style=flat)](https://travis-ci.org/jonschlinkert/copy-descriptor)

Copy a descriptor from object A to object B

## Install

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install copy-descriptor --save
```

## Usage

```js
var copy = require('copy-descriptor');
```

## API

### [copy](index.js#L50)

Copy a descriptor from one object to another.

**Params**

* `receiver` **{Object}**: The target object
* `provider` **{Object}**: The provider object
* `from` **{String}**: The key to copy on provider.
* `to` **{String}**: Optionally specify a new key name to use.
* `returns` **{Object}**

**Example**

```js
function App() {
  this.cache = {};
}
App.prototype.set = function(key, val) {
  this.cache[key] = val;
  return this;
};
Object.defineProperty(App.prototype, 'count', {
  get: function() {
    return Object.keys(this.cache).length;
  }
});

copy(App.prototype, 'count', 'len');

// create an instance
var app = new App();

app.set('a', true);
app.set('b', true);
app.set('c', true);

console.log(app.count);
//=> 3
console.log(app.len);
//=> 3
```

## Related projects

You might also be interested in these projects:

* [is-accessor-descriptor](https://www.npmjs.com/package/is-accessor-descriptor): Returns true if a value has the characteristics of a valid JavaScript accessor descriptor. | [homepage](https://github.com/jonschlinkert/is-accessor-descriptor "Returns true if a value has the characteristics of a valid JavaScript accessor descriptor.")
* [is-data-descriptor](https://www.npmjs.com/package/is-data-descriptor): Returns true if a value has the characteristics of a valid JavaScript data descriptor. | [homepage](https://github.com/jonschlinkert/is-data-descriptor "Returns true if a value has the characteristics of a valid JavaScript data descriptor.")
* [is-descriptor](https://www.npmjs.com/package/is-descriptor): Returns true if a value has the characteristics of a valid JavaScript descriptor. Works for… [more](https://github.com/jonschlinkert/is-descriptor) | [homepage](https://github.com/jonschlinkert/is-descriptor "Returns true if a value has the characteristics of a valid JavaScript descriptor. Works for data descriptors and accessor descriptors.")
* [is-plain-object](https://www.npmjs.com/package/is-plain-object): Returns true if an object was created by the `Object` constructor. | [homepage](https://github.com/jonschlinkert/is-plain-object "Returns true if an object was created by the `Object` constructor.")
* [isobject](https://www.npmjs.com/package/isobject): Returns true if the value is an object and not an array or null. | [homepage](https://github.com/jonschlinkert/isobject "Returns true if the value is an object and not an array or null.")

## Contributing

This document was generated by [verb-readme-generator](https://github.com/verbose/verb-readme-generator) (a [verb](https://github.com/verbose/verb) generator), please don't edit directly. Any changes to the readme must be made in [.verb.md](.verb.md). See [Building Docs](#building-docs).

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](../../issues/new). Or visit the [verb-readme-generator](https://github.com/verbose/verb-readme-generator) project to submit bug reports or pull requests for the readme layout template.

## Building docs

Generate readme and API documentation with [verb](https://github.com/verbose/verb):

```sh
$ npm install -g verb verb-readme-generator && verb
```

## Running tests

Install dev dependencies:

```sh
$ npm install -d && npm test
```

## Author

**Jon Schlinkert**

* [github/jonschlinkert](https://github.com/jonschlinkert)
* [twitter/jonschlinkert](http://twitter.com/jonschlinkert)

## License

Copyright © 2016, [Jon Schlinkert](https://github.com/jonschlinkert).
Released under the [MIT license](https://github.com/jonschlinkert/copy-descriptor/blob/master/LICENSE).

***

_This file was generated by [verb](https://github.com/verbose/verb), v0.9.0, on June 09, 2016._