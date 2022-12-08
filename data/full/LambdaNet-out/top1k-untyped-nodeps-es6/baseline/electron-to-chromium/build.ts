import request from 'request';
import allElectronVersions from 'electron-releases';
import fs from 'fs';

const electronVersions: object = {};
const electronFullVersions: object = {};
const chromiumVersions: object = {};
const chromiumFullVersions: object = {};

const makePrintable: Function = (mapping: any[]) => JSON.stringify(mapping, null, "\t");

allElectronVersions
  .filter((x: Function) => x.deps)
  .reverse()
  .forEach((item: object) => {
    const {deps: electron} = item;

    if (!electron.version.includes("nightly")) {
      // simple list
      const simpleVersion: string = electron.version.split(".")[0] + "." + electron.version.split(".")[1];
      const chromeVersion: string = electron.chrome.split(".")[0];
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
].forEach((obj: object) => {
  fs.writeFile(`${obj.file}.js`, `module.exports = ${makePrintable(obj.list)};`, function (error: Promise) {
    if (error) {
      throw error;
    }
  });
  fs.writeFile(`${obj.file}.json`, JSON.stringify(obj.list), function (error: Promise) {
    if (error) {
      throw error;
    }
  });
});
