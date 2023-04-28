export default makeError;
declare function makeError(name: string, defaultMessage: string, defaultData: any): (message: string, data: any) => any;
