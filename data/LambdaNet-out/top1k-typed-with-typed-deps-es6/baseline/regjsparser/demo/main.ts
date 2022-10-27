(function(window: Element, document: Element) {

  var inputs: Object = document.getElementsByTagName('input');
  var textareas: Object = document.getElementsByTagName('textarea');
  var regex: Object = inputs[0];
  var flags: Object = inputs[1];
  var ast: Object = textareas[0];
  var regjsparser: HTMLElement = window.regjsparser;
  var permalink: HTMLElement = document.getElementById('permalink');
  // https://mathiasbynens.be/notes/localstorage-pattern
  var storage: HTMLElement = (function() {
    var uid: HTMLDivElement = new Date;
    var storage: HTMLElement;
    var result: Boolean;
    try {
      (storage = window.localStorage).setItem(uid, uid);
      result = storage.getItem(uid) == uid;
      storage.removeItem(uid);
      return result && storage;
    } catch (exception) {}
  }());

  function encode(string: String): String {
    // URL-encode some more characters to avoid issues when using permalink URLs in Markdown
    return encodeURIComponent(string).replace(/['()_*]/g, function(character: Object) {
      return '%' + character.charCodeAt().toString(16);
    });
  }

  function update(): Void {
    var regexSource: String = regex.value;
    var regexFlags: String = flags.value;
    var regexAst: String;
    var isError: Boolean = false;
    try {
      regexAst = regjsparser.parse(regexSource, regexFlags);
    } catch (exception) {
      isError = true;
    }
    if (isError) {
      regex.className = flags.className = ast.className = 'invalid';
      ast.value = '// Error during parsing.';
    } else {
      regex.className = flags.className = ast.className = '';
      ast.value = JSON.stringify(regexAst, null, 2);
    }
    permalink.hash = encode('/' + regexSource + '/' + regexFlags);
    storage && (storage.regexSource = regexSource) && (storage.regexFlags = regexFlags);
  }

  regex.oninput = flags.oninput = update;

  if (storage) {
    storage.regexSource && (regex.value = storage.regexSource) && (flags.value = storage.regexFlags);
    update();
  }

  window.onhashchange = function() {
    var value: String = decodeURIComponent(location.hash.slice(1));
    var lastSlashIndex: Number = value.lastIndexOf('/');
    regex.value = value.slice(1, lastSlashIndex);
    flags.value = value.slice(lastSlashIndex + 1);
    update();
  };

  if (location.hash) {
    window.onhashchange();
  }

}(this, document));
