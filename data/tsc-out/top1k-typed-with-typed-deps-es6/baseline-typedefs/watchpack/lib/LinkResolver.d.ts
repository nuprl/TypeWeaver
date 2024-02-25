export default LinkResolver;
declare class LinkResolver {
    cache: Map<any, any>;
    resolve(file: string): string[];
}
