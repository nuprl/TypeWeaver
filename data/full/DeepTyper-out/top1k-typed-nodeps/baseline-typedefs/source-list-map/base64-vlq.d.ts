declare var charToIntMap: {};
declare var intToCharMap: {};
declare var base64: {};
declare var VLQ_BASE_SHIFT: number;
declare var VLQ_BASE: number;
declare var VLQ_BASE_MASK: number;
declare var VLQ_CONTINUATION_BIT: number;
declare function toVLQSigned(aValue: number): number;
declare function fromVLQSigned(aValue: number): number;
