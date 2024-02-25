export function getKeys(node: object): readonly string[];
export function unionWith(additionalKeys: VisitorKeys): VisitorKeys;
export { KEYS };
export type VisitorKeys = {
    readonly [type: string]: readonly string[];
};
import KEYS from "./visitor-keys.js";
