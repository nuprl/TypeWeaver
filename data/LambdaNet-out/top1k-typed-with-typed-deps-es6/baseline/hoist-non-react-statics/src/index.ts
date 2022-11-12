/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
import { ForwardRef, Memo, isMemo } from 'react-is';

const REACT_STATICS: Object = {
    childContextTypes: true,
    contextType: true,
    contextTypes: true,
    defaultProps: true,
    displayName: true,
    getDefaultProps: true,
    getDerivedStateFromError: true,
    getDerivedStateFromProps: true,
    mixins: true,
    propTypes: true,
    type: true
};

const KNOWN_STATICS: Object = {
    name: true,
    length: true,
    prototype: true,
    caller: true,
    callee: true,
    arguments: true,
    arity: true
};

const FORWARD_REF_STATICS: Object = {
    '$$typeof': true,
    render: true,
    defaultProps: true,
    displayName: true,
    propTypes: true
};

const MEMO_STATICS: Object = {
    '$$typeof': true,
    compare: true,
    defaultProps: true,
    displayName: true,
    propTypes: true,
    type: true,
}

const TYPE_STATICS: Object = {};
TYPE_STATICS[ForwardRef] = FORWARD_REF_STATICS;
TYPE_STATICS[Memo] = MEMO_STATICS;

function getStatics(component: Object): Object {
    // React v16.11 and below
    if (isMemo(component)) {
        return MEMO_STATICS;
    }

    // React v16.12 and above
    return TYPE_STATICS[component['$$typeof']] || REACT_STATICS;
}

const defineProperty: Function = Object.defineProperty;
const getOwnPropertyNames: Function = Object.getOwnPropertyNames;
const getOwnPropertySymbols: Function = Object.getOwnPropertySymbols;
const getOwnPropertyDescriptor: Function = Object.getOwnPropertyDescriptor;
const getPrototypeOf: Function = Object.getPrototypeOf;
const objectPrototype: Object = Object.prototype;

export default function hoistNonReactStatics(targetComponent: Object, sourceComponent: Object, excludelist: Object): Array {
    if (typeof sourceComponent !== 'string') { // don't hoist over string (html) components

        if (objectPrototype) {
            const inheritedComponent: Boolean = getPrototypeOf(sourceComponent);
            if (inheritedComponent && inheritedComponent !== objectPrototype) {
                hoistNonReactStatics(targetComponent, inheritedComponent, excludelist);
            }
        }

        let keys: Array = getOwnPropertyNames(sourceComponent);

        if (getOwnPropertySymbols) {
            keys = keys.concat(getOwnPropertySymbols(sourceComponent));
        }

        const targetStatics: Object = getStatics(targetComponent);
        const sourceStatics: Object = getStatics(sourceComponent);

        for (let i = 0; i < keys.length; ++i) {
            const key: String = keys[i];
            if (!KNOWN_STATICS[key] &&
                !(excludelist && excludelist[key]) &&
                !(sourceStatics && sourceStatics[key]) &&
                !(targetStatics && targetStatics[key])
            ) {
                const descriptor: Object = getOwnPropertyDescriptor(sourceComponent, key);
                try { // Avoid failures from read-only properties
                    defineProperty(targetComponent, key, descriptor);
                } catch (e) {}
            }
        }
    }

    return targetComponent;
};
