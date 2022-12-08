export default function getBasicPropertyDescriptor(name: PropertyKey): {
    set: (v: any) => void;
    get: () => any;
    enumerable: boolean;
    configurable: boolean;
};
