declare var fixer: any;
declare var makeWarning: any;
declare var fieldsToFix: string[];
declare var otherThingsToFix: string[];
declare var thingsToFix: string[];
declare function normalize(data: any, warn: any, strict: any): void;
declare namespace normalize {
    var fixer: any;
}
declare function ucFirst(string: string): string;
