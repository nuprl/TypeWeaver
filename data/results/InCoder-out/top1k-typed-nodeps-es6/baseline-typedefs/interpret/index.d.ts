declare const _default: {
    extensions: {
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
        '.mjs': string;
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
    jsVariants: any;
};
export default _default;
