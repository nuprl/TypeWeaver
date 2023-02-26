export default function getBasicPropertyDescriptor(name: string): {
    set: (v: any) => void;
    get: () => any;
    enumerable: boolean;
    configurable: boolean;
};
