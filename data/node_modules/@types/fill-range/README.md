# Installation
> `npm install --save @types/fill-range`

# Summary
This package contains type definitions for fill-range (https://github.com/jonschlinkert/fill-range).

# Details
Files were exported from https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/fill-range.
## [index.d.ts](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/fill-range/index.d.ts)
````ts
// Type definitions for fill-range 7.0
// Project: https://github.com/jonschlinkert/fill-range
// Definitions by: Richie Bendall <https://github.com/Richienb>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare namespace fill {
    interface Options<ValueType, TransformValueType> {
        step?: number;
        strictRanges?: boolean;
        stringify?: boolean;
        toRegex?: boolean;
        transform?: (value: ValueType) => TransformValueType;
    }
}

type FilledArray<ValueType, TransformValueType> = ValueType extends TransformValueType ? ValueType[] : TransformValueType[];

declare function fill<
    ValueType = string | number,
    TransformValueType = unknown
>(
    start: ValueType,
    end?: ValueType | null,
    step?: number,
    options?: fill.Options<ValueType, TransformValueType>
): FilledArray<ValueType, TransformValueType>;

declare function fill<
    ValueType = string | number,
    TransformValueType = unknown
>(
    start: ValueType,
    end?: ValueType | null,
    transformOrOptions?: fill.Options<ValueType, TransformValueType>['transform'] | fill.Options<ValueType, TransformValueType>
): FilledArray<ValueType, TransformValueType>;

export = fill;

````

### Additional Details
 * Last updated: Tue, 02 Nov 2021 02:01:19 GMT
 * Dependencies: none
 * Global values: none

# Credits
These definitions were written by [Richie Bendall](https://github.com/Richienb).
