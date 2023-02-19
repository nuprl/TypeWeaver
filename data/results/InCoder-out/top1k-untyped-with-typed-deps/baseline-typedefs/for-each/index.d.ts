declare var isCallable: any;
declare var toStr: () => string;
declare var hasOwnProperty: (v: PropertyKey) => boolean;
declare var forEachArray: (array: ArrayLike<any>, iterator: Iterator<any>, receiver: any) => void;
declare var forEachString: (string: string | null | undefined, iterator: any, receiver: any) => void;
declare var forEachObject: (object: Object, iterator: ObjectIterator, receiver: Object | null) => void;
declare var forEach: (list: Array<T>, iterator: any, thisArg: any) => void;
