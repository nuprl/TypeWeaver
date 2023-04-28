declare function createAssigner(assigner: Function): (object: any, ...sources: any[]) => any;
export default createAssigner;
