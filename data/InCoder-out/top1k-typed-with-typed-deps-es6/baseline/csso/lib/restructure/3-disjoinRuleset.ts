import { List, walk } from 'css-tree';

function processRule(node: RuleNode,  item: RuleItem,  list: ListNode) {
    const selectors = node.prelude.children;

    // generate new rule sets:
    // .a, .b { color: red; }
    // ->
    // .a { color: red; }
    // .b { color: red; }

    // while there are more than 1 simple selector split for rulesets
    while (selectors.head !== selectors.tail) {
        const newSelectors = new List();

        newSelectors.insert(selectors.remove(selectors.head));

        list.insert(list.createItem({
            type: 'Rule',
            loc: node.loc,
            prelude: {
                type: 'SelectorList',
                loc: node.prelude.loc,
                children: newSelectors
            },
            block: {
                type: 'Block',
                loc: node.block.loc,
                children: node.block.children.copy()
            },
            pseudoSignature: node.pseudoSignature
        }), item);
    }
}

export default function disjoinRule(ast: AST) {
    walk(ast, {
        visit: 'Rule',
        reverse: true,
        enter: processRule
    });
};