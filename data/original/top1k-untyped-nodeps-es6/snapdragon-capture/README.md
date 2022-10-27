# snapdragon-capture [![NPM version](https://img.shields.io/npm/v/snapdragon-capture.svg?style=flat)](https://www.npmjs.com/package/snapdragon-capture) [![NPM monthly downloads](https://img.shields.io/npm/dm/snapdragon-capture.svg?style=flat)](https://npmjs.org/package/snapdragon-capture)  [![NPM total downloads](https://img.shields.io/npm/dt/snapdragon-capture.svg?style=flat)](https://npmjs.org/package/snapdragon-capture) [![Linux Build Status](https://img.shields.io/travis/jonschlinkert/snapdragon-capture.svg?style=flat&label=Travis)](https://travis-ci.org/jonschlinkert/snapdragon-capture)

> Snapdragon plugin that adds a capture method to the parser instance.

## Install

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install --save snapdragon-capture
```

## Usage

Requires [snapdragon](https://github.com/jonschlinkert/snapdragon) v0.9.0 or higher.

```js
var capture = require('snapdragon-capture');
var Snapdragon = require('snapdragon');
var snapdragon = new Snapdragon();
snapdragon.use(capture());
```

## API

**Example**

```js
var Snapdragon = require('snapdragon');
var capture = require('snapdragon-capture');
var parser = new Snapdragon.Parser();
parser.use(capture());
```

### [capture](index.js#L55)

Create a node of the given `type` using the specified regex or function.

**Params**

* `type` **{String}**
* `regex` **{RegExp|Function}**: Pass the regex to use for capturing. Pass a function if you need access to the parser instance.
* `returns` **{Object}**: Returns the parser instance for chaining

**Example**

```js
parser
  .capture('slash', /^\//)
  .capture('comma', /^,/)
  .capture('foo', function() {
    var pos = this.position();
    var match = this.match(/^\./);
    if (match) {
      return pos(this.node(match[0]));
    }
  });
```

## About

### Related projects

* [snapdragon-util](https://www.npmjs.com/package/snapdragon-util): Utilities for the snapdragon parser/compiler. | [homepage](https://github.com/jonschlinkert/snapdragon-util "Utilities for the snapdragon parser/compiler.")
* [snapdragon](https://www.npmjs.com/package/snapdragon): Easy-to-use plugin system for creating powerful, fast and versatile parsers and compilers, with built-in source-map… [more](https://github.com/jonschlinkert/snapdragon) | [homepage](https://github.com/jonschlinkert/snapdragon "Easy-to-use plugin system for creating powerful, fast and versatile parsers and compilers, with built-in source-map support.")

### Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](../../issues/new).

Please read the [contributing guide](.github/contributing.md) for advice on opening issues, pull requests, and coding standards.

### Building docs

_(This project's readme.md is generated by [verb](https://github.com/verbose/verb-generate-readme), please don't edit the readme directly. Any changes to the readme must be made in the [.verb.md](.verb.md) readme template.)_

To generate the readme, run the following command:

```sh
$ npm install -g verbose/verb#dev verb-generate-readme && verb
```

### Running tests

Running and reviewing unit tests is a great way to get familiarized with a library and its API. You can install dependencies and run tests with the following command:

```sh
$ npm install && npm test
```

### Author

**Jon Schlinkert**

* [github/jonschlinkert](https://github.com/jonschlinkert)
* [twitter/jonschlinkert](https://twitter.com/jonschlinkert)

### License

Copyright © 2017, [Jon Schlinkert](https://github.com/jonschlinkert).
MIT

***

_This file was generated by [verb-generate-readme](https://github.com/verbose/verb-generate-readme), v0.4.2, on February 08, 2017._