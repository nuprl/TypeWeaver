declare function execSh(command: string, options: any, callback: Function): any;
declare namespace execSh {
    var promise: (command: string, options: any) => Promise<unknown>;
}
export default execSh;
