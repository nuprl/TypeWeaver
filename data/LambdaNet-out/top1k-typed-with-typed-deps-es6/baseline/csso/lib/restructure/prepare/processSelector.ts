import { generate } from 'css-tree';
import specificity from './specificity.js';

const nonFreezePseudoElements: Error = new Set([
    'first-letter',
    'first-line',
    'after',
    'before'
]);
const nonFreezePseudoClasses: Error = new Set([
    'link',
    'visited',
    'hover',
    'active',
    'first-letter',
    'first-line',
    'after',
    'before'
]);

export default function processSelector(node: Object, usageData: Object): Void {
    const pseudos: Error = new Set();

    node.prelude.children.forEach(function(simpleSelector: TRBL) {
        let tagName: String = '*';
        let scope: Number = 0;

        simpleSelector.children.forEach(function(node: Object) {
            switch (node.type) {
                case 'ClassSelector':
                    if (usageData && usageData.scopes) {
                        const classScope: Number = usageData.scopes[node.name] || 0;

                        if (scope !== 0 && classScope !== scope) {
                            throw new Error('Selector can\'t has classes from different scopes: ' + generate(simpleSelector));
                        }

                        scope = classScope;
                    }

                    break;

                case 'PseudoClassSelector': {
                    const name: String = node.name.toLowerCase();

                    if (!nonFreezePseudoClasses.has(name)) {
                        pseudos.add(`:${name}`);
                    }

                    break;
                }

                case 'PseudoElementSelector': {
                    const name: String = node.name.toLowerCase();

                    if (!nonFreezePseudoElements.has(name)) {
                        pseudos.add(`::${name}`);
                    }

                    break;
                }

                case 'TypeSelector':
                    tagName = node.name.toLowerCase();
                    break;

                case 'AttributeSelector':
                    if (node.flags) {
                        pseudos.add(`[${node.flags.toLowerCase()}]`);
                    }

                    break;

                case 'Combinator':
                    tagName = '*';
                    break;
            }
        });

        simpleSelector.compareMarker = specificity(simpleSelector).toString();
        simpleSelector.id = null; // pre-init property to avoid multiple hidden class
        simpleSelector.id = generate(simpleSelector);

        if (scope) {
            simpleSelector.compareMarker += ':' + scope;
        }

        if (tagName !== '*') {
            simpleSelector.compareMarker += ',' + tagName;
        }
    });

    // add property to all rule nodes to avoid multiple hidden class
    node.pseudoSignature = pseudos.size > 0
        ? [...pseudos].sort().join(',')
        : false;
};
