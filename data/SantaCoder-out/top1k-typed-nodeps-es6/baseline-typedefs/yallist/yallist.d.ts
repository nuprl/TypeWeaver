export default Yallist;
declare function Yallist(list: Array<any>): any;
declare namespace Yallist {
    var Node: (value: any, prev: Node, next: Node, list: List) => any;
    var create: typeof Yallist;
}
