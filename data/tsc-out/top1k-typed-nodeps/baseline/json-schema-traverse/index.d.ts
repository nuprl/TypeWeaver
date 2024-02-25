declare function _exports(schema: any, opts: any, cb: any): void;
declare namespace _exports {
    namespace keywords {
        export const additionalItems: boolean;
        export const items: boolean;
        export const contains: boolean;
        export const additionalProperties: boolean;
        export const propertyNames: boolean;
        export const not: boolean;
        const _if: boolean;
        export { _if as if };
        export const then: boolean;
        const _else: boolean;
        export { _else as else };
    }
    namespace arrayKeywords {
        const items_1: boolean;
        export { items_1 as items };
        export const allOf: boolean;
        export const anyOf: boolean;
        export const oneOf: boolean;
    }
    namespace propsKeywords {
        const $defs: boolean;
        const definitions: boolean;
        const properties: boolean;
        const patternProperties: boolean;
        const dependencies: boolean;
    }
    namespace skipKeywords {
        const _default: boolean;
        export { _default as default };
        const _enum: boolean;
        export { _enum as enum };
        const _const: boolean;
        export { _const as const };
        export const required: boolean;
        export const maximum: boolean;
        export const minimum: boolean;
        export const exclusiveMaximum: boolean;
        export const exclusiveMinimum: boolean;
        export const multipleOf: boolean;
        export const maxLength: boolean;
        export const minLength: boolean;
        export const pattern: boolean;
        export const format: boolean;
        export const maxItems: boolean;
        export const minItems: boolean;
        export const uniqueItems: boolean;
        export const maxProperties: boolean;
        export const minProperties: boolean;
    }
}
export = _exports;
