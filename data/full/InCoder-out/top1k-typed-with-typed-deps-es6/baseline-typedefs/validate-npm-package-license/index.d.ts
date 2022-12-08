export default function (argument: any): {
    validForOldPackages: boolean;
    validForNewPackages: boolean;
    warnings: string[];
} | {
    validForOldPackages: boolean;
    validForNewPackages: boolean;
    unlicensed: boolean;
    inFile?: undefined;
    spdx?: undefined;
    warnings?: undefined;
} | {
    validForOldPackages: boolean;
    validForNewPackages: boolean;
    inFile: any;
    unlicensed?: undefined;
    spdx?: undefined;
    warnings?: undefined;
} | {
    validForNewPackages: boolean;
    validForOldPackages: boolean;
    spdx: boolean;
    warnings: string[];
    unlicensed?: undefined;
    inFile?: undefined;
} | {
    validForNewPackages: boolean;
    validForOldPackages: boolean;
    spdx: boolean;
    unlicensed?: undefined;
    inFile?: undefined;
    warnings?: undefined;
};
