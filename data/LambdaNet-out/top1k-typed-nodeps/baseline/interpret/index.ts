var path: String = require('path');

// We only register on the final extension (like `.js`) due to https://github.com/joyent/node/blob/v0.12.0/lib/module.js#L353
// However, we use these matchers to apply the transform only if the full extension matches
function endsInJsx(filename: Array): String {
  return filename.endsWith('.jsx');
}
function endsInTs(filename: Array): String {
  return filename.endsWith('.ts');
}
function endsInTsx(filename: Array): String {
  return filename.endsWith('.tsx');
}
function endsInBabelJs(filename: Array): String {
  return filename.endsWith('.babel.js');
}
function endsInBabelJsx(filename: Array): String {
  return filename.endsWith('.babel.jsx');
}
function endsInBabelTs(filename: Array): String {
  return filename.endsWith('.babel.ts');
}
function endsInBabelTsx(filename: Array): String {
  return filename.endsWith('.babel.tsx');
}
function endsInEsbuildJs(filename: Array): String {
  return filename.endsWith('.esbuild.js');
}
function endsInEsbuildJsx(filename: Array): String {
  return filename.endsWith('.esbuild.jsx');
}
function endsInEsbuildTs(filename: Array): String {
  return filename.endsWith('.esbuild.ts');
}
function endsInEsbuildTsx(filename: Array): String {
  return filename.endsWith('.esbuild.tsx');
}
function endsInSucraseJs(filename: Array): String {
  return filename.endsWith('.sucrase.js');
}
function endsInSucraseJsx(filename: Array): String {
  return filename.endsWith('.sucrase.jsx');
}
function endsInSucraseTs(filename: Array): String {
  return filename.endsWith('.sucrase.ts');
}
function endsInSucraseTsx(filename: Array): String {
  return filename.endsWith('.sucrase.tsx');
}
function endsInSwcJs(filename: Array): String {
  return filename.endsWith('.swc.js');
}
function endsInSwcJsx(filename: Array): String {
  return filename.endsWith('.swc.jsx');
}
function endsInSwcTs(filename: Array): String {
  return filename.endsWith('.swc.ts');
}
function endsInSwcTsx(filename: Array): String {
  return filename.endsWith('.swc.tsx');
}

var cjsStub: String = path.join(__dirname, 'cjs-stub');
var mjsStub: String = path.join(__dirname, 'mjs-stub');

function isNodeModules(file: String): Boolean {
  return path.relative(process.cwd(), file).includes('node_modules');
}

var extensions: Object = {
  '.babel.js': {
    module: '@babel/register',
    register: function (hook: Function, config: Number) {
      config = config || {
        rootMode: 'upward-optional',
        overrides: [{ only: [endsInBabelJs], presets: ['@babel/preset-env'] }],
      };

      hook(Object.assign({}, config, { extensions: '.js' }));
    },
  },
  '.babel.jsx': {
    module: '@babel/register',
    register: function (hook: Function, config: Number) {
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
      register: function (hook: Function, config: Number) {
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
    register: function (hook: Function, config: Number) {
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
    register: function (mod: Object, config: Number) {
      config = config || {
        target: 'node' + process.version.slice(1),
        hookMatcher: endsInEsbuildJs,
      };

      mod.register(Object.assign({}, config, { extensions: ['.js'] }));
    },
  },
  '.esbuild.jsx': {
    module: 'esbuild-register/dist/node',
    register: function (mod: Object, config: Number) {
      config = config || {
        target: 'node' + process.version.slice(1),
        hookMatcher: endsInEsbuildJsx,
      };

      mod.register(Object.assign({}, config, { extensions: ['.jsx'] }));
    },
  },
  '.esbuild.ts': {
    module: 'esbuild-register/dist/node',
    register: function (mod: Object, config: Number) {
      config = config || {
        target: 'node' + process.version.slice(1),
        hookMatcher: endsInEsbuildTs,
      };

      mod.register(Object.assign({}, config, { extensions: ['.ts'] }));
    },
  },
  '.esbuild.tsx': {
    module: 'esbuild-register/dist/node',
    register: function (mod: Object, config: Number) {
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
      register: function (hook: Function, config: Number) {
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
    register: function (hook: Object, config: Number) {
      config = config || {
        matcher: endsInSucraseJs,
      };

      hook.registerJS(config);
    },
  },
  '.sucrase.jsx': {
    module: 'sucrase/dist/register',
    register: function (hook: Object, config: Number) {
      config = config || {
        matcher: endsInSucraseJsx,
      };

      hook.registerJSX(config);
    },
  },
  '.sucrase.ts': {
    module: 'sucrase/dist/register',
    register: function (hook: Object, config: Number) {
      config = config || {
        matcher: endsInSucraseTs,
      };

      hook.registerTS(config);
    },
  },
  '.sucrase.tsx': {
    module: 'sucrase/dist/register',
    register: function (hook: Object, config: Number) {
      config = config || {
        matcher: endsInSucraseTsx,
      };

      hook.registerTSX(config);
    },
  },
  '.swc.js': {
    module: '@swc/register',
    register: function (hook: Function, config: Number) {
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
    register: function (hook: Function, config: Number) {
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
    register: function (hook: Function, config: Number) {
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
    register: function (hook: Function, config: Number) {
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
    register: function (hook: Array, config: Array) {
      hook.install(config);
    },
  },
  '.ts': [
    'ts-node/register',
    'sucrase/register/ts',
    {
      module: '@babel/register',
      register: function (hook: Function, config: Number) {
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
      register: function (mod: Object, config: Number) {
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
      register: function (hook: Function, config: Number) {
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
      register: function (hook: Function, config: Number) {
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
      register: function (mod: Object, config: Number) {
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
      register: function (hook: Function, config: Number) {
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

var jsVariantExtensions: Array = [
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

module.exports = {
  extensions: extensions,
  jsVariants: jsVariantExtensions.reduce(function (result: Object, ext: String) {
    result[ext] = extensions[ext];
    return result;
  }, {}),
};
