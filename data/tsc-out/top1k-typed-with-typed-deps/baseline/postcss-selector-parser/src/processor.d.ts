export default class Processor {
    constructor(func: any, options: any);
    func: any;
    funcRes: any;
    options: any;
    _shouldUpdateSelector(rule: any, options?: {}): boolean;
    _isLossy(options?: {}): boolean;
    _root(rule: any, options?: {}): import("./selectors/root").default;
    _parseOptions(options: any): {
        lossy: boolean;
    };
    _run(rule: any, options?: {}): Promise<any>;
    _runSync(rule: any, options?: {}): {
        transform: any;
        root: import("./selectors/root").default;
        string: any;
    };
    /**
     * Process rule into a selector AST.
     *
     * @param rule {postcss.Rule | string} The css selector to be processed
     * @param options The options for processing
     * @returns {Promise<parser.Root>} The AST of the selector after processing it.
     */
    ast(rule: postcss.Rule | string, options: any): Promise<parser.Root>;
    /**
     * Process rule into a selector AST synchronously.
     *
     * @param rule {postcss.Rule | string} The css selector to be processed
     * @param options The options for processing
     * @returns {parser.Root} The AST of the selector after processing it.
     */
    astSync(rule: postcss.Rule | string, options: any): parser.Root;
    /**
     * Process a selector into a transformed value asynchronously
     *
     * @param rule {postcss.Rule | string} The css selector to be processed
     * @param options The options for processing
     * @returns {Promise<any>} The value returned by the processor.
     */
    transform(rule: postcss.Rule | string, options: any): Promise<any>;
    /**
     * Process a selector into a transformed value synchronously.
     *
     * @param rule {postcss.Rule | string} The css selector to be processed
     * @param options The options for processing
     * @returns {any} The value returned by the processor.
     */
    transformSync(rule: postcss.Rule | string, options: any): any;
    /**
     * Process a selector into a new selector string asynchronously.
     *
     * @param rule {postcss.Rule | string} The css selector to be processed
     * @param options The options for processing
     * @returns {string} the selector after processing.
     */
    process(rule: postcss.Rule | string, options: any): string;
    /**
     * Process a selector into a new selector string synchronously.
     *
     * @param rule {postcss.Rule | string} The css selector to be processed
     * @param options The options for processing
     * @returns {string} the selector after processing.
     */
    processSync(rule: postcss.Rule | string, options: any): string;
}
