import request from 'request';
import allElectronVersions from 'electron-releases';
import fs from 'fs';

const electronVersions = {};
const electronFullVersions = {};
const chromiumVersions = {};
const chromiumFullVersions = {};

const makePrintable = mapping => JSON.stringify(mapping, null, "\t");

allElectronVersions
  .filter(x => x.deps)
  .reverse()
  .forEach(item => {
    const {deps: electron} = item;

    if (!electron.version.includes("nightly")) {
      // simple list
      const simpleVersion = electron.version.split(".")[0] + "." + electron.version.split(".")[1];
      const chromeVersion = electron.chrome.split(".")[0];
      electronVersions[simpleVersion] = chromeVersion;
      chromiumVersions[chromeVersion] = chromiumVersions[chromeVersion] || simpleVersion;
    }

    // explicit list
    electronFullVersions[electron.version] = electron.chrome;
    if (!chromiumFullVersions[electron.chrome]) {
      chromiumFullVersions[electron.chrome] = [];
    }
    chromiumFullVersions[electron.chrome].push(electron.version);
});

[
  {list: electronVersions, file: "versions"},
  {list: electronFullVersions, file: "full-versions"},
  {list: chromiumVersions, file: "chromium-versions"},
  {list: chromiumFullVersions, file: "full-chromium-versions"},
].forEach((obj) => {
  fs.writeFile(`${obj.file}.js`, `module.exports = ${makePrintable(obj.list)};`, function (error: any) {
    if (error) {
      throw error;
    }
  });
  fs.writeFile(`${obj.file}.json`, JSON.stringify(obj.list), function (error: any) {
    if (error) {
      throw error;
    }
  });
});