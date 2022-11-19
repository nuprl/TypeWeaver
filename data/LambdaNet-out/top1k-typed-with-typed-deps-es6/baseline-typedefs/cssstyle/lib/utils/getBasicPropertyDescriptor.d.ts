export default function getBasicPropertyDescriptor(name: any): {
    set: (v: any) => void;
    get: () => any;
    enumerable: boolean;
    configurable: boolean;
};
