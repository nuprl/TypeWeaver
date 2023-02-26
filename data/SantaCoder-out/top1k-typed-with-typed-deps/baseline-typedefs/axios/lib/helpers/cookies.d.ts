declare const _default: {
    write: (name: string, value: any, expires: number, path: string, domain: string, secure: boolean) => void;
    read: (name: string) => string;
    remove: (name: string) => void;
} | {
    write: () => void;
    read: () => any;
    remove: () => void;
};
export default _default;
