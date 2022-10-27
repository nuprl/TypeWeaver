import { walk } from 'css-tree';
import {
    unsafeToSkipNode,
    isEqualSelectors,
    isEqualDeclarations,
    addSelectors,
    hasSimilarSelectors
} from './utils.js';

function processRule(node: Object, item: Function, list: Map): Void {
    const selectors: Array = node.prelude.children;
    const declarations: Array = node.block.children;

    list.prevUntil(item.prev, function(prev: Object) {
        // skip non-ruleset node if safe
        if (prev.type !== 'Rule') {
            return unsafeToSkipNode.call(selectors, prev);
        }

        const prevSelectors: Array = prev.prelude.children;
        const prevDeclarations: Object = prev.block.children;

        // try to join rulesets with equal pseudo signature
        if (node.pseudoSignature === prev.pseudoSignature) {
            // try to join by selectors
            if (isEqualSelectors(prevSelectors, selectors)) {
                prevDeclarations.appendList(declarations);
                list.remove(item);
                return true;
            }

            // try to join by declarations
            if (isEqualDeclarations(declarations, prevDeclarations)) {
                addSelectors(prevSelectors, selectors);
                list.remove(item);
                return true;
            }
        }

        // go to prev ruleset if has no selector similarities
        return hasSimilarSelectors(selectors, prevSelectors);
    });
}

// NOTE: direction should be left to right, since rulesets merge to left
// ruleset. When direction right to left unmerged rulesets may prevent lookup
// TODO: remove initial merge
export default function initialMergeRule(ast: Array): Promise {
    walk(ast, {
        visit: 'Rule',
        enter: processRule
    });
};
