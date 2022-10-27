var versions: Object = require('./versions');
var fullVersions: Object = require('./full-versions');
var chromiumVersions: Object = require('./chromium-versions');
var fullChromiumVersions: Array = require('./full-chromium-versions');

var electronToChromium: Function = function (query: String) {
  var number: String = getQueryString(query);
  return number.split('.').length > 2 ? fullVersions[number] : versions[number] || undefined;
};

var chromiumToElectron: Function = function (query: String) {
  var number: String = getQueryString(query);
  return number.split('.').length > 2 ? fullChromiumVersions[number] : chromiumVersions[number] || undefined;
};

var electronToBrowserList: Function = function (query: String) {
  var number: Number = getQueryString(query);
  return versions[number] ? "Chrome >= " + versions[number] : undefined;
};

var getQueryString: Function = function (query: String) {
  var number: String = query;
  if (query === 1) { number = "1.0" }
  if (typeof query === 'number') { number += ''; }
  return number;
};

module.exports = {
  versions: versions,
  fullVersions: fullVersions,
  chromiumVersions: chromiumVersions,
  fullChromiumVersions: fullChromiumVersions,
  electronToChromium: electronToChromium,
  electronToBrowserList: electronToBrowserList,
  chromiumToElectron: chromiumToElectron
};
