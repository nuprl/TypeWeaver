declare namespace _default {
    export { versions };
    export { fullVersions };
    export { chromiumVersions };
    export { fullChromiumVersions };
    export { electronToChromium };
    export { electronToBrowserList };
    export { chromiumToElectron };
}
export default _default;
import versions from "./versions";
import fullVersions from "./full-versions";
import chromiumVersions from "./chromium-versions";
import fullChromiumVersions from "./full-chromium-versions";
declare function electronToChromium(query: any): any;
declare function electronToBrowserList(query: any): string;
declare function chromiumToElectron(query: any): any;
