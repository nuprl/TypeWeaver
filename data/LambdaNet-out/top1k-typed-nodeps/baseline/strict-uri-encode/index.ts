'use strict';
module.exports = (string: String) => encodeURIComponent(string).replace(/[!'()*]/g, (x: String) => `%${x.charCodeAt(0).toString(16).toUpperCase()}`);
