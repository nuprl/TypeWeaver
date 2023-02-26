export default normalize;
declare function normalize(data: any, warn: boolean, strict: boolean): void;
declare namespace normalize {
    var fixer: {
        warn: () => void;
        fixRepositoryField: (data: IRepository[]) => any;
        fixTypos: (data: any) => void;
        fixScriptsField: (data: any) => void;
        fixFilesField: (data: IFileChangeData) => void;
        fixBinField: (data: BinResponse) => void;
        fixManField: (data: any) => void;
        fixBundleDependenciesField: (data: any) => void;
        fixDependencies: (data: any, strict: boolean) => void;
        fixModulesField: (data: any) => void;
        fixKeywordsField: (data: IData) => void;
        fixVersionField: (data: any, strict: boolean) => boolean;
        fixPeople: (data: Person) => void;
        fixNameField: (data: any, options: AxiosRequestConfig) => void;
        fixDescriptionField: (data: any) => void;
        fixReadmeField: (data: Readme) => void;
        fixBugsField: (data: any) => void;
        fixHomepageField: (data: any) => boolean;
        fixLicenseField: (data: any) => any;
    };
}
