import DLL from './DoublyLinkedList.js';
export default function queue(worker: Worker, concurrency: number, payload: any): {
    _tasks: DLL;
    _createTaskItem(data: any, callback: any): {
        data: any;
        callback: any;
    };
    [Symbol.iterator](): Generator<any, void, unknown>;
    concurrency: number;
    payload: any;
    buffer: number;
    started: boolean;
    paused: boolean;
    push(data: any, callback: any): Promise<unknown> | Promise<unknown>[];
    pushAsync(data: any, callback: any): Promise<unknown> | Promise<unknown>[];
    kill(): void;
    unshift(data: any, callback: any): Promise<unknown> | Promise<unknown>[];
    unshiftAsync(data: any, callback: any): Promise<unknown> | Promise<unknown>[];
    remove(testFn: any): void;
    process(): void;
    length(): any;
    running(): number;
    workersList(): any[];
    idle(): boolean;
    pause(): void;
    resume(): void;
};
