(function() {
  var Negotiator: any, availableLanguages, http, key, messages, server, val;

  Negotiator = require('../lib/negotiator').Negotiator;

  http = require('http');

  messages = {
    es: "¡Hola Mundo!",
    en: "Hello World!"
  };

  availableLanguages = (function() {
    var _results: any[];
    _results = [];
    for (key in messages) {
      val = messages[key];
      _results.push(key);
    }
    return _results;
  })();

  server = http.createServer(function(req: any, res: any) {
    var language: string, negotiator;
    negotiator = new Negotiator(req);
    console.log("Accept-Language: " + req.headers['accept-language']);
    console.log("Preferred: " + (negotiator.languages()));
    console.log("Possible: " + (negotiator.languages(availableLanguages)));
    language = negotiator.language(availableLanguages);
    console.log("Selected: " + language);
    if (language) {
      res.writeHead(200, {
        'Content-Language': language
      });
      return res.end(messages[language]);
    } else {
      res.writeHead(406);
      return res.end();
    }
  });

  server.listen(8080);

}).call(this);
