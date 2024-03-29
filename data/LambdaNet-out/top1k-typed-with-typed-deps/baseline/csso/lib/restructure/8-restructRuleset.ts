import { List, walk } from 'css-tree';
import {
    unsafeToSkipNode,
    isEqualSelectors,
    compareDeclarations,
    addSelectors
} from './utils.js';

function calcSelectorLength(list: any[]): number {
    return list.reduce((res: number, data: object) => res + data.id.length + 1, 0) - 1;
}

function calcDeclarationsLength(tokens: any[]): number {
    let length: number = 0;

    for (const token of tokens) {
        length += token.length;
    }

    return (
        length +          // declarations
        tokens.length - 1 // delimeters
    );
}

function processRule(node: object, item: object, list: HTMLElement): void {
    const avoidRulesMerge: boolean = this.block !== null ? this.block.avoidRulesMerge : false;
    const selectors: any[] = node.prelude.children;
    const block: object = node.block;
    const disallowDownMarkers: object = Object.create(null);
    let allowMergeUp: boolean = true;
    let allowMergeDown: boolean = true;

    list.prevUntil(item.prev, function(prev: object, prevItem: number) {
        const prevBlock: object = prev.block;
        const prevType: string = prev.type;

        if (prevType !== 'Rule') {
            const unsafe: boolean = unsafeToSkipNode.call(selectors, prev);

            if (!unsafe && prevType === 'Atrule' && prevBlock) {
                walk(prevBlock, {
                    visit: 'Rule',
                    enter(node) {
                        node.prelude.children.forEach((data) => {
                            disallowDownMarkers[data.compareMarker] = true;
                        });
                    }
                });
            }

            return unsafe;
        }

        if (node.pseudoSignature !== prev.pseudoSignature) {
            return true;
        }

        const prevSelectors: any[] = prev.prelude.children;

        allowMergeDown = !prevSelectors.some((selector: Function) =>
            selector.compareMarker in disallowDownMarkers
        );

        // try prev ruleset if simpleselectors has no equal specifity and element selector
        if (!allowMergeDown && !allowMergeUp) {
            return true;
        }

        // try to join by selectors
        if (allowMergeUp && isEqualSelectors(prevSelectors, selectors)) {
            prevBlock.children.appendList(block.children);
            list.remove(item);

            return true;
        }

        // try to join by properties
        const diff: TRBL = compareDeclarations(block.children, prevBlock.children);

        // console.log(diff.eq, diff.ne1, diff.ne2);

        if (diff.eq.length) {
            if (!diff.ne1.length && !diff.ne2.length) {
                // equal blocks
                if (allowMergeDown) {
                    addSelectors(selectors, prevSelectors);
                    list.remove(prevItem);
                }

                return true;
            } else if (!avoidRulesMerge) { /* probably we don't need to prevent those merges for @keyframes
                                              TODO: need to be checked */

                if (diff.ne1.length && !diff.ne2.length) {
                    // prevBlock is subset block
                    const selectorLength: string = calcSelectorLength(selectors);
                    const blockLength: string = calcDeclarationsLength(diff.eq); // declarations length

                    if (allowMergeUp && selectorLength < blockLength) {
                        addSelectors(prevSelectors, selectors);
                        block.children.fromArray(diff.ne1);
                    }
                } else if (!diff.ne1.length && diff.ne2.length) {
                    // node is subset of prevBlock
                    const selectorLength: string = calcSelectorLength(prevSelectors);
                    const blockLength: string = calcDeclarationsLength(diff.eq); // declarations length

                    if (allowMergeDown && selectorLength < blockLength) {
                        addSelectors(selectors, prevSelectors);
                        prevBlock.children.fromArray(diff.ne2);
                    }
                } else {
                    // diff.ne1.length && diff.ne2.length
                    // extract equal block
                    const newSelector: object = {
                        type: 'SelectorList',
                        loc: null,
                        children: addSelectors(prevSelectors.copy(), selectors)
                    };
                    const newBlockLength: number = calcSelectorLength(newSelector.children) + 2; // selectors length + curly braces length
                    const blockLength: number = calcDeclarationsLength(diff.eq); // declarations length

                    // create new ruleset if declarations length greater than
                    // ruleset description overhead
                    if (blockLength >= newBlockLength) {
                        const newItem: string = list.createItem({
                            type: 'Rule',
                            loc: null,
                            prelude: newSelector,
                            block: {
                                type: 'Block',
                                loc: null,
                                children: new List().fromArray(diff.eq)
                            },
                            pseudoSignature: node.pseudoSignature
                        });

                        block.children.fromArray(diff.ne1);
                        prevBlock.children.fromArray(diff.ne2overrided);

                        if (allowMergeUp) {
                            list.insert(newItem, prevItem);
                        } else {
                            list.insert(newItem, item);
                        }

                        return true;
                    }
                }
            }
        }

        if (allowMergeUp) {
            // TODO: disallow up merge only if any property interception only (i.e. diff.ne2overrided.length > 0);
            // await property families to find property interception correctly
            allowMergeUp = !prevSelectors.some((prevSelector: object) =>
                selectors.some((selector: Function) =>
                    selector.compareMarker === prevSelector.compareMarker
                )
            );
        }

        prevSelectors.forEach((data: object) => {
            disallowDownMarkers[data.compareMarker] = true;
        });
    });
}

export default function restructRule(ast: Function): void {
    walk(ast, {
        visit: 'Rule',
        reverse: true,
        enter: processRule
    });
};
