//.CommonJS
var CSSOM: HTMLInputElement = {};
///CommonJS


/**
 * @constructor
 * @see http://dev.w3.org/csswg/cssom/#the-stylesheet-interface
 */
CSSOM.StyleSheet = function StyleSheet(): Void {
	this.parentStyleSheet = null;
};


//.CommonJS
export const StyleSheet: any[] = CSSOM.StyleSheet;
///CommonJS
