declare var path: any;
declare function endsInJsx(filename: string): boolean;
declare function endsInTs(filename: string): boolean;
declare function endsInTsx(filename: string): boolean;
declare function endsInBabelJs(filename: string): boolean;
declare function endsInBabelJsx(filename: string): boolean;
declare function endsInBabelTs(filename: string): boolean;
declare function endsInBabelTsx(filename: string): boolean;
declare function endsInEsbuildJs(filename: string): boolean;
declare function endsInEsbuildJsx(filename: string): boolean;
declare function endsInEsbuildTs(filename: string): boolean;
declare function endsInEsbuildTsx(filename: string): boolean;
declare function endsInSucraseJs(filename: string): boolean;
declare function endsInSucraseJsx(filename: string): boolean;
declare function endsInSucraseTs(filename: string): boolean;
declare function endsInSucraseTsx(filename: string): boolean;
declare function endsInSwcJs(filename: string): boolean;
declare function endsInSwcJsx(filename: string): boolean;
declare function endsInSwcTs(filename: string): boolean;
declare function endsInSwcTsx(filename: string): boolean;
declare var cjsStub: any;
declare var mjsStub: any;
declare function isNodeModules(file: string): any;
declare var extensions: {
    '.babel.js': {
        module: string;
        register: (hook: Hook, config: any) => void;
    };
    '.babel.jsx': {
        module: string;
        register: (hook: Hook, config: any) => void;
    };
    '.babel.ts': {
        module: string;
        register: (hook: Hook, config: any) => void;
    }[];
    '.babel.tsx': {
        module: string;
        register: (hook: Hook, config: any) => void;
    };
    '.cjs': any;
    '.coffee': string;
    '.coffee.md': string;
    '.esbuild.js': {
        module: string;
        register: (mod: any, config: any) => void;
    };
    '.esbuild.jsx': {
        module: string;
        register: (mod: any, config: any) => void;
    };
    '.esbuild.ts': {
        module: string;
        register: (mod: any, config: any) => void;
    };
    '.esbuild.tsx': {
        module: string;
        register: (mod: Module, config: RegisterOptions) => void;
    };
    '.esm.js': {
        module: string;
        register: (hook: any) => void;
    };
    '.js': any;
    '.json': any;
    '.json5': string;
    '.jsx': (string | {
        module: string;
        register: (hook: any, config: any) => void;
    })[];
    '.litcoffee': string;
    '.mdx': string;
    '.mjs': any;
    '.node': any;
    '.sucrase.js': {
        module: string;
        register: (hook: Hook, config: SucraseConfig) => void;
    };
    '.sucrase.jsx': {
        module: string;
        register: (hook: Hook, config: SucraseConfig) => void;
    };
    '.sucrase.ts': {
        module: string;
        register: (hook: Hook, config: SucraseConfig) => void;
    };
    '.sucrase.tsx': {
        module: string;
        register: (hook: Hook, config: RegisterOptions) => void;
    };
    '.swc.js': {
        module: string;
        register: (hook: Hook, config: any) => void;
    };
    '.swc.jsx': {
        module: string;
        register: (hook: Hook, config: Config) => void;
    };
    '.swc.ts': {
        module: string;
        register: (hook: Hook, config: Config) => void;
    };
    '.swc.tsx': {
        module: string;
        register: (hook: Hook, config: Config) => void;
    };
    '.toml': {
        module: string;
        register: (hook: Hook, config: any) => void;
    };
    '.ts': (string | {
        module: string;
        register: (hook: any, config: any) => void;
    })[];
    '.cts': string[];
    '.tsx': (string | {
        module: string;
        register: (hook: Hook, config: Config) => void;
    })[];
    '.yaml': string;
    '.yml': string;
};
declare var jsVariantExtensions: string[];
