export namespace nyc {
    const description_18: string;
    export { description_18 as description };
    const type_23: string;
    export { type_23 as type };
    export namespace properties_3 {
        export namespace inPlace {
            const description_19: string;
            export { description_19 as description };
            const type_24: string;
            export { type_24 as type };
            const _default_12: boolean;
            export { _default_12 as default };
            import nycCommands_15 = nycCommands.instrumentOnly;
            export { nycCommands_15 as nycCommands };
        }
        export namespace exitOnError {
            const description_20: string;
            export { description_20 as description };
            const type_25: string;
            export { type_25 as type };
            const _default_13: boolean;
            export { _default_13 as default };
            import nycCommands_16 = nycCommands.instrumentOnly;
            export { nycCommands_16 as nycCommands };
        }
        export namespace _delete {
            const description_21: string;
            export { description_21 as description };
            const type_26: string;
            export { type_26 as type };
            const _default_14: boolean;
            export { _default_14 as default };
            import nycCommands_17 = nycCommands.instrumentOnly;
            export { nycCommands_17 as nycCommands };
        }
        export { _delete as delete };
        export namespace completeCopy {
            const description_22: string;
            export { description_22 as description };
            const type_27: string;
            export { type_27 as type };
            const _default_15: boolean;
            export { _default_15 as default };
            import nycCommands_18 = nycCommands.instrumentOnly;
            export { nycCommands_18 as nycCommands };
        }
        export namespace silent {
            const description_23: string;
            export { description_23 as description };
            const type_28: string;
            export { type_28 as type };
            const _default_16: boolean;
            export { _default_16 as default };
            import nycCommands_19 = nycCommands.main;
            export { nycCommands_19 as nycCommands };
            const nycAlias_3: string;
            export { nycAlias_3 as nycAlias };
        }
        export namespace all {
            const description_24: string;
            export { description_24 as description };
            const type_29: string;
            export { type_29 as type };
            const _default_17: boolean;
            export { _default_17 as default };
            import nycCommands_20 = nycCommands.main;
            export { nycCommands_20 as nycCommands };
            const nycAlias_4: string;
            export { nycAlias_4 as nycAlias };
        }
        export namespace eager {
            const description_25: string;
            export { description_25 as description };
            const type_30: string;
            export { type_30 as type };
            const _default_18: boolean;
            export { _default_18 as default };
            import nycCommands_21 = nycCommands.main;
            export { nycCommands_21 as nycCommands };
        }
        export namespace cache {
            const description_26: string;
            export { description_26 as description };
            const type_31: string;
            export { type_31 as type };
            const _default_19: boolean;
            export { _default_19 as default };
            import nycCommands_22 = nycCommands.main;
            export { nycCommands_22 as nycCommands };
            const nycAlias_5: string;
            export { nycAlias_5 as nycAlias };
        }
        export namespace cacheDir {
            const description_27: string;
            export { description_27 as description };
            const type_32: string;
            export { type_32 as type };
            import nycCommands_23 = nycCommands.main;
            export { nycCommands_23 as nycCommands };
        }
        export namespace babelCache {
            const description_28: string;
            export { description_28 as description };
            const type_33: string;
            export { type_33 as type };
            const _default_20: boolean;
            export { _default_20 as default };
            import nycCommands_24 = nycCommands.main;
            export { nycCommands_24 as nycCommands };
        }
        export namespace useSpawnWrap {
            const description_29: string;
            export { description_29 as description };
            const type_34: string;
            export { type_34 as type };
            const _default_21: boolean;
            export { _default_21 as default };
            import nycCommands_25 = nycCommands.main;
            export { nycCommands_25 as nycCommands };
        }
        export namespace hookRequire {
            const description_30: string;
            export { description_30 as description };
            const type_35: string;
            export { type_35 as type };
            const _default_22: boolean;
            export { _default_22 as default };
            import nycCommands_26 = nycCommands.main;
            export { nycCommands_26 as nycCommands };
        }
        export namespace hookRunInContext {
            const description_31: string;
            export { description_31 as description };
            const type_36: string;
            export { type_36 as type };
            const _default_23: boolean;
            export { _default_23 as default };
            import nycCommands_27 = nycCommands.main;
            export { nycCommands_27 as nycCommands };
        }
        export namespace hookRunInThisContext {
            const description_32: string;
            export { description_32 as description };
            const type_37: string;
            export { type_37 as type };
            const _default_24: boolean;
            export { _default_24 as default };
            import nycCommands_28 = nycCommands.main;
            export { nycCommands_28 as nycCommands };
        }
        export namespace clean {
            const description_33: string;
            export { description_33 as description };
            const type_38: string;
            export { type_38 as type };
            const _default_25: boolean;
            export { _default_25 as default };
            import nycCommands_29 = nycCommands.main;
            export { nycCommands_29 as nycCommands };
        }
        export namespace checkCoverage {
            const description_34: string;
            export { description_34 as description };
            const type_39: string;
            export { type_39 as type };
            const _default_26: boolean;
            export { _default_26 as default };
            import nycCommands_30 = nycCommands.report;
            export { nycCommands_30 as nycCommands };
        }
        export namespace reporter {
            const description_35: string;
            export { description_35 as description };
            const type_40: string;
            export { type_40 as type };
            export namespace items_5 {
                const type_41: string;
                export { type_41 as type };
            }
            export { items_5 as items };
            const _default_27: string[];
            export { _default_27 as default };
            import nycCommands_31 = nycCommands.report;
            export { nycCommands_31 as nycCommands };
            const nycAlias_6: string;
            export { nycAlias_6 as nycAlias };
        }
        export namespace reportDir {
            const description_36: string;
            export { description_36 as description };
            const type_42: string;
            export { type_42 as type };
            const _default_28: string;
            export { _default_28 as default };
            import nycCommands_32 = nycCommands.report;
            export { nycCommands_32 as nycCommands };
        }
        export namespace showProcessTree {
            const description_37: string;
            export { description_37 as description };
            const type_43: string;
            export { type_43 as type };
            const _default_29: boolean;
            export { _default_29 as default };
            import nycCommands_33 = nycCommands.report;
            export { nycCommands_33 as nycCommands };
        }
        export namespace skipEmpty {
            const description_38: string;
            export { description_38 as description };
            const type_44: string;
            export { type_44 as type };
            const _default_30: boolean;
            export { _default_30 as default };
            import nycCommands_34 = nycCommands.report;
            export { nycCommands_34 as nycCommands };
        }
        export namespace skipFull {
            const description_39: string;
            export { description_39 as description };
            const type_45: string;
            export { type_45 as type };
            const _default_31: boolean;
            export { _default_31 as default };
            import nycCommands_35 = nycCommands.report;
            export { nycCommands_35 as nycCommands };
        }
        export namespace excludeAfterRemap {
            const description_40: string;
            export { description_40 as description };
            const type_46: string;
            export { type_46 as type };
            const _default_32: boolean;
            export { _default_32 as default };
            import nycCommands_36 = nycCommands.checkCoverage;
            export { nycCommands_36 as nycCommands };
        }
        export namespace branches {
            const description_41: string;
            export { description_41 as description };
            const type_47: string;
            export { type_47 as type };
            const _default_33: number;
            export { _default_33 as default };
            export const minimum: number;
            export const maximum: number;
            import nycCommands_37 = nycCommands.checkCoverage;
            export { nycCommands_37 as nycCommands };
        }
        export namespace functions {
            const description_42: string;
            export { description_42 as description };
            const type_48: string;
            export { type_48 as type };
            const _default_34: number;
            export { _default_34 as default };
            const minimum_1: number;
            export { minimum_1 as minimum };
            const maximum_1: number;
            export { maximum_1 as maximum };
            import nycCommands_38 = nycCommands.checkCoverage;
            export { nycCommands_38 as nycCommands };
        }
        export namespace lines {
            const description_43: string;
            export { description_43 as description };
            const type_49: string;
            export { type_49 as type };
            const _default_35: number;
            export { _default_35 as default };
            const minimum_2: number;
            export { minimum_2 as minimum };
            const maximum_2: number;
            export { maximum_2 as maximum };
            import nycCommands_39 = nycCommands.checkCoverage;
            export { nycCommands_39 as nycCommands };
        }
        export namespace statements {
            const description_44: string;
            export { description_44 as description };
            const type_50: string;
            export { type_50 as type };
            const _default_36: number;
            export { _default_36 as default };
            const minimum_3: number;
            export { minimum_3 as minimum };
            const maximum_3: number;
            export { maximum_3 as maximum };
            import nycCommands_40 = nycCommands.checkCoverage;
            export { nycCommands_40 as nycCommands };
        }
        export namespace perFile {
            const description_45: string;
            export { description_45 as description };
            const type_51: string;
            export { type_51 as type };
            const _default_37: boolean;
            export { _default_37 as default };
            import nycCommands_41 = nycCommands.checkCoverage;
            export { nycCommands_41 as nycCommands };
        }
        export namespace sourceMap {
            const description_46: string;
            export { description_46 as description };
            const type_52: string;
            export { type_52 as type };
            const _default_38: boolean;
            export { _default_38 as default };
            import nycCommands_42 = nycCommands.instrument;
            export { nycCommands_42 as nycCommands };
        }
        export namespace require {
            const description_47: string;
            export { description_47 as description };
            const type_53: string;
            export { type_53 as type };
            export namespace items_6 {
                const type_54: string;
                export { type_54 as type };
            }
            export { items_6 as items };
            const _default_39: any[];
            export { _default_39 as default };
            import nycCommands_43 = nycCommands.instrument;
            export { nycCommands_43 as nycCommands };
            const nycAlias_7: string;
            export { nycAlias_7 as nycAlias };
        }
        export namespace instrument {
            const description_48: string;
            export { description_48 as description };
            const type_55: string;
            export { type_55 as type };
            const _default_40: boolean;
            export { _default_40 as default };
            import nycCommands_44 = nycCommands.instrument;
            export { nycCommands_44 as nycCommands };
        }
        export { cwd };
        export { nycrcPath };
        export { tempDir };
    }
    export { properties_3 as properties };
}
import defaultExclude = require("./default-exclude.js");
declare namespace nycCommands {
    const all_1: string[];
    export { all_1 as all };
    const testExclude_1: string[];
    export { testExclude_1 as testExclude };
    const instrument_1: string[];
    export { instrument_1 as instrument };
    const checkCoverage_1: string[];
    export { checkCoverage_1 as checkCoverage };
    export const report: string[];
    export const main: any[];
    export const instrumentOnly: string[];
}
import defaultExtension = require("./default-extension.js");
declare namespace cwd {
    const description_49: string;
    export { description_49 as description };
    const type_56: string;
    export { type_56 as type };
    export { _default as default };
    import nycCommands_45 = nycCommands.all;
    export { nycCommands_45 as nycCommands };
}
declare namespace instrumentVisitor_1 { }
declare namespace nycrcPath {
    const description_50: string;
    export { description_50 as description };
    import nycCommands_46 = nycCommands.all;
    export { nycCommands_46 as nycCommands };
}
declare namespace tempDir {
    const description_51: string;
    export { description_51 as description };
    const type_57: string;
    export { type_57 as type };
    const _default_41: string;
    export { _default_41 as default };
    const nycAlias_8: string;
    export { nycAlias_8 as nycAlias };
    export const nycHiddenAlias: string;
    const nycCommands_47: string[];
    export { nycCommands_47 as nycCommands };
}
export declare const defaults: {};
export declare namespace testExclude {
    const description: string;
    const type: string;
    namespace properties {
        export namespace exclude {
            const description_1: string;
            export { description_1 as description };
            const type_1: string;
            export { type_1 as type };
            export namespace items {
                const type_2: string;
                export { type_2 as type };
            }
            export { defaultExclude as default };
            import nycCommands_1 = nycCommands.testExclude;
            export { nycCommands_1 as nycCommands };
            export const nycAlias: string;
        }
        export namespace excludeNodeModules {
            const description_2: string;
            export { description_2 as description };
            const type_3: string;
            export { type_3 as type };
            const _default: boolean;
            export { _default as default };
            import nycCommands_2 = nycCommands.testExclude;
            export { nycCommands_2 as nycCommands };
        }
        export namespace include {
            const description_3: string;
            export { description_3 as description };
            const type_4: string;
            export { type_4 as type };
            export namespace items_1 {
                const type_5: string;
                export { type_5 as type };
            }
            export { items_1 as items };
            const _default_1: any[];
            export { _default_1 as default };
            import nycCommands_3 = nycCommands.testExclude;
            export { nycCommands_3 as nycCommands };
            const nycAlias_1: string;
            export { nycAlias_1 as nycAlias };
        }
        export namespace extension {
            const description_4: string;
            export { description_4 as description };
            const type_6: string;
            export { type_6 as type };
            export namespace items_2 {
                const type_7: string;
                export { type_7 as type };
            }
            export { items_2 as items };
            export { defaultExtension as default };
            import nycCommands_4 = nycCommands.testExclude;
            export { nycCommands_4 as nycCommands };
            const nycAlias_2: string;
            export { nycAlias_2 as nycAlias };
        }
        export { cwd };
    }
}
export declare namespace babelPluginIstanbul {
    const description_5: string;
    export { description_5 as description };
    const type_8: string;
    export { type_8 as type };
    export namespace properties_1 {
        export namespace coverageVariable {
            const description_6: string;
            export { description_6 as description };
            const type_9: string;
            export { type_9 as type };
            const _default_2: string;
            export { _default_2 as default };
            import nycCommands_5 = nycCommands.instrument;
            export { nycCommands_5 as nycCommands };
        }
        export namespace coverageGlobalScope {
            const description_7: string;
            export { description_7 as description };
            const type_10: string;
            export { type_10 as type };
            const _default_3: string;
            export { _default_3 as default };
            import nycCommands_6 = nycCommands.instrument;
            export { nycCommands_6 as nycCommands };
        }
        export namespace coverageGlobalScopeFunc {
            const description_8: string;
            export { description_8 as description };
            const type_11: string;
            export { type_11 as type };
            const _default_4: boolean;
            export { _default_4 as default };
            import nycCommands_7 = nycCommands.instrument;
            export { nycCommands_7 as nycCommands };
        }
        export namespace ignoreClassMethods {
            const description_9: string;
            export { description_9 as description };
            const type_12: string;
            export { type_12 as type };
            export namespace items_3 {
                const type_13: string;
                export { type_13 as type };
            }
            export { items_3 as items };
            const _default_5: any[];
            export { _default_5 as default };
            import nycCommands_8 = nycCommands.instrument;
            export { nycCommands_8 as nycCommands };
        }
        export { cwd };
    }
    export { properties_1 as properties };
}
export declare namespace instrumentVisitor {
    const description_10: string;
    export { description_10 as description };
    const type_14: string;
    export { type_14 as type };
    export { instrumentVisitor as properties };
}
export declare namespace instrumenter {
    const description_11: string;
    export { description_11 as description };
    const type_15: string;
    export { type_15 as type };
    export namespace properties_2 {
        namespace autoWrap {
            const description_12: string;
            export { description_12 as description };
            const type_16: string;
            export { type_16 as type };
            const _default_6: boolean;
            export { _default_6 as default };
            import nycCommands_9 = nycCommands.instrument;
            export { nycCommands_9 as nycCommands };
        }
        namespace esModules {
            const description_13: string;
            export { description_13 as description };
            const type_17: string;
            export { type_17 as type };
            const _default_7: boolean;
            export { _default_7 as default };
            import nycCommands_10 = nycCommands.instrument;
            export { nycCommands_10 as nycCommands };
        }
        namespace parserPlugins {
            const description_14: string;
            export { description_14 as description };
            const type_18: string;
            export { type_18 as type };
            export namespace items_4 {
                const type_19: string;
                export { type_19 as type };
            }
            export { items_4 as items };
            const _default_8: string[];
            export { _default_8 as default };
            import nycCommands_11 = nycCommands.instrument;
            export { nycCommands_11 as nycCommands };
        }
        namespace compact {
            const description_15: string;
            export { description_15 as description };
            const type_20: string;
            export { type_20 as type };
            const _default_9: boolean;
            export { _default_9 as default };
            import nycCommands_12 = nycCommands.instrument;
            export { nycCommands_12 as nycCommands };
        }
        namespace preserveComments {
            const description_16: string;
            export { description_16 as description };
            const type_21: string;
            export { type_21 as type };
            const _default_10: boolean;
            export { _default_10 as default };
            import nycCommands_13 = nycCommands.instrument;
            export { nycCommands_13 as nycCommands };
        }
        namespace produceSourceMap {
            const description_17: string;
            export { description_17 as description };
            const type_22: string;
            export { type_22 as type };
            const _default_11: boolean;
            export { _default_11 as default };
            import nycCommands_14 = nycCommands.instrument;
            export { nycCommands_14 as nycCommands };
        }
    }
    export { properties_2 as properties };
}
export {};
