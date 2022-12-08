declare function symlinkType(srcpath: string, type: number, callback: Function): void;
declare function symlinkTypeSync(srcpath: string, type: number): string;
declare const _default: {
    symlinkType: typeof symlinkType;
    symlinkTypeSync: typeof symlinkTypeSync;
};
export default _default;
