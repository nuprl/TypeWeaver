export default Yallist;
declare function Yallist(list: any): any;
declare namespace Yallist {
    var Node: (value: any, prev: Node, next: Node, list: Node[]) => any;
    var create: typeof Yallist;
}
