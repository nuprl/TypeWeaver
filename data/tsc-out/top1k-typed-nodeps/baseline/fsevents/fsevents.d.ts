export function watch(path: any, since: any, handler: any): () => Promise<any>;
export function getInfo(path: any, flags: any): {
    path: any;
    flags: any;
    event: string;
    type: string;
    changes: {
        inode: boolean;
        finder: boolean;
        access: boolean;
        xattrs: boolean;
    };
};
declare const events: any;
export { events as constants };
