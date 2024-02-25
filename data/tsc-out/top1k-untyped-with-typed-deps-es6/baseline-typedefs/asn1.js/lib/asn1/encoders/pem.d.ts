export default PEMEncoder;
declare function PEMEncoder(entity: any): void;
declare class PEMEncoder {
    constructor(entity: any);
    enc: string;
    encode(data: any, options: any): string;
}
