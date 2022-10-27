import { List, clone, walk } from 'css-tree';
import { buildIndex } from './usage.js';
import clean from './clean/index.js';
import replace from './replace/index.js';
import restructure from './restructure/index.js';

function readChunk(input: HTMLInputElement, specialComments: Boolean): Object {
    const children: Array = new List();
    let nonSpaceTokenInBuffer: Boolean = false;
    let protectedComment: Function;

    input.nextUntil(input.head, (node: Object, item: String, list: Map) => {
        if (node.type === 'Comment') {
            if (!specialComments || node.value.charAt(0) !== '!') {
                list.remove(item);
                return;
            }

            if (nonSpaceTokenInBuffer || protectedComment) {
                return true;
            }

            list.remove(item);
            protectedComment = node;

            return;
        }

        if (node.type !== 'WhiteSpace') {
            nonSpaceTokenInBuffer = true;
        }

        children.insert(list.remove(item));
    });

    return {
        comment: protectedComment,
        stylesheet: {
            type: 'StyleSheet',
            loc: null,
            children
        }
    };
}

function compressChunk(ast: Object, firstAtrulesAllowed: Function, num: String, options: Object): TRBL {
    options.logger(`Compress block #${num}`, null, true);

    let seed: Number = 1;

    if (ast.type === 'StyleSheet') {
        ast.firstAtrulesAllowed = firstAtrulesAllowed;
        ast.id = seed++;
    }

    walk(ast, {
        visit: 'Atrule',
        enter(node) {
            if (node.block !== null) {
                node.block.id = seed++;
            }
        }
    });
    options.logger('init', ast);

    // remove redundant
    clean(ast, options);
    options.logger('clean', ast);

    // replace nodes for shortened forms
    replace(ast, options);
    options.logger('replace', ast);

    // structure optimisations
    if (options.restructuring) {
        restructure(ast, options);
    }

    return ast;
}

function getCommentsOption(options: Object): Boolean {
    let comments: Number = 'comments' in options ? options.comments : 'exclamation';

    if (typeof comments === 'boolean') {
        comments = comments ? 'exclamation' : false;
    } else if (comments !== 'exclamation' && comments !== 'first-exclamation') {
        comments = false;
    }

    return comments;
}

function getRestructureOption(options: Object): Boolean {
    if ('restructure' in options) {
        return options.restructure;
    }

    return 'restructuring' in options ? options.restructuring : true;
}

function wrapBlock(block: Object): TRBL {
    return new List().appendData({
        type: 'Rule',
        loc: null,
        prelude: {
            type: 'SelectorList',
            loc: null,
            children: new List().appendData({
                type: 'Selector',
                loc: null,
                children: new List().appendData({
                    type: 'TypeSelector',
                    loc: null,
                    name: 'x'
                })
            })
        },
        block
    });
}

export default function compress(ast: TRBL, options: Object): Object {
    ast = ast || { type: 'StyleSheet', loc: null, children: new List() };
    options = options || {};

    const compressOptions: Object = {
        logger: typeof options.logger === 'function' ? options.logger : function() {},
        restructuring: getRestructureOption(options),
        forceMediaMerge: Boolean(options.forceMediaMerge),
        usage: options.usage ? buildIndex(options.usage) : false
    };
    const output: TRBL = new List();
    let specialComments: Boolean = getCommentsOption(options);
    let firstAtrulesAllowed: Boolean = true;
    let input: HTMLInputElement;
    let chunk: TRBL;
    let chunkNum: Number = 1;
    let chunkChildren: Object;

    if (options.clone) {
        ast = clone(ast);
    }

    if (ast.type === 'StyleSheet') {
        input = ast.children;
        ast.children = output;
    } else {
        input = wrapBlock(ast);
    }

    do {
        chunk = readChunk(input, Boolean(specialComments));
        compressChunk(chunk.stylesheet, firstAtrulesAllowed, chunkNum++, compressOptions);
        chunkChildren = chunk.stylesheet.children;

        if (chunk.comment) {
            // add \n before comment if there is another content in output
            if (!output.isEmpty) {
                output.insert(List.createItem({
                    type: 'Raw',
                    value: '\n'
                }));
            }

            output.insert(List.createItem(chunk.comment));

            // add \n after comment if chunk is not empty
            if (!chunkChildren.isEmpty) {
                output.insert(List.createItem({
                    type: 'Raw',
                    value: '\n'
                }));
            }
        }

        if (firstAtrulesAllowed && !chunkChildren.isEmpty) {
            const lastRule: Object = chunkChildren.last;

            if (lastRule.type !== 'Atrule' ||
               (lastRule.name !== 'import' && lastRule.name !== 'charset')) {
                firstAtrulesAllowed = false;
            }
        }

        if (specialComments !== 'exclamation') {
            specialComments = false;
        }

        output.appendList(chunkChildren);
    } while (!input.isEmpty);

    return {
        ast
    };
};
