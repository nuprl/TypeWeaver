/// <reference types="node" />
declare var path: any;
declare function endsInJsx(filename: string | undefined): boolean;
declare function endsInTs(filename: string | undefined): boolean;
declare function endsInTsx(filename: string | undefined): boolean;
declare function endsInBabelJs(filename: string | null): boolean;
declare function endsInBabelJsx(filename: string | null): boolean;
declare function endsInBabelTs(filename: string | null): boolean;
declare function endsInBabelTsx(filename: string | null): boolean;
declare function endsInEsbuildJs(filename: string | undefined): boolean;
declare function endsInEsbuildJsx(filename: string | undefined): boolean;
declare function endsInEsbuildTs(filename: string | undefined): boolean;
declare function endsInEsbuildTsx(filename: string | undefined): boolean;
declare function endsInSucraseJs(filename: string | null): boolean;
declare function endsInSucraseJsx(filename: string | null): boolean;
declare function endsInSucraseTs(filename: string | Buffer): any;
declare function endsInSucraseTsx(filename: string | Buffer): any;
declare function endsInSwcJs(filename: string | Buffer): any;
declare function endsInSwcJsx(filename: string | undefined): boolean;
declare function endsInSwcTs(filename: string | undefined): boolean;
declare function endsInSwcTsx(filename: string | Buffer): any;
declare var cjsStub: any;
declare var mjsStub: any;
declare function isNodeModules(file: File): any;
declare var extensions: {
    '.babel.js': {
        module: string;
        register: (hook: Hook, config: HookConfig) => void;
    };
    '.babel.jsx': {
        module: string;
        register: (hook: Hook, config: HookConfig) => void;
    };
    '.babel.ts': {
        module: string;
        register: (hook: Hook, config: any) => void;
    }[];
    '.babel.tsx': {
        module: string;
        register: (hook: Hook, config: HookConfig) => void;
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
        register: (mod: any, config: any) => void;
    };
    '.esm.js': {
        module: string;
        register: (hook: Hook) => void;
    };
    '.js': any;
    '.json': any;
    '.json5': string;
    '.jsx': (string | {
        module: string;
        register: (hook: Hook, config: any) => void;
    })[];
    '.litcoffee': string;
    '.mdx': string;
    '.mjs': any;
    '.node': any;
    '.sucrase.js': {
        module: string;
        register: (hook: Hook, config: HookConfig) => void;
    };
    '.sucrase.jsx': {
        module: string;
        register: (hook: Hook, config: HookConfig) => void;
    };
    '.sucrase.ts': {
        module: string;
        register: (hook: Hook, config: HookConfig) => void;
    };
    '.sucrase.tsx': {
        module: string;
        register: (hook: Hook, config: HookConfig) => void;
    };
    '.swc.js': {
        module: string;
        register: (hook: Hook, config: HookConfig) => void;
    };
    '.swc.jsx': {
        module: string;
        register: (hook: Hook, config: HookConfig) => void;
    };
    '.swc.ts': {
        module: string;
        register: (hook: Hook, config: HookConfig) => void;
    };
    '.swc.tsx': {
        module: string;
        register: (hook: Hook, config: HookConfig) => void;
    };
    '.toml': {
        module: string;
        register: (hook: Hook, config: Config) => void;
    };
    '.ts': (string | {
        module: string;
        register: (hook: Hook, config: any) => void;
    })[];
    '.cts': string[];
    '.tsx': (string | {
        module: string;
        register: (hook: Hook, config: any) => void;
    })[];
    '.yaml': string;
    '.yml': string;
};
declare var jsVariantExtensions: string[];
