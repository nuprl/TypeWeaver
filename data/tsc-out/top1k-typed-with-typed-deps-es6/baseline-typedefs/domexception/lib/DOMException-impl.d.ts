export const implementation: {
    new (globalObject: any, [message, name]: [any, any]): {
        name: any;
        message: any;
        readonly code: any;
    };
};
export function init(impl: any): void;
