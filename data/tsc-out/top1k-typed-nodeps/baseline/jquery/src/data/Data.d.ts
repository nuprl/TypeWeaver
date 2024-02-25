export default Data;
declare function Data(): void;
declare class Data {
    expando: any;
    cache: (owner: any) => any;
    set: (owner: any, data: any, value: any) => any;
    get: (owner: any, key: any) => any;
    access: (owner: any, key: any, value: any) => any;
    remove: (owner: any, key: any) => void;
    hasData: (owner: any) => boolean;
}
declare namespace Data {
    export { uid };
}
declare var uid: number;
