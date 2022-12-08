export default normalize;
declare function normalize(data: any, warn: any, strict: boolean): void;
declare namespace normalize {
    var fixer: {
        warn: () => void;
        fixRepositoryField: (data: any) => any;
        fixTypos: (data: any) => void;
        fixScriptsField: (data: any) => void;
        fixFilesField: (data: any) => void;
        fixBinField: (data: any) => void;
        fixManField: (data: any) => void;
        fixBundleDependenciesField: (data: any) => void;
        fixDependencies: (data: any, strict: boolean) => void;
        fixModulesField: (data: any) => void;
        fixKeywordsField: (data: any) => void;
        fixVersionField: (data: any, strict: boolean) => boolean;
        fixPeople: (data: any) => void;
        fixNameField: (data: any, options: any) => void;
        fixDescriptionField: (data: any) => void;
        fixReadmeField: (data: any) => void;
        fixBugsField: (data: any) => void;
        fixHomepageField: (data: any) => boolean;
        fixLicenseField: (data: any) => any;
    };
}
