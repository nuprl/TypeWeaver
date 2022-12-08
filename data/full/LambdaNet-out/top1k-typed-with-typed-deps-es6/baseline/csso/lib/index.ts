import { version } from './version.js';
import * as syntax from './syntax.js';
import * as utils from './utils.js';

const { parse, generate, compress } = syntax;

function debugOutput(name: string, options: object, startTime: number, data: object): string {
    if (options.debug) {
        console.error(`## ${name} done in %d ms\n`, Date.now() - startTime);
    }

    return data;
}

function createDefaultLogger(level: number): Function {
    let lastDebug: number;

    return function logger(title: string, ast: boolean): void {
        let line: string = title;

        if (ast) {
            line = `[${((Date.now() - lastDebug) / 1000).toFixed(3)}s] ${line}`;
        }

        if (level > 1 && ast) {
            let css: string = generate(ast);

            // when level 2, limit css to 256 symbols
            if (level === 2 && css.length > 256) {
                css = css.substr(0, 256) + '...';
            }

            line += `\n  ${css}\n`;
        }

        console.error(line);
        lastDebug = Date.now();
    };
}

function buildCompressOptions(options: object): TRBL {
    options = { ...options };

    if (typeof options.logger !== 'function' && options.debug) {
        options.logger = createDefaultLogger(options.debug);
    }

    return options;
}

function runHandler(ast: string, options: object, handlers: any[]): void {
    if (!Array.isArray(handlers)) {
        handlers = [handlers];
    }

    handlers.forEach((fn: Function) => fn(ast, options));
}

function minify(context: number, source: string, options: object): object {
    options = options || {};

    const filename: string = options.filename || '<unknown>';
    let result: object;

    // parse
    const ast: object = debugOutput('parsing', options, Date.now(),
        parse(source, {
            context,
            filename,
            positions: Boolean(options.sourceMap)
        })
    );

    // before compress handlers
    if (options.beforeCompress) {
        debugOutput('beforeCompress', options, Date.now(),
            runHandler(ast, options, options.beforeCompress)
        );
    }

    // compress
    const compressResult: object = debugOutput('compress', options, Date.now(),
        compress(ast, buildCompressOptions(options))
    );

    // after compress handlers
    if (options.afterCompress) {
        debugOutput('afterCompress', options, Date.now(),
            runHandler(compressResult, options, options.afterCompress)
        );
    }

    // generate
    if (options.sourceMap) {
        result = debugOutput('generate(sourceMap: true)', options, Date.now(), (() => {
            const tmp: any[] = generate(compressResult.ast, { sourceMap: true });

            tmp.map._file = filename; // since other tools can relay on file in source map transform chain
            tmp.map.setSourceContent(filename, source);

            return tmp;
        })());
    } else {
        result = debugOutput('generate', options, Date.now(), {
            css: generate(compressResult.ast),
            map: null
        });
    }

    return result;
}

function minifyStylesheet(source: string, options: object): string {
    return minify('stylesheet', source, options);
}

function minifyBlock(source: string, options: object): string {
    return minify('declarationList', source, options);
}

export {
    version,
    utils,

    // main methods
    minifyStylesheet as minify,
    minifyBlock,

    // css syntax parser/walkers/generator/etc
    syntax
};
