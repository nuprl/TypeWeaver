'use strict';
export default (string: string) => encodeURIComponent(string).replace(/[!'()*]/g, (x: string) => `%${x.charCodeAt(0).toString(16).toUpperCase()}`);
