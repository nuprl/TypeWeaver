import path from 'path';

// We only register on the final extension (like `.js`) due to https://github.com/joyent/node/blob/v0.12.0/lib/module.js#L353
// However, we use these matchers to apply the transform only if the full extension matches
function endsInJsx(filename: any[]): string {
  return filename.endsWith('.jsx');
}
function endsInTs(filename: any[]): string {
  return filename.endsWith('.ts');
}
function endsInTsx(filename: any[]): string {
  return filename.endsWith('.tsx');
}
function endsInBabelJs(filename: any[]): string {
  return filename.endsWith('.babel.js');
}
function endsInBabelJsx(filename: any[]): string {
  return filename.endsWith('.babel.jsx');
}
function endsInBabelTs(filename: any[]): string {
  return filename.endsWith('.babel.ts');
}
function endsInBabelTsx(filename: any[]): string {
  return filename.endsWith('.babel.tsx');
}
function endsInEsbuildJs(filename: any[]): string {
  return filename.endsWith('.esbuild.js');
}
function endsInEsbuildJsx(filename: any[]): string {
  return filename.endsWith('.esbuild.jsx');
}
function endsInEsbuildTs(filename: any[]): string {
  return filename.endsWith('.esbuild.ts');
}
function endsInEsbuildTsx(filename: any[]): string {
  return filename.endsWith('.esbuild.tsx');
}
function endsInSucraseJs(filename: any[]): string {
  return filename.endsWith('.sucrase.js');
}
function endsInSucraseJsx(filename: any[]): string {
  return filename.endsWith('.sucrase.jsx');
}
function endsInSucraseTs(filename: any[]): string {
  return filename.endsWith('.sucrase.ts');
}
function endsInSucraseTsx(filename: any[]): string {
  return filename.endsWith('.sucrase.tsx');
}
function endsInSwcJs(filename: any[]): string {
  return filename.endsWith('.swc.js');
}
function endsInSwcJsx(filename: any[]): string {
  return filename.endsWith('.swc.jsx');
}
function endsInSwcTs(filename: any[]): string {
  return filename.endsWith('.swc.ts');
}
function endsInSwcTsx(filename: any[]): string {
  return filename.endsWith('.swc.tsx');
}

var cjsStub: string = path.join(__dirname, 'cjs-stub');
var mjsStub: string = path.join(__dirname, 'mjs-stub');

function isNodeModules(file: string): boolean {
  return path.relative(process.cwd(), file).includes('node_modules');
}

