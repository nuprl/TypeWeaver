declare class LinkResolver {
    constructor();
    resolve(file: any): string | Function | any[];
}
export default LinkResolver;
