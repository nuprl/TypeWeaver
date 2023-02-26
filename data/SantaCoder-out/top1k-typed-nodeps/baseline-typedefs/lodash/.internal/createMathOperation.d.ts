declare function createMathOperation(operator: string, defaultValue: number): (value: any, other: any) => any;
export default createMathOperation;
