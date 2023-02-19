var versions: object = require('./versions');
var fullVersions: object = require('./full-versions');
var chromiumVersions: object = require('./chromium-versions');
var fullChromiumVersions: any[] = require('./full-chromium-versions');

var electronToChromium: Function = function (query: string) {
  var number: string = getQueryString(query);
  return number.split('.').length > 2 ? fullVersions[number] : versions[number] || undefined;
};

var chromiumToElectron: Function = function (query: string) {
  var number: string = getQueryString(query);
  return number.split('.').length > 2 ? fullChromiumVersions[number] : chromiumVersions[number] || undefined;
};

var electronToBrowserList: Function = function (query: string) {
  var number: number = getQueryString(query);
  return versions[number] ? "Chrome >= " + versions[number] : undefined;
};

var getQueryString: Function = function (query: string) {
  var number: string = query;
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
