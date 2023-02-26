declare function symlinkType(srcpath: string, type: 'junction', callback: any): any;
declare function symlinkTypeSync(srcpath: string, type: 'junction'): "file" | "dir" | "junction";
declare const _default: {
    symlinkType: typeof symlinkType;
    symlinkTypeSync: typeof symlinkTypeSync;
};
export default _default;
