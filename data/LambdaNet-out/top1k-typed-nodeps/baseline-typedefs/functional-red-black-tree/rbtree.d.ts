declare var RED: number;
declare var BLACK: number;
declare function RBNode(color: string, key: string, value: string, left: number, right: string, count: Function): void;
declare function cloneNode(node: HTMLElement): string;
declare function repaint(color: string, node: object): string;
declare function recount(node: HTMLElement): void;
declare function RedBlackTree(compare: Function, root: string): void;
declare var proto: object;
declare function doVisitFull(visit: Function, node: HTMLElement): boolean;
declare function doVisitHalf(lo: string, compare: Function, visit: Function, node: HTMLElement): string;
declare function doVisit(lo: string, hi: string, compare: Function, visit: Function, node: HTMLElement): object;
declare function RedBlackTreeIterator(tree: Function, stack: any[]): void;
declare var iproto: object;
declare function swapNode(n: HTMLElement, v: HTMLElement): void;
declare function fixDoubleBlack(stack: any[]): void;
declare function defaultCompare(a: number, b: number): number;
declare function createRBTree(compare: number): object;
