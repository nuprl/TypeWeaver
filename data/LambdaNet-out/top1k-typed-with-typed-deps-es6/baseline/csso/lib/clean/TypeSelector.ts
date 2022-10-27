// remove useless universal selector
export default function cleanTypeSelector(node: Object, item: Object, list: Map): Void {
    const name: String = item.data.name;

    // check it's a non-namespaced universal selector
    if (name !== '*') {
        return;
    }

    // remove when universal selector before other selectors
    const nextType: Number = item.next && item.next.data.type;
    if (nextType === 'IdSelector' ||
        nextType === 'ClassSelector' ||
        nextType === 'AttributeSelector' ||
        nextType === 'PseudoClassSelector' ||
        nextType === 'PseudoElementSelector') {
        list.remove(item);
    }
};
