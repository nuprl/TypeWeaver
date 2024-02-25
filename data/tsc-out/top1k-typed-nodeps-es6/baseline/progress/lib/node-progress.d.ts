export default ProgressBar;
/**
 * Initialize a `ProgressBar` with the given `fmt` string and `options` or
 * `total`.
 *
 * Options:
 *
 *   - `curr` current completed index
 *   - `total` total number of ticks to complete
 *   - `width` the displayed width of the progress bar defaulting to total
 *   - `stream` the output stream defaulting to stderr
 *   - `head` head character defaulting to complete character
 *   - `complete` completion character defaulting to "="
 *   - `incomplete` incomplete character defaulting to "-"
 *   - `renderThrottle` minimum time between updates in milliseconds defaulting to 16
 *   - `callback` optional function to call when the progress bar completes
 *   - `clear` will clear the progress bar upon termination
 *
 * Tokens:
 *
 *   - `:bar` the progress bar itself
 *   - `:current` current tick number
 *   - `:total` total ticks
 *   - `:elapsed` time elapsed in seconds
 *   - `:percent` completion percentage
 *   - `:eta` eta in seconds
 *   - `:rate` rate of ticks per second
 *
 * @param {string} fmt
 * @param {object|number} options or total
 * @api public
 */
declare function ProgressBar(fmt: string, options: object | number): void;
declare class ProgressBar {
    /**
     * Initialize a `ProgressBar` with the given `fmt` string and `options` or
     * `total`.
     *
     * Options:
     *
     *   - `curr` current completed index
     *   - `total` total number of ticks to complete
     *   - `width` the displayed width of the progress bar defaulting to total
     *   - `stream` the output stream defaulting to stderr
     *   - `head` head character defaulting to complete character
     *   - `complete` completion character defaulting to "="
     *   - `incomplete` incomplete character defaulting to "-"
     *   - `renderThrottle` minimum time between updates in milliseconds defaulting to 16
     *   - `callback` optional function to call when the progress bar completes
     *   - `clear` will clear the progress bar upon termination
     *
     * Tokens:
     *
     *   - `:bar` the progress bar itself
     *   - `:current` current tick number
     *   - `:total` total ticks
     *   - `:elapsed` time elapsed in seconds
     *   - `:percent` completion percentage
     *   - `:eta` eta in seconds
     *   - `:rate` rate of ticks per second
     *
     * @param {string} fmt
     * @param {object|number} options or total
     * @api public
     */
    constructor(fmt: string, options: object | number);
    stream: any;
    fmt: string;
    curr: any;
    total: any;
    width: any;
    clear: any;
    chars: {
        complete: any;
        incomplete: any;
        head: any;
    };
    renderThrottle: any;
    lastRender: number;
    callback: any;
    tokens: {};
    lastDraw: string;
    /**
     * "tick" the progress bar with optional `len` and optional `tokens`.
     *
     * @param {number|object} len or tokens
     * @param {object} tokens
     * @api public
     */
    tick(len: number | object, tokens: object): void;
    start: Date;
    complete: boolean;
    /**
     * Method to render the progress bar with optional `tokens` to place in the
     * progress bar's `fmt` field.
     *
     * @param {object} tokens
     * @api public
     */
    render(tokens: object, force: any): void;
    /**
     * "update" the progress bar to represent an exact percentage.
     * The ratio (between 0 and 1) specified will be multiplied by `total` and
     * floored, representing the closest available "tick." For example, if a
     * progress bar has a length of 3 and `update(0.5)` is called, the progress
     * will be set to 1.
     *
     * A ratio of 0.5 will attempt to set the progress to halfway.
     *
     * @param {number} ratio The ratio (between 0 and 1 inclusive) to set the
     *   overall completion to.
     * @api public
     */
    update(ratio: number, tokens: any): void;
    /**
     * "interrupt" the progress bar and write a message above it.
     * @param {string} message The message to write.
     * @api public
     */
    interrupt(message: string): void;
    /**
     * Terminates a progress bar.
     *
     * @api public
     */
    terminate(): void;
}
