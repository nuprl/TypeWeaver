export default Yallist;
declare function Yallist(list: any): void;
declare namespace Yallist {
    var Node: (value: any, prev: any, next: any, list: any) => any;
    var create: typeof Yallist;
}
