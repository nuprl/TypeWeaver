(function (w: HTMLElement) {
  "use strict";

  function findBest(atobNative: Function): Function {
    // normal window
    if ('function' === typeof atobNative) { return atobNative; }


    // browserify (web worker)
    if ('function' === typeof Buffer) {
      return function atobBrowserify(a: Function): string {
        //!! Deliberately using an API that's deprecated in node.js because
        //!! this file is for browsers and we expect them to cope with it.
        //!! Discussion: github.com/node-browser-compat/atob/pull/9
        return new Buffer(a, 'base64').toString('binary');
      };
    }

    // ios web worker with base64js
    if ('object' === typeof w.base64js) {
      // bufferToBinaryString
      // https://git.coolaj86.com/coolaj86/unibabel.js/blob/master/index.js#L50
      return function atobWebWorker_iOS(a: string): string {
        var buf: string = w.base64js.b64ToByteArray(a);
        return Array.prototype.map.call(buf, function (ch: string) {
          return String.fromCharCode(ch);
        }).join('');
      };
    }

		return function () {
			// ios web worker without base64js
			throw new Error("You're probably in an old browser or an iOS webworker." +
				" It might help to include beatgammit's base64-js.");
    };
  }

  var atobBest: Function = findBest(w.atob);
  w.atob = atobBest;

  if ((typeof module === 'object') && module && module.exports) {
    export default atobBest;
  }
}(window));
