export = onFinished;
declare function onFinished(msg: object, listener: Function): object;
declare namespace onFinished {
    export { isFinished };
}
declare function isFinished(msg: object): boolean;
