export var extensions: {
    '.babel.js': {
        module: string;
        register: (hook: any, config: any) => void;
    };
    '.babel.jsx': {
        module: string;
        register: (hook: any, config: any) => void;
    };
    '.babel.ts': {
        module: string;
        register: (hook: any, config: any) => void;
    }[];
    '.babel.tsx': {
        module: string;
        register: (hook: any, config: any) => void;
    };
    '.cjs': string;
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
    '.mjs': string;
    '.node': any;
    '.sucrase.js': {
        module: string;
        register: (hook: any, config: any) => void;
    };
    '.sucrase.jsx': {
        module: string;
        register: (hook: any, config: any) => void;
    };
    '.sucrase.ts': {
        module: string;
        register: (hook: any, config: any) => void;
    };
    '.sucrase.tsx': {
        module: string;
        register: (hook: any, config: any) => void;
    };
    '.swc.js': {
        module: string;
        register: (hook: any, config: any) => void;
    };
    '.swc.jsx': {
        module: string;
        register: (hook: any, config: any) => void;
    };
    '.swc.ts': {
        module: string;
        register: (hook: any, config: any) => void;
    };
    '.swc.tsx': {
        module: string;
        register: (hook: any, config: any) => void;
    };
    '.toml': {
        module: string;
        register: (hook: any, config: any) => void;
    };
    '.ts': (string | {
        module: string;
        register: (hook: any, config: any) => void;
    })[];
    '.cts': string[];
    '.tsx': (string | {
        module: string;
        register: (hook: any, config: any) => void;
    })[];
    '.yaml': string;
    '.yml': string;
};
export declare const jsVariants: {};
