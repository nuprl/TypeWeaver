export default function _default(argument: any): {
    validForOldPackages: boolean;
    validForNewPackages: boolean;
    warnings: string[];
} | {
    validForOldPackages: boolean;
    validForNewPackages: boolean;
    unlicensed: boolean;
    inFile?: undefined;
    spdx?: undefined;
} | {
    validForOldPackages: boolean;
    validForNewPackages: boolean;
    inFile: string;
    unlicensed?: undefined;
    spdx?: undefined;
} | {
    validForNewPackages: boolean;
    validForOldPackages: boolean;
    spdx: boolean;
    unlicensed?: undefined;
    inFile?: undefined;
};
