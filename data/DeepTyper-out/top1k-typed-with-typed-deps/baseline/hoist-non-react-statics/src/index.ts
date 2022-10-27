/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
import { ForwardRef, Memo, isMemo } from 'react-is';

const REACT_STATICS: any = {
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

const KNOWN_STATICS: any = {
    name: true,
    length: true,
    prototype: true,
    caller: true,
    callee: true,
    arguments: true,
    arity: true
};

const FORWARD_REF_STATICS: any = {
    '$$typeof': true,
    render: true,
    defaultProps: true,
    displayName: true,
    propTypes: true
};

const MEMO_STATICS: any = {
    '$$typeof': true,
    compare: true,
    defaultProps: true,
    displayName: true,
    propTypes: true,
    type: true,
}

const TYPE_STATICS: {} = {};
TYPE_STATICS[ForwardRef] = FORWARD_REF_STATICS;
TYPE_STATICS[Memo] = MEMO_STATICS;

function getStatics(component: any): boolean {
    // React v16.11 and below
    if (isMemo(component)) {
        return MEMO_STATICS;
    }

    // React v16.12 and above
    return TYPE_STATICS[component['$$typeof']] || REACT_STATICS;
}

const defineProperty: any = Object.defineProperty;
const getOwnPropertyNames: string[] = Object.getOwnPropertyNames;
const getOwnPropertySymbols: boolean = Object.getOwnPropertySymbols;
const getOwnPropertyDescriptor: PropertyDescriptor = Object.getOwnPropertyDescriptor;
const getPrototypeOf: any = Object.getPrototypeOf;
const objectPrototype: any = Object.prototype;

export default function hoistNonReactStatics(targetComponent: Component, sourceComponent: boolean, excludelist: boolean): boolean {
    if (typeof sourceComponent !== 'string') { // don't hoist over string (html) components

        if (objectPrototype) {
            const inheritedComponent: any = getPrototypeOf(sourceComponent);
            if (inheritedComponent && inheritedComponent !== objectPrototype) {
                hoistNonReactStatics(targetComponent, inheritedComponent, excludelist);
            }
        }

        let keys: string[] = getOwnPropertyNames(sourceComponent);

        if (getOwnPropertySymbols) {
            keys = keys.concat(getOwnPropertySymbols(sourceComponent));
        }

        const targetStatics: boolean = getStatics(targetComponent);
        const sourceStatics: boolean = getStatics(sourceComponent);

        for (let i = 0; i < keys.length; ++i) {
            const key: string = keys[i];
            if (!KNOWN_STATICS[key] &&
                !(excludelist && excludelist[key]) &&
                !(sourceStatics && sourceStatics[key]) &&
                !(targetStatics && targetStatics[key])
            ) {
                const descriptor: PropertyDescriptor = getOwnPropertyDescriptor(sourceComponent, key);
                try { // Avoid failures from read-only properties
                    defineProperty(targetComponent, key, descriptor);
                } catch (e) {}
            }
        }
    }

    return targetComponent;
};
