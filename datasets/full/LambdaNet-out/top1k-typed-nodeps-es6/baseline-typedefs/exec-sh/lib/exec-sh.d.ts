declare function execSh(command: string, options: Function, callback: Function): string;
declare namespace execSh {
    var promise: (command: string, options: object) => Promise<unknown>;
}
export default execSh;
