export default function queue(worker: any, concurrency: any, payload: any): {
    _tasks: DLL;
    _createTaskItem(data: any, callback: any): {
        data: any;
        callback: any;
    };
    [Symbol.iterator](): Generator<any, void, unknown>;
    concurrency: any;
    payload: any;
    buffer: number;
    started: boolean;
    paused: boolean;
    push(data: any, callback: any): Promise<any> | Promise<any>[];
    pushAsync(data: any, callback: any): Promise<any> | Promise<any>[];
    kill(): void;
    unshift(data: any, callback: any): Promise<any> | Promise<any>[];
    unshiftAsync(data: any, callback: any): Promise<any> | Promise<any>[];
    remove(testFn: any): void;
    process(): void;
    length(): number;
    running(): number;
    workersList(): any[];
    idle(): boolean;
    pause(): void;
    resume(): void;
};
import DLL from "./DoublyLinkedList.js";
