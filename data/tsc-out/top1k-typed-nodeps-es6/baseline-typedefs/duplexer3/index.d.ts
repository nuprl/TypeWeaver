export function DuplexWrapper(options: any, writable: any, readable: any): void;
export class DuplexWrapper {
    constructor(options: any, writable: any, readable: any);
    _writable: any;
    _readable: any;
    _waiting: boolean;
    _write(input: any, encoding: any, done: any): void;
    _read(): void;
}
export default function duplexer(options: any, writable: any, readable: any): DuplexWrapper;
