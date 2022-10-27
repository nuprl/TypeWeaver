'use strict';
export default (string: String) => encodeURIComponent(string).replace(/[!'()*]/g, (x: String) => `%${x.charCodeAt(0).toString(16).toUpperCase()}`);
