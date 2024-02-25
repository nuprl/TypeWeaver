declare namespace _default {
    function optimize(regexp: any, { whitelist, blacklist }?: {
        whitelist?: any[];
        blacklist?: any[];
    }): transform.TransformResult;
}
export default _default;
import transform from "../transform";
