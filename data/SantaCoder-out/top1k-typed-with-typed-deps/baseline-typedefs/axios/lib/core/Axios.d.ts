declare class Axios {
    constructor(instanceConfig: any);
    request(configOrUrl: any, config: any): any;
    getUri(config: any): string;
}
export default Axios;
