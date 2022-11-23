declare var charToIntMap: object;
declare var intToCharMap: object;
declare var base64: object;
declare var VLQ_BASE_SHIFT: number;
declare var VLQ_BASE: number;
declare var VLQ_BASE_MASK: number;
declare var VLQ_CONTINUATION_BIT: number;
declare function toVLQSigned(aValue: number): number;
declare function fromVLQSigned(aValue: number): number;
