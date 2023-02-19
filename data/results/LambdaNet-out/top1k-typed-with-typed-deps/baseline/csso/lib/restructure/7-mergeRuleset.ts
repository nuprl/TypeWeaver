import { walk } from 'css-tree';
import { unsafeToSkipNode, isEqualDeclarations} from './utils.js';

/*
    At this step all rules has single simple selector. We try to join by equal
    declaration blocks to first rule, e.g.

    .a { color: red }
    b { ... }
    .b { color: red }
    ->
    .a, .b { color: red }
    b { ... }
*/

function processRule(node: object, item: object, list: Map): void {
    const selectors: any[] = node.prelude.children;
    const declarations: object = node.block.children;
    const nodeCompareMarker: number = selectors.first.compareMarker;
    const skippedCompareMarkers: object = {};

    list.nextUntil(item.next, function(next: object, nextItem: object) {
        // skip non-ruleset node if safe
        if (next.type !== 'Rule') {
            return unsafeToSkipNode.call(selectors, next);
        }

        if (node.pseudoSignature !== next.pseudoSignature) {
            return true;
        }

        const nextFirstSelector: object = next.prelude.children.head;
        const nextDeclarations: any[] = next.block.children;
        const nextCompareMarker: number = nextFirstSelector.data.compareMarker;

        // if next ruleset has same marked as one of skipped then stop joining
        if (nextCompareMarker in skippedCompareMarkers) {
            return true;
        }

        // try to join by selectors
        if (selectors.head === selectors.tail) {
            if (selectors.first.id === nextFirstSelector.data.id) {
                declarations.appendList(nextDeclarations);
                list.remove(nextItem);
                return;
            }
        }

        // try to join by properties
        if (isEqualDeclarations(declarations, nextDeclarations)) {
            const nextStr: string = nextFirstSelector.data.id;

            selectors.some((data: object, item: object) => {
                const curStr: string = data.id;

                if (nextStr < curStr) {
                    selectors.insert(nextFirstSelector, item);
                    return true;
                }

                if (!item.next) {
                    selectors.insert(nextFirstSelector);
                    return true;
                }
            });

            list.remove(nextItem);
            return;
        }

        // go to next ruleset if current one can be skipped (has no equal specificity nor element selector)
        if (nextCompareMarker === nodeCompareMarker) {
            return true;
        }

        skippedCompareMarkers[nextCompareMarker] = true;
    });
}

export default function mergeRule(ast: any[]): void {
    walk(ast, {
        visit: 'Rule',
        enter: processRule
    });
};
