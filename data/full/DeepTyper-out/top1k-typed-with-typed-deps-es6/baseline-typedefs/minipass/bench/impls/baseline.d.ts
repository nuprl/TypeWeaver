export default class BaselineNoOpStream {
    constructor();
    write(): boolean;
    end(): this;
    pipe(d: any): any;
    read(): any;
    on(): this;
    emit(): void;
}
