export = BaselineNoOpStream;
declare class BaselineNoOpStream {
    pipeDests: any[];
    write(): boolean;
    end(): import("./baseline");
    pipe(d: any): any;
    read(): any;
    on(): import("./baseline");
    emit(): void;
}
