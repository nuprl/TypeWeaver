import Container from './container';
export default class Root extends Container {
    constructor(opts: any);
    toString(): any;
    error(message: any, options: any): any;
    set errorGenerator(handler: any);
}
