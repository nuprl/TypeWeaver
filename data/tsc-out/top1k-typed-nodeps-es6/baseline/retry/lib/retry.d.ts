export function operation(options: any): RetryOperation;
export function timeouts(options: any): any[];
export function createTimeout(attempt: any, opts: any): number;
export function wrap(obj: any, options: any, methods: any): void;
import RetryOperation from "./retry_operation";
