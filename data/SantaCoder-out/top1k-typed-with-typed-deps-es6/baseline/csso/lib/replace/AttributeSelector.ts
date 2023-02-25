// Can unquote attribute detection
// Adopted implementation of Mathias Bynens
// https://github.com/mathiasbynens/mothereff.in/blob/master/unquoted-attributes/eff.js
const blockUnquoteRx = /^(-?\d|--)|[\u0000-\u002c\u002e\u002f\u003A-\u0040\u005B-\u005E\u0060\u007B-\u009f]/;

function canUnquote(value: string) {
    if (value === '' || value === '-') {
        return false;
    }

    return !blockUnquoteRx.test(value);
}

export default function(node: AST.Attribute) {
    const attrValue = node.value;

    if (!attrValue || attrValue.type !== 'String') {
        return;
    }

    if (canUnquote(attrValue.value)) {
        node.value = {
            type: 'Identifier',
            loc: attrValue.loc,
            name: attrValue.value
        };
    }
};