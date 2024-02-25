declare function _default<T>(plan: Map<string, T[] | T>, limit: number): Map<string, Map<T, string>>;
export default _default;
export type TreeNode<T_1> = {
    filePath: string;
    parent: any;
    children: TreeNode[];
    entries: number;
    active: boolean;
    value: T[] | T | undefined;
};
