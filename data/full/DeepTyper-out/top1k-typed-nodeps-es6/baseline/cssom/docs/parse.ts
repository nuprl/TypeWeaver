if (!Array.isArray) {
	Array.isArray = function(array: any) {
		return {}.toString.call(array) === '[object Array]';
	};
}

function byId(id: string): any {
	return document.getElementById(id);
}

/**
 * @param {number} depth
 * @return {string}
 */
function makeIndent(depth: number): string {
	var INDENT: string = '    ';
	if (depth === 1) {
		return INDENT;
	} else if (depth < 1) {
		return '';
	}

	if (depth in makeIndent.cache) {
		return makeIndent.cache[depth];
	} else {
		var result: string = INDENT;
		for (var i = depth; --i;) {
			result += INDENT;
		}
		makeIndent.cache[depth] = result;
		return result;
	}
}
makeIndent.cache = {};


/**
 * stringifyObjectKey('color') -> 'color'
 * stringifyObjectKey('background-color') -> '"background-color"'
 * @param {string} key
 * @return {string}
 */
function stringifyObjectKey(key: string): string {
	return /^[a-z0-9_$]+$/i.test(key) ?
		key :
		JSON.stringify(key);
}


/**
 * @param {Object} object
 * @return {DocumentFragment}
 */
function inspect(object: any): any {

	var root: Node = document.createDocumentFragment();
	_inspect(root, object, 0);
	return root;

	/**
	 * @param {DocumentFragment} root
	 * @param {Object} object
	 * @param {number} depth
	 */
	function _inspect(root: Node, object: any, depth: number): void {
		switch (typeof object) {
			case 'object':
				if (!object) {
					//null
					root.appendChild(document.createTextNode('null'));
					break;
				}
				depth++;
				var indent: Text = document.createTextNode(makeIndent(depth));
				var span: HTMLSpanElement = document.createElement('span');
				span.textContent = ',\n';
				var comma: HTMLElement = span;
				if (Array.isArray(object)) {
					var length: number = object.length;
					if (length === 0) {
						span = span.cloneNode(false);
						span.textContent = '[]';
						root.appendChild(span);
					} else {
						span = span.cloneNode(false);
						span.textContent = '[\n';
						root.appendChild(span);
						for (var i = 0; i < length; i++) {
							root.appendChild(indent.cloneNode(true));
							_inspect(root, object[i], depth);
							if (i < length - 1) {
								root.appendChild(comma.cloneNode(true));
							}
						}
						span = span.cloneNode(false);
						span.textContent = '\n' + makeIndent(depth - 1) + ']';
						root.appendChild(span);
					}
				} else {
					var keys: string[] = Object.keys(object);
					length = keys.length;
					if (length === 0) {
						span = span.cloneNode(false);
						span.textContent = '{}';
						root.appendChild(span);
					} else {
						span = span.cloneNode(false);
						span.textContent = '{\n';
						root.appendChild(span);
						var colon: HTMLElement = span.cloneNode(false);
						colon.textContent = ': ';
						for (i = 0; i < length; i++) {
							var key: string = keys[i];
							root.appendChild(indent.cloneNode(true));
							root.appendChild(document.createTextNode(stringifyObjectKey(key)));
							root.appendChild(colon.cloneNode(true));
							_inspect(root, object[key], depth);
							if (i < length - 1) {
								root.appendChild(comma.cloneNode(true));
							}
						}
						span = span.cloneNode(false);
						span.textContent = '\n' + makeIndent(depth - 1) + '}';
						root.appendChild(span);
					}
				}
				break;

			case 'string':
				root.appendChild(document.createTextNode(JSON.stringify(object)));
				break;

			default:
				if (object) {
					root.appendChild(document.createTextNode(object.toString()));
				}
		}
	}

}


var style: CSSStyleDeclaration = byId("style");
var output: any = byId("output");
var serialized: string = byId("serialized");

function outputUpdated(): void {
	var value: string = style.value;
	if (value !== style.prevValue) {
		style.prevValue = value;
		var css: any = CSSOM.parse(value);
		window._last_parsed = css;
		uncircularOwnProperties(css);
		output.innerHTML = '';
		output.appendChild(inspect(css));
		serialized.innerHTML = css.toString();
	}
}

/**
 * @return {boolean} update happend or not
 */
function hashChanged(): string {
	var hash: string = location.hash;
	var splitted: string[] = hash.split("=");
	if (splitted.length < 2) {
		return false;
	}
	var name: string = splitted[0];
	var value: string = splitted[1];
	if (name === "#css") {
		style.value = decodeURIComponent(value);
		outputUpdated();
		return true;
	}
	return false;
}

window.onload = function() {
	hashChanged() || outputUpdated();
};

window.onhashchange = hashChanged;
style.onkeyup = style.onpaste = function changed(): void{
	outputUpdated();
};
style.onchange = function updateLocation(): void {
	if (style.value.length < 1024) {
		location.hash = "css=" + encodeURIComponent(style.value);
	} else {
		// Huge location.hash slows down the browser :(
		location.hash = 'css_is_too_big';
	}
};
