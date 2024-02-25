export default execSh;
declare function execSh(command: string | any[], options?: any | TRUE, callback?: Function): ChildProcess;
declare namespace execSh {
    function promise(command: any, options: any): Promise<any>;
}
