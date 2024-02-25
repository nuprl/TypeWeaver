declare namespace _default {
    export function getAdapter(nameOrAdapter: any): any;
    export { adapters };
}
export default _default;
declare namespace adapters {
    export { httpAdapter as http };
    export { xhrAdapter as xhr };
}
import httpAdapter from "./http.js";
import xhrAdapter from "./xhr.js";
