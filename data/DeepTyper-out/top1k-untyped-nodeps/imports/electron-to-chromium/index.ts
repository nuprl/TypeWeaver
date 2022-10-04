import versions from './versions';
import fullVersions from './full-versions';
import chromiumVersions from './chromium-versions';
import fullChromiumVersions from './full-chromium-versions';

var electronToChromium: any = function (query: any) {
  var number = getQueryString(query);
  return number.split('.').length > 2 ? fullVersions[number] : versions[number] || undefined;
};

var chromiumToElectron: any = function (query: any) {
  var number = getQueryString(query);
  return number.split('.').length > 2 ? fullChromiumVersions[number] : chromiumVersions[number] || undefined;
};

var electronToBrowserList: any = function (query: any) {
  var number = getQueryString(query);
  return versions[number] ? "Chrome >= " + versions[number] : undefined;
};

var getQueryString: any = function (query: any) {
  var number = query;
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
