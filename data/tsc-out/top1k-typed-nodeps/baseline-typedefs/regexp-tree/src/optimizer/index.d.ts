import transform = require("../transform");
export function optimize(regexp: any, { whitelist, blacklist }?: {
    whitelist?: any[];
    blacklist?: any[];
}): transform.TransformResult;
