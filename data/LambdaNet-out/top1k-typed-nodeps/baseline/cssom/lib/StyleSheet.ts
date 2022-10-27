//.CommonJS
var CSSOM: Buffer = {};
///CommonJS


/**
 * @constructor
 * @see http://dev.w3.org/csswg/cssom/#the-stylesheet-interface
 */
CSSOM.StyleSheet = function StyleSheet(): Void {
	this.parentStyleSheet = null;
};


//.CommonJS
exports.StyleSheet = CSSOM.StyleSheet;
///CommonJS
