declare function getStdin(): Promise<string>;
declare namespace getStdin {
    export { getStdinBuffer as buffer };
}
export default getStdin;
declare function getStdinBuffer(): Promise<Buffer>;
