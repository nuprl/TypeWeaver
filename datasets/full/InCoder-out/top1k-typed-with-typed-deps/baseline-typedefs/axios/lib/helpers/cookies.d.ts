declare const _default: {
    write: (name: any, value: any, expires: any, path: any, domain: any, secure: any) => void;
    read: (name: String) => string;
    remove: (name: String) => void;
} | {
    write: () => void;
    read: () => any;
    remove: () => void;
};
export default _default;