var extensions: object = {
  '.babel.js': {
    module: '@babel/register',
    register: function (hook: Function, config: number) {
      config = config || {
        rootMode: 'upward-optional',
        overrides: [{ only: [endsInBabelJs], presets: ['@babel/preset-env'] }],
      };

      hook(Object.assign({}, config, { extensions: '.js' }));
    },
  },
  '.babel.jsx': {
    module: '@babel/register',
    register: function (hook: Function, config: number) {
      config = config || {
        rootMode: 'upward-optional',
        overrides: [
          {
            only: [endsInBabelJsx],
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        ],
      };

      hook(Object.assign({}, config, { extensions: '.jsx' }));
    },
  },
  '.babel.ts': [
    {
      module: '@babel/register',
      register: function (hook: Function, config: number) {
        config = config || {
          rootMode: 'upward-optional',
          overrides: [
            {
              only: [endsInBabelTs],
              presets: ['@babel/preset-env', '@babel/preset-typescript'],
            },
          ],
        };

        hook(Object.assign({}, config, { extensions: '.ts' }));
      },
    },
  ],
  '.babel.tsx': {
    module: '@babel/register',
    register: function (hook: Function, config: number) {
      config = config || {
        rootMode: 'upward-optional',
        overrides: [
          {
            only: [endsInBabelTsx],
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              [
                '@babel/preset-typescript',
                {
                  isTSX: true,
                  allExtensions: true,
                },
              ],
            ],
          },
        ],
      };

      hook(Object.assign({}, config, { extensions: '.tsx' }));
    },
  },
  '.cjs': cjsStub,
  '.coffee': 'coffeescript/register',
  '.coffee.md': 'coffeescript/register',
  '.esbuild.js': {
    module: 'esbuild-register/dist/node',
    register: function (mod: object, config: number) {
      config = config || {
        target: 'node' + process.version.slice(1),
        hookMatcher: endsInEsbuildJs,
      };

      mod.register(Object.assign({}, config, { extensions: ['.js'] }));
    },
  },
  '.esbuild.jsx': {
    module: 'esbuild-register/dist/node',
    register: function (mod: object, config: number) {
      config = config || {
        target: 'node' + process.version.slice(1),
        hookMatcher: endsInEsbuildJsx,
      };

      mod.register(Object.assign({}, config, { extensions: ['.jsx'] }));
    },
  },
  '.esbuild.ts': {
    module: 'esbuild-register/dist/node',
    register: function (mod: object, config: number) {
      config = config || {
        target: 'node' + process.version.slice(1),
        hookMatcher: endsInEsbuildTs,
      };

      mod.register(Object.assign({}, config, { extensions: ['.ts'] }));
    },
  },
  '.esbuild.tsx': {
    module: 'esbuild-register/dist/node',
    register: function (mod: object, config: number) {
      config = config || {
        target: 'node' + process.version.slice(1),
        hookMatcher: endsInEsbuildTsx,
      };

      mod.register(Object.assign({}, config, { extensions: ['.tsx'] }));
    },
  },
  '.esm.js': {
    module: 'esm',
    register: function (hook: Function) {
      // register on .js extension due to https://github.com/joyent/node/blob/v0.12.0/lib/module.js#L353
      // which only captures the final extension (.esm.js -> .js)
      var esmLoader: Function = hook(module);
      require.extensions['.js'] = esmLoader('module')._extensions['.js'];
    },
  },
  '.js': null,
  '.json': null,
  '.json5': 'json5/lib/register',
  '.jsx': [
    {
      module: '@babel/register',
      register: function (hook: Function, config: number) {
        config = config || {
          rootMode: 'upward-optional',
          overrides: [
            {
              only: [endsInJsx],
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          ],
        };

        hook(Object.assign({}, config, { extensions: '.jsx' }));
      },
    },
    'sucrase/register/jsx',
  ],
  '.litcoffee': 'coffeescript/register',
  // The mdx loader hooks both `.md` and `.mdx` when it is imported
  // but we only install the hook if `.mdx` is the first file
  '.mdx': '@mdx-js/register',
  '.mjs': mjsStub,
  '.node': null,
  '.sucrase.js': {
    module: 'sucrase/dist/register',
    register: function (hook: object, config: number) {
      config = config || {
        matcher: endsInSucraseJs,
      };

      hook.registerJS(config);
    },
  },
  '.sucrase.jsx': {
    module: 'sucrase/dist/register',
    register: function (hook: object, config: number) {
      config = config || {
        matcher: endsInSucraseJsx,
      };

      hook.registerJSX(config);
    },
  },
  '.sucrase.ts': {
    module: 'sucrase/dist/register',
    register: function (hook: object, config: number) {
      config = config || {
        matcher: endsInSucraseTs,
      };

      hook.registerTS(config);
    },
  },
  '.sucrase.tsx': {
    module: 'sucrase/dist/register',
    register: function (hook: object, config: number) {
      config = config || {
        matcher: endsInSucraseTsx,
      };

      hook.registerTSX(config);
    },
  },
  '.swc.js': {
    module: '@swc/register',
    register: function (hook: Function, config: number) {
      config = config || {
        only: [endsInSwcJs],
        ignore: [isNodeModules],
        jsc: {
          parser: {
            syntax: 'ecmascript',
          },
        },
        module: {
          type: 'commonjs',
        },
      };

      hook(
        Object.assign({}, config, {
          extensions: '.js',
        })
      );
    },
  },
  '.swc.jsx': {
    module: '@swc/register',
    register: function (hook: Function, config: number) {
      config = config || {
        only: [endsInSwcJsx],
        ignore: [isNodeModules],
        jsc: {
          parser: {
            syntax: 'ecmascript',
            jsx: true,
          },
        },
        module: {
          type: 'commonjs',
        },
      };

      hook(
        Object.assign({}, config, {
          extensions: '.jsx',
        })
      );
    },
  },
  '.swc.ts': {
    module: '@swc/register',
    register: function (hook: Function, config: number) {
      config = config || {
        only: [endsInSwcTs],
        ignore: [isNodeModules],
        jsc: {
          parser: {
            syntax: 'typescript',
          },
        },
        module: {
          type: 'commonjs',
        },
      };

      hook(
        Object.assign({}, config, {
          extensions: '.ts',
        })
      );
    },
  },
  '.swc.tsx': {
    module: '@swc/register',
    register: function (hook: Function, config: number) {
      config = config || {
        only: [endsInSwcTsx],
        ignore: [isNodeModules],
        jsc: {
          parser: {
            syntax: 'typescript',
            tsx: true,
          },
        },
        module: {
          type: 'commonjs',
        },
      };

      hook(
        Object.assign({}, config, {
          extensions: '.tsx',
        })
      );
    },
  },
  '.toml': {
    module: 'toml-require',
    register: function (hook: any[], config: any[]) {
      hook.install(config);
    },
  },
  '.ts': [
    'ts-node/register',
    'sucrase/register/ts',
    {
      module: '@babel/register',
      register: function (hook: Function, config: number) {
        config = config || {
          rootMode: 'upward-optional',
          overrides: [
            {
              only: [endsInTs],
              presets: ['@babel/preset-env', '@babel/preset-typescript'],
            },
          ],
        };

        hook(
          Object.assign({}, config, {
            extensions: '.ts',
          })
        );
      },
    },
    {
      module: 'esbuild-register/dist/node',
      register: function (mod: object, config: number) {
        config = config || {
          target: 'node' + process.version.slice(1),
          hookMatcher: endsInTs,
        };

        mod.register(
          Object.assign({}, config, {
            extensions: ['.ts'],
          })
        );
      },
    },
    {
      module: '@swc/register',
      register: function (hook: Function, config: number) {
        config = config || {
          only: [endsInTs],
          ignore: [isNodeModules],
          jsc: {
            parser: {
              syntax: 'typescript',
            },
          },
          module: {
            type: 'commonjs',
          },
        };

        hook(
          Object.assign({}, config, {
            extensions: '.ts',
          })
        );
      },
    },
  ],
  '.cts': ['ts-node/register'],
  '.tsx': [
    'ts-node/register',
    'sucrase/register/tsx',
    {
      module: '@babel/register',
      register: function (hook: Function, config: number) {
        config = config || {
          rootMode: 'upward-optional',
          overrides: [
            {
              only: [endsInTsx],
              presets: [
                '@babel/preset-env',
                '@babel/preset-react',
                [
                  '@babel/preset-typescript',
                  {
                    isTSX: true,
                    allExtensions: true,
                  },
                ],
              ],
            },
          ],
        };

        hook(
          Object.assign({}, config, {
            extensions: '.tsx',
          })
        );
      },
    },
    {
      module: 'esbuild-register/dist/node',
      register: function (mod: object, config: number) {
        config = config || {
          target: 'node' + process.version.slice(1),
          hookMatcher: endsInTsx,
        };

        mod.register(
          Object.assign({}, config, {
            extensions: ['.tsx'],
          })
        );
      },
    },
    {
      module: '@swc/register',
      register: function (hook: Function, config: number) {
        config = config || {
          only: [endsInTsx],
          ignore: [isNodeModules],
          jsc: {
            parser: {
              syntax: 'typescript',
              tsx: true,
            },
          },
          module: {
            type: 'commonjs',
          },
        };

        hook(
          Object.assign({}, config, {
            extensions: '.tsx',
          })
        );
      },
    },
  ],
  '.yaml': 'yaml-hook/register',
  '.yml': 'yaml-hook/register',
};

var jsVariantExtensions: any[] = [
  '.js',
  '.babel.js',
  '.babel.jsx',
  '.babel.ts',
  '.babel.tsx',
  '.esbuild.js',
  '.esbuild.jsx',
  '.esbuild.ts',
  '.esbuild.tsx',
  '.cjs',
  '.coffee',
  '.coffee.md',
  '.esm.js',
  '.jsx',
  '.litcoffee',
  '.mdx',
  '.mjs',
  '.sucrase.js',
  '.sucrase.jsx',
  '.sucrase.ts',
  '.sucrase.tsx',
  '.swc.js',
  '.swc.jsx',
  '.swc.ts',
  '.swc.tsx',
  '.ts',
  '.tsx',
];

export default {
  extensions: extensions,
  jsVariants: jsVariantExtensions.reduce(function (result: object, ext: string) {
    result[ext] = extensions[ext];
    return result;
  }, {}),
};
