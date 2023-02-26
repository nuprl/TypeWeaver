declare const defaultExclude: any;
declare const defaultExtension: any;
declare const nycCommands: {
    all: string[];
    testExclude: string[];
    instrument: string[];
    checkCoverage: string[];
    report: string[];
    main: any[];
    instrumentOnly: string[];
};
declare const cwd: {
    description: string;
    type: string;
    readonly default: string;
    nycCommands: string[];
};
declare const nycrcPath: {
    description: string;
    nycCommands: string[];
};
declare const tempDir: {
    description: string;
    type: string;
    default: string;
    nycAlias: string;
    nycHiddenAlias: string;
    nycCommands: string[];
};
declare const testExclude: {
    exclude: {
        description: string;
        type: string;
        items: {
            type: string;
        };
        default: any;
        nycCommands: string[];
        nycAlias: string;
    };
    excludeNodeModules: {
        description: string;
        type: string;
        default: boolean;
        nycCommands: string[];
    };
    include: {
        description: string;
        type: string;
        items: {
            type: string;
        };
        default: any[];
        nycCommands: string[];
        nycAlias: string;
    };
    extension: {
        description: string;
        type: string;
        items: {
            type: string;
        };
        default: any;
        nycCommands: string[];
        nycAlias: string;
    };
};
declare const instrumentVisitor: {
    coverageVariable: {
        description: string;
        type: string;
        default: string;
        nycCommands: string[];
    };
    coverageGlobalScope: {
        description: string;
        type: string;
        default: string;
        nycCommands: string[];
    };
    coverageGlobalScopeFunc: {
        description: string;
        type: string;
        default: boolean;
        nycCommands: string[];
    };
    ignoreClassMethods: {
        description: string;
        type: string;
        items: {
            type: string;
        };
        default: any[];
        nycCommands: string[];
    };
};
declare const instrumentParseGen: {
    autoWrap: {
        description: string;
        type: string;
        default: boolean;
        nycCommands: string[];
    };
    esModules: {
        description: string;
        type: string;
        default: boolean;
        nycCommands: string[];
    };
    parserPlugins: {
        description: string;
        type: string;
        items: {
            type: string;
        };
        default: string[];
        nycCommands: string[];
    };
    compact: {
        description: string;
        type: string;
        default: boolean;
        nycCommands: string[];
    };
    preserveComments: {
        description: string;
        type: string;
        default: boolean;
        nycCommands: string[];
    };
    produceSourceMap: {
        description: string;
        type: string;
        default: boolean;
        nycCommands: string[];
    };
};
declare const checkCoverage: {
    excludeAfterRemap: {
        description: string;
        type: string;
        default: boolean;
        nycCommands: string[];
    };
    branches: {
        description: string;
        type: string;
        default: number;
        minimum: number;
        maximum: number;
        nycCommands: string[];
    };
    functions: {
        description: string;
        type: string;
        default: number;
        minimum: number;
        maximum: number;
        nycCommands: string[];
    };
    lines: {
        description: string;
        type: string;
        default: number;
        minimum: number;
        maximum: number;
        nycCommands: string[];
    };
    statements: {
        description: string;
        type: string;
        default: number;
        minimum: number;
        maximum: number;
        nycCommands: string[];
    };
    perFile: {
        description: string;
        type: string;
        default: boolean;
        nycCommands: string[];
    };
};
declare const report: {
    checkCoverage: {
        description: string;
        type: string;
        default: boolean;
        nycCommands: string[];
    };
    reporter: {
        description: string;
        type: string;
        items: {
            type: string;
        };
        default: string[];
        nycCommands: string[];
        nycAlias: string;
    };
    reportDir: {
        description: string;
        type: string;
        default: string;
        nycCommands: string[];
    };
    showProcessTree: {
        description: string;
        type: string;
        default: boolean;
        nycCommands: string[];
    };
    skipEmpty: {
        description: string;
        type: string;
        default: boolean;
        nycCommands: string[];
    };
    skipFull: {
        description: string;
        type: string;
        default: boolean;
        nycCommands: string[];
    };
};
declare const nycMain: {
    silent: {
        description: string;
        type: string;
        default: boolean;
        nycCommands: any[];
        nycAlias: string;
    };
    all: {
        description: string;
        type: string;
        default: boolean;
        nycCommands: any[];
        nycAlias: string;
    };
    eager: {
        description: string;
        type: string;
        default: boolean;
        nycCommands: any[];
    };
    cache: {
        description: string;
        type: string;
        default: boolean;
        nycCommands: any[];
        nycAlias: string;
    };
    cacheDir: {
        description: string;
        type: string;
        nycCommands: any[];
    };
    babelCache: {
        description: string;
        type: string;
        default: boolean;
        nycCommands: any[];
    };
    useSpawnWrap: {
        description: string;
        type: string;
        default: boolean;
        nycCommands: any[];
    };
    hookRequire: {
        description: string;
        type: string;
        default: boolean;
        nycCommands: any[];
    };
    hookRunInContext: {
        description: string;
        type: string;
        default: boolean;
        nycCommands: any[];
    };
    hookRunInThisContext: {
        description: string;
        type: string;
        default: boolean;
        nycCommands: any[];
    };
    clean: {
        description: string;
        type: string;
        default: boolean;
        nycCommands: any[];
    };
};
declare const instrumentOnly: {
    inPlace: {
        description: string;
        type: string;
        default: boolean;
        nycCommands: string[];
    };
    exitOnError: {
        description: string;
        type: string;
        default: boolean;
        nycCommands: string[];
    };
    delete: {
        description: string;
        type: string;
        default: boolean;
        nycCommands: string[];
    };
    completeCopy: {
        description: string;
        type: string;
        default: boolean;
        nycCommands: string[];
    };
};
declare const nyc: {
    description: string;
    type: string;
    properties: {
        inPlace: {
            description: string;
            type: string;
            default: boolean;
            nycCommands: string[];
        };
        exitOnError: {
            description: string;
            type: string;
            default: boolean;
            nycCommands: string[];
        };
        delete: {
            description: string;
            type: string;
            default: boolean;
            nycCommands: string[];
        };
        completeCopy: {
            description: string;
            type: string;
            default: boolean;
            nycCommands: string[];
        };
        silent: {
            description: string;
            type: string;
            default: boolean;
            nycCommands: any[];
            nycAlias: string;
        };
        all: {
            description: string;
            type: string;
            default: boolean;
            nycCommands: any[];
            nycAlias: string;
        };
        eager: {
            description: string;
            type: string;
            default: boolean;
            nycCommands: any[];
        };
        cache: {
            description: string;
            type: string;
            default: boolean;
            nycCommands: any[];
            nycAlias: string;
        };
        cacheDir: {
            description: string;
            type: string;
            nycCommands: any[];
        };
        babelCache: {
            description: string;
            type: string;
            default: boolean;
            nycCommands: any[];
        };
        useSpawnWrap: {
            description: string;
            type: string;
            default: boolean;
            nycCommands: any[];
        };
        hookRequire: {
            description: string;
            type: string;
            default: boolean;
            nycCommands: any[];
        };
        hookRunInContext: {
            description: string;
            type: string;
            default: boolean;
            nycCommands: any[];
        };
        hookRunInThisContext: {
            description: string;
            type: string;
            default: boolean;
            nycCommands: any[];
        };
        clean: {
            description: string;
            type: string;
            default: boolean;
            nycCommands: any[];
        };
        checkCoverage: {
            description: string;
            type: string;
            default: boolean;
            nycCommands: string[];
        };
        reporter: {
            description: string;
            type: string;
            items: {
                type: string;
            };
            default: string[];
            nycCommands: string[];
            nycAlias: string;
        };
        reportDir: {
            description: string;
            type: string;
            default: string;
            nycCommands: string[];
        };
        showProcessTree: {
            description: string;
            type: string;
            default: boolean;
            nycCommands: string[];
        };
        skipEmpty: {
            description: string;
            type: string;
            default: boolean;
            nycCommands: string[];
        };
        skipFull: {
            description: string;
            type: string;
            default: boolean;
            nycCommands: string[];
        };
        excludeAfterRemap: {
            description: string;
            type: string;
            default: boolean;
            nycCommands: string[];
        };
        branches: {
            description: string;
            type: string;
            default: number;
            minimum: number;
            maximum: number;
            nycCommands: string[];
        };
        functions: {
            description: string;
            type: string;
            default: number;
            minimum: number;
            maximum: number;
            nycCommands: string[];
        };
        lines: {
            description: string;
            type: string;
            default: number;
            minimum: number;
            maximum: number;
            nycCommands: string[];
        };
        statements: {
            description: string;
            type: string;
            default: number;
            minimum: number;
            maximum: number;
            nycCommands: string[];
        };
        perFile: {
            description: string;
            type: string;
            default: boolean;
            nycCommands: string[];
        };
        sourceMap: {
            description: string;
            type: string;
            default: boolean;
            nycCommands: string[];
        };
        require: {
            description: string;
            type: string;
            items: {
                type: string;
            };
            default: any[];
            nycCommands: string[];
            nycAlias: string;
        };
        instrument: {
            description: string;
            type: string;
            default: boolean;
            nycCommands: string[];
        };
        autoWrap: {
            description: string;
            type: string;
            default: boolean;
            nycCommands: string[];
        };
        esModules: {
            description: string;
            type: string;
            default: boolean;
            nycCommands: string[];
        };
        parserPlugins: {
            description: string;
            type: string;
            items: {
                type: string;
            };
            default: string[];
            nycCommands: string[];
        };
        compact: {
            description: string;
            type: string;
            default: boolean;
            nycCommands: string[];
        };
        preserveComments: {
            description: string;
            type: string;
            default: boolean;
            nycCommands: string[];
        };
        produceSourceMap: {
            description: string;
            type: string;
            default: boolean;
            nycCommands: string[];
        };
        coverageVariable: {
            description: string;
            type: string;
            default: string;
            nycCommands: string[];
        };
        coverageGlobalScope: {
            description: string;
            type: string;
            default: string;
            nycCommands: string[];
        };
        coverageGlobalScopeFunc: {
            description: string;
            type: string;
            default: boolean;
            nycCommands: string[];
        };
        ignoreClassMethods: {
            description: string;
            type: string;
            items: {
                type: string;
            };
            default: any[];
            nycCommands: string[];
        };
        exclude: {
            description: string;
            type: string;
            items: {
                type: string;
            };
            default: any;
            nycCommands: string[];
            nycAlias: string;
        };
        excludeNodeModules: {
            description: string;
            type: string;
            default: boolean;
            nycCommands: string[];
        };
        include: {
            description: string;
            type: string;
            items: {
                type: string;
            };
            default: any[];
            nycCommands: string[];
            nycAlias: string;
        };
        extension: {
            description: string;
            type: string;
            items: {
                type: string;
            };
            default: any;
            nycCommands: string[];
            nycAlias: string;
        };
        cwd: {
            description: string;
            type: string;
            readonly default: string;
            nycCommands: string[];
        };
        nycrcPath: {
            description: string;
            nycCommands: string[];
        };
        tempDir: {
            description: string;
            type: string;
            default: string;
            nycAlias: string;
            nycHiddenAlias: string;
            nycCommands: string[];
        };
    };
};
declare const configs: {
    nyc: {
        description: string;
        type: string;
        properties: {
            inPlace: {
                description: string;
                type: string;
                default: boolean;
                nycCommands: string[];
            };
            exitOnError: {
                description: string;
                type: string;
                default: boolean;
                nycCommands: string[];
            };
            delete: {
                description: string;
                type: string;
                default: boolean;
                nycCommands: string[];
            };
            completeCopy: {
                description: string;
                type: string;
                default: boolean;
                nycCommands: string[];
            };
            silent: {
                description: string;
                type: string;
                default: boolean;
                nycCommands: any[];
                nycAlias: string;
            };
            all: {
                description: string;
                type: string;
                default: boolean;
                nycCommands: any[];
                nycAlias: string;
            };
            eager: {
                description: string;
                type: string;
                default: boolean;
                nycCommands: any[];
            };
            cache: {
                description: string;
                type: string;
                default: boolean;
                nycCommands: any[];
                nycAlias: string;
            };
            cacheDir: {
                description: string;
                type: string;
                nycCommands: any[];
            };
            babelCache: {
                description: string;
                type: string;
                default: boolean;
                nycCommands: any[];
            };
            useSpawnWrap: {
                description: string;
                type: string;
                default: boolean;
                nycCommands: any[];
            };
            hookRequire: {
                description: string;
                type: string;
                default: boolean;
                nycCommands: any[];
            };
            hookRunInContext: {
                description: string;
                type: string;
                default: boolean;
                nycCommands: any[];
            };
            hookRunInThisContext: {
                description: string;
                type: string;
                default: boolean;
                nycCommands: any[];
            };
            clean: {
                description: string;
                type: string;
                default: boolean;
                nycCommands: any[];
            };
            checkCoverage: {
                description: string;
                type: string;
                default: boolean;
                nycCommands: string[];
            };
            reporter: {
                description: string;
                type: string;
                items: {
                    type: string;
                };
                default: string[];
                nycCommands: string[];
                nycAlias: string;
            };
            reportDir: {
                description: string;
                type: string;
                default: string;
                nycCommands: string[];
            };
            showProcessTree: {
                description: string;
                type: string;
                default: boolean;
                nycCommands: string[];
            };
            skipEmpty: {
                description: string;
                type: string;
                default: boolean;
                nycCommands: string[];
            };
            skipFull: {
                description: string;
                type: string;
                default: boolean;
                nycCommands: string[];
            };
            excludeAfterRemap: {
                description: string;
                type: string;
                default: boolean;
                nycCommands: string[];
            };
            branches: {
                description: string;
                type: string;
                default: number;
                minimum: number;
                maximum: number;
                nycCommands: string[];
            };
            functions: {
                description: string;
                type: string;
                default: number;
                minimum: number;
                maximum: number;
                nycCommands: string[];
            };
            lines: {
                description: string;
                type: string;
                default: number;
                minimum: number;
                maximum: number;
                nycCommands: string[];
            };
            statements: {
                description: string;
                type: string;
                default: number;
                minimum: number;
                maximum: number;
                nycCommands: string[];
            };
            perFile: {
                description: string;
                type: string;
                default: boolean;
                nycCommands: string[];
            };
            sourceMap: {
                description: string;
                type: string;
                default: boolean;
                nycCommands: string[];
            };
            require: {
                description: string;
                type: string;
                items: {
                    type: string;
                };
                default: any[];
                nycCommands: string[];
                nycAlias: string;
            };
            instrument: {
                description: string;
                type: string;
                default: boolean;
                nycCommands: string[];
            };
            autoWrap: {
                description: string;
                type: string;
                default: boolean;
                nycCommands: string[];
            };
            esModules: {
                description: string;
                type: string;
                default: boolean;
                nycCommands: string[];
            };
            parserPlugins: {
                description: string;
                type: string;
                items: {
                    type: string;
                };
                default: string[];
                nycCommands: string[];
            };
            compact: {
                description: string;
                type: string;
                default: boolean;
                nycCommands: string[];
            };
            preserveComments: {
                description: string;
                type: string;
                default: boolean;
                nycCommands: string[];
            };
            produceSourceMap: {
                description: string;
                type: string;
                default: boolean;
                nycCommands: string[];
            };
            coverageVariable: {
                description: string;
                type: string;
                default: string;
                nycCommands: string[];
            };
            coverageGlobalScope: {
                description: string;
                type: string;
                default: string;
                nycCommands: string[];
            };
            coverageGlobalScopeFunc: {
                description: string;
                type: string;
                default: boolean;
                nycCommands: string[];
            };
            ignoreClassMethods: {
                description: string;
                type: string;
                items: {
                    type: string;
                };
                default: any[];
                nycCommands: string[];
            };
            exclude: {
                description: string;
                type: string;
                items: {
                    type: string;
                };
                default: any;
                nycCommands: string[];
                nycAlias: string;
            };
            excludeNodeModules: {
                description: string;
                type: string;
                default: boolean;
                nycCommands: string[];
            };
            include: {
                description: string;
                type: string;
                items: {
                    type: string;
                };
                default: any[];
                nycCommands: string[];
                nycAlias: string;
            };
            extension: {
                description: string;
                type: string;
                items: {
                    type: string;
                };
                default: any;
                nycCommands: string[];
                nycAlias: string;
            };
            cwd: {
                description: string;
                type: string;
                readonly default: string;
                nycCommands: string[];
            };
            nycrcPath: {
                description: string;
                nycCommands: string[];
            };
            tempDir: {
                description: string;
                type: string;
                default: string;
                nycAlias: string;
                nycHiddenAlias: string;
                nycCommands: string[];
            };
        };
    };
    testExclude: {
        description: string;
        type: string;
        properties: {
            exclude: {
                description: string;
                type: string;
                items: {
                    type: string;
                };
                default: any;
                nycCommands: string[];
                nycAlias: string;
            };
            excludeNodeModules: {
                description: string;
                type: string;
                default: boolean;
                nycCommands: string[];
            };
            include: {
                description: string;
                type: string;
                items: {
                    type: string;
                };
                default: any[];
                nycCommands: string[];
                nycAlias: string;
            };
            extension: {
                description: string;
                type: string;
                items: {
                    type: string;
                };
                default: any;
                nycCommands: string[];
                nycAlias: string;
            };
            cwd: {
                description: string;
                type: string;
                readonly default: string;
                nycCommands: string[];
            };
        };
    };
    babelPluginIstanbul: {
        description: string;
        type: string;
        properties: {
            coverageVariable: {
                description: string;
                type: string;
                default: string;
                nycCommands: string[];
            };
            coverageGlobalScope: {
                description: string;
                type: string;
                default: string;
                nycCommands: string[];
            };
            coverageGlobalScopeFunc: {
                description: string;
                type: string;
                default: boolean;
                nycCommands: string[];
            };
            ignoreClassMethods: {
                description: string;
                type: string;
                items: {
                    type: string;
                };
                default: any[];
                nycCommands: string[];
            };
            exclude: {
                description: string;
                type: string;
                items: {
                    type: string;
                };
                default: any;
                nycCommands: string[];
                nycAlias: string;
            };
            excludeNodeModules: {
                description: string;
                type: string;
                default: boolean;
                nycCommands: string[];
            };
            include: {
                description: string;
                type: string;
                items: {
                    type: string;
                };
                default: any[];
                nycCommands: string[];
                nycAlias: string;
            };
            extension: {
                description: string;
                type: string;
                items: {
                    type: string;
                };
                default: any;
                nycCommands: string[];
                nycAlias: string;
            };
            cwd: {
                description: string;
                type: string;
                readonly default: string;
                nycCommands: string[];
            };
        };
    };
    instrumentVisitor: {
        description: string;
        type: string;
        properties: {
            coverageVariable: {
                description: string;
                type: string;
                default: string;
                nycCommands: string[];
            };
            coverageGlobalScope: {
                description: string;
                type: string;
                default: string;
                nycCommands: string[];
            };
            coverageGlobalScopeFunc: {
                description: string;
                type: string;
                default: boolean;
                nycCommands: string[];
            };
            ignoreClassMethods: {
                description: string;
                type: string;
                items: {
                    type: string;
                };
                default: any[];
                nycCommands: string[];
            };
        };
    };
    instrumenter: {
        description: string;
        type: string;
        properties: {
            autoWrap: {
                description: string;
                type: string;
                default: boolean;
                nycCommands: string[];
            };
            esModules: {
                description: string;
                type: string;
                default: boolean;
                nycCommands: string[];
            };
            parserPlugins: {
                description: string;
                type: string;
                items: {
                    type: string;
                };
                default: string[];
                nycCommands: string[];
            };
            compact: {
                description: string;
                type: string;
                default: boolean;
                nycCommands: string[];
            };
            preserveComments: {
                description: string;
                type: string;
                default: boolean;
                nycCommands: string[];
            };
            produceSourceMap: {
                description: string;
                type: string;
                default: boolean;
                nycCommands: string[];
            };
            coverageVariable: {
                description: string;
                type: string;
                default: string;
                nycCommands: string[];
            };
            coverageGlobalScope: {
                description: string;
                type: string;
                default: string;
                nycCommands: string[];
            };
            coverageGlobalScopeFunc: {
                description: string;
                type: string;
                default: boolean;
                nycCommands: string[];
            };
            ignoreClassMethods: {
                description: string;
                type: string;
                items: {
                    type: string;
                };
                default: any[];
                nycCommands: string[];
            };
        };
    };
};
declare function defaultsReducer(defaults: any, [name, string, { default: value }]: any): any;
