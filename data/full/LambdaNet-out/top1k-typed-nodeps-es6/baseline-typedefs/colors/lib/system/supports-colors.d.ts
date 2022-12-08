declare function getSupportLevel(stream: string): boolean;
declare const _default: {
    supportsColor: typeof getSupportLevel;
    stdout: boolean;
    stderr: boolean;
};
export default _default;
