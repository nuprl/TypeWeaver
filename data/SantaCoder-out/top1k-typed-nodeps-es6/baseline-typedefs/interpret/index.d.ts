declare const _default: {
    extensions: {
        '.babel.js': {
            module: string;
            register: (hook: IHook, config: IConfig) => void;
        };
        '.babel.jsx': {
            module: string;
            register: (hook: Hook, config: Config) => void;
        };
        '.babel.ts': {
            module: string;
            register: (hook: Hook<any>, config: IConfig) => void;
        }[];
        '.babel.tsx': {
            module: string;
            register: (hook: Hook, config: IConfig) => void;
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
            register: (mod: IModule, config: IConfig) => void;
        };
        '.esbuild.ts': {
            module: string;
            register: (mod: any, config: any) => void;
        };
        '.esbuild.tsx': {
            module: string;
            register: (mod: IModule, config: IConfiguration) => void;
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
            register: (hook: IHook, config: IConfig) => void;
        })[];
        '.litcoffee': string;
        '.mdx': string;
        '.mjs': string;
        '.node': any;
        '.sucrase.js': {
            module: string;
            register: (hook: IHook, config: IConfig) => void;
        };
        '.sucrase.jsx': {
            module: string;
            register: (hook: Hook, config: Config) => void;
        };
        '.sucrase.ts': {
            module: string;
            register: (hook: Hook, config: IConfig) => void;
        };
        '.sucrase.tsx': {
            module: string;
            register: (hook: IHook, config: IConfig) => void;
        };
        '.swc.js': {
            module: string;
            register: (hook: IHook, config: IConfig) => void;
        };
        '.swc.jsx': {
            module: string;
            register: (hook: Hook, config: Config) => void;
        };
        '.swc.ts': {
            module: string;
            register: (hook: IHook, config: IConfig) => void;
        };
        '.swc.tsx': {
            module: string;
            register: (hook: IHook, config: IConfig) => void;
        };
        '.toml': {
            module: string;
            register: (hook: Hook, config: Config) => void;
        };
        '.ts': (string | {
            module: string;
            register: (hook: IHook, config: IConfig) => void;
        })[];
        '.cts': string[];
        '.tsx': (string | {
            module: string;
            register: (hook: Hook, config: Config) => void;
        })[];
        '.yaml': string;
        '.yml': string;
    };
    jsVariants: IExtensionResult;
};
export default _default;
