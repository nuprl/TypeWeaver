export const implementation: {
    new (globalObject: any, constructorArgs: any, { doNotStripQMark }: {
        doNotStripQMark?: boolean;
    }): {
        _list: any[][];
        _url: any;
        _updateSteps(): void;
        append(name: any, value: any): void;
        delete(name: any): void;
        get(name: any): any;
        getAll(name: any): any[];
        has(name: any): boolean;
        set(name: any, value: any): void;
        sort(): void;
        toString(): string;
        [Symbol.iterator](): IterableIterator<any[]>;
    };
};
