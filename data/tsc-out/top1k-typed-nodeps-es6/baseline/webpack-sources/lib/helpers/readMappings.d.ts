export default readMappings;
/**
 * @param {string} mappings the mappings string
 * @param {function(number, number, number, number, number, number): void} onMapping called for each mapping
 * @returns {void}
 */
declare function readMappings(mappings: string, onMapping: (arg0: number, arg1: number, arg2: number, arg3: number, arg4: number, arg5: number) => void): void;
