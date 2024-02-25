import versions = require("./versions");
import fullVersions = require("./full-versions");
import chromiumVersions = require("./chromium-versions");
import fullChromiumVersions = require("./full-chromium-versions");
export function electronToChromium(query: any): any;
export function electronToBrowserList(query: any): string;
export function chromiumToElectron(query: any): any;
export { versions, fullVersions, chromiumVersions, fullChromiumVersions };
