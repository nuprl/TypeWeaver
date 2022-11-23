import Node from './node';
export default class Namespace extends Node {
    get namespace(): any;
    set namespace(namespace: any);
    get ns(): any;
    set ns(namespace: any);
    get namespaceString(): any;
    qualifiedName(value: any): any;
    valueToString(): any;
}
