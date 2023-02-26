declare const util: any;
declare const yaml: any;
declare class CustomTag {
    constructor(type: any, data: any);
}
declare const tags: any[];
declare const SCHEMA: any;
declare const data = "\nsubject: Handling unknown types in JS-YAML\nscalar: !unknown_scalar_tag foo bar\nsequence: !unknown_sequence_tag [ 1, 2, 3 ]\nmapping: !unknown_mapping_tag { foo: 1, bar: 2 }\n";
declare const loaded: any;
