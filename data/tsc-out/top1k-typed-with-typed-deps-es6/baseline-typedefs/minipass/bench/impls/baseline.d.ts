export default class BaselineNoOpStream {
    pipeDests: any[];
    write(): boolean;
    end(): BaselineNoOpStream;
    pipe(d: any): any;
    read(): any;
    on(): BaselineNoOpStream;
    emit(): void;
}
