try {
  var util = require('util');
  /* istanbul ignore next */
  if (typeof util.inherits !== 'function') throw '';
  export default util.inherits;
} catch (e) {
  /* istanbul ignore next */
  export default require('./inherits_browser.js');
}