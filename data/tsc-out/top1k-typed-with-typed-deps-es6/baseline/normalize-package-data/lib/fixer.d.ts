declare namespace _default {
    function warn(): void;
    function fixRepositoryField(data: any): void;
    function fixTypos(data: any): void;
    function fixScriptsField(data: any): void;
    function fixFilesField(data: any): void;
    function fixBinField(data: any): void;
    function fixManField(data: any): void;
    function fixBundleDependenciesField(data: any): void;
    function fixDependencies(data: any, strict: any): void;
    function fixModulesField(data: any): void;
    function fixKeywordsField(data: any): void;
    function fixVersionField(data: any, strict: any): boolean;
    function fixPeople(data: any): void;
    function fixNameField(data: any, options: any): void;
    function fixDescriptionField(data: any): void;
    function fixReadmeField(data: any): void;
    function fixBugsField(data: any): void;
    function fixHomepageField(data: any): boolean;
    function fixLicenseField(data: any): void;
}
export default _default;
