declare function _exports<T>(plan: Map<string, T | T[]>, limit: number): Map<string, Map<T, string>>;
export = _exports;
export type TreeNode<T> = {
    filePath: string;
    parent: any;
    children: TreeNode[];
    entries: number;
    active: boolean;
    value: T[] | T | undefined;
};
