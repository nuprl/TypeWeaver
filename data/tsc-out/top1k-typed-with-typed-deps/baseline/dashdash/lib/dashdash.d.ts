export function createParser(config: any): Parser;
/**
 * Parser constructor.
 *
 * @param config {Object} The parser configuration
 *      - options {Array} Array of option specs. See the README for how to
 *        specify each option spec.
 *      - allowUnknown {Boolean} Default false. Whether to throw on unknown
 *        options. If false, then unknown args are included in the _args array.
 *      - interspersed {Boolean} Default true. Whether to allow interspersed
 *        arguments (non-options) and options. E.g.:
 *              node tool.js arg1 arg2 -v
 *        '-v' is after some args here. If `interspersed: false` then '-v'
 *        would not be parsed out. Note that regardless of `interspersed`
 *        the presence of '--' will stop option parsing, as all good
 *        option parsers should.
 */
export function Parser(config: any): void;
export class Parser {
    /**
     * Parser constructor.
     *
     * @param config {Object} The parser configuration
     *      - options {Array} Array of option specs. See the README for how to
     *        specify each option spec.
     *      - allowUnknown {Boolean} Default false. Whether to throw on unknown
     *        options. If false, then unknown args are included in the _args array.
     *      - interspersed {Boolean} Default true. Whether to allow interspersed
     *        arguments (non-options) and options. E.g.:
     *              node tool.js arg1 arg2 -v
     *        '-v' is after some args here. If `interspersed: false` then '-v'
     *        would not be parsed out. Note that regardless of `interspersed`
     *        the presence of '--' will stop option parsing, as all good
     *        option parsers should.
     */
    constructor(config: any);
    interspersed: any;
    allowUnknown: any;
    options: any;
    optionFromName: {};
    optionFromEnv: {};
    optionTakesArg(option: any): any;
    /**
     * Parse options from the given argv.
     *
     * @param inputs {Object} Optional.
     *      - argv {Array} Optional. The argv to parse. Defaults to
     *        `process.argv`.
     *      - slice {Number} The index into argv at which options/args begin.
     *        Default is 2, as appropriate for `process.argv`.
     *      - env {Object} Optional. The env to use for 'env' entries in the
     *        option specs. Defaults to `process.env`.
     * @returns {Object} Parsed `opts`. It has special keys `_args` (the
     *      remaining args from `argv`) and `_order` (gives the order that
     *      options were specified).
     */
    parse(inputs: any, ...args: any[]): any;
    /**
     * Return help output for the current options.
     *
     * E.g.: if the current options are:
     *      [{names: ['help', 'h'], type: 'bool', help: 'Show help and exit.'}]
     * then this would return:
     *      '  -h, --help     Show help and exit.\n'
     *
     * @param config {Object} Config for controlling the option help output.
     *      - indent {Number|String} Default 4. An indent/prefix to use for
     *        each option line.
     *      - nameSort {String} Default is 'length'. By default the names are
     *        sorted to put the short opts first (i.e. '-h, --help' preferred
     *        to '--help, -h'). Set to 'none' to not do this sorting.
     *      - maxCol {Number} Default 80. Note that long tokens in a help string
     *        can go past this.
     *      - helpCol {Number} Set to specify a specific column at which
     *        option help will be aligned. By default this is determined
     *        automatically.
     *      - minHelpCol {Number} Default 20.
     *      - maxHelpCol {Number} Default 40.
     *      - includeEnv {Boolean} Default false. If true, a note stating the `env`
     *        envvar (if specified for this option) will be appended to the help
     *        output.
     *      - includeDefault {Boolean} Default false. If true, a note stating
     *        the `default` for this option, if any, will be appended to the help
     *        output.
     *      - helpWrap {Boolean} Default true. Wrap help text in helpCol..maxCol
     *        bounds.
     * @returns {String}
     */
    help(config: any): string;
    /**
     * Return a string suitable for a Bash completion file for this tool.
     *
     * @param args.name {String} The tool name.
     * @param args.specExtra {String} Optional. Extra Bash code content to add
     *      to the end of the "spec". Typically this is used to append Bash
     *      "complete_TYPE" functions for custom option types. See
     *      "examples/ddcompletion.js" for an example.
     * @param args.argtypes {Array} Optional. Array of completion types for
     *      positional args (i.e. non-options). E.g.
     *          argtypes = ['fruit', 'veggie', 'file']
     *      will result in completion of fruits for the first arg, veggies for the
     *      second, and filenames for the third and subsequent positional args.
     *      If not given, positional args will use Bash's 'default' completion.
     *      See `specExtra` for providing Bash `complete_TYPE` functions, e.g.
     *      `complete_fruit` and `complete_veggie` in this example.
     */
    bashCompletion(args: any): any;
}
/**
 * Parse argv with the given options.
 *
 * @param config {Object} A merge of all the available fields from
 *      `dashdash.Parser` and `dashdash.Parser.parse`: options, interspersed,
 *      argv, env, slice.
 */
export function parse(config_: any): any;
/**
 * Add a new option type.
 *
 * @params optionType {Object}:
 *      - name {String} Required.
 *      - takesArg {Boolean} Required. Whether this type of option takes an
 *        argument on process.argv. Typically this is true for all but the
 *        "bool" type.
 *      - helpArg {String} Required iff `takesArg === true`. The string to
 *        show in generated help for options of this type.
 *      - parseArg {Function} Require. `function (option, optstr, arg)` parser
 *        that takes a string argument and returns an instance of the
 *        appropriate type, or throws an error if the arg is invalid.
 *      - array {Boolean} Optional. Set to true if this is an 'arrayOf' type
 *        that collects multiple usages of the option in process.argv and
 *        puts results in an array.
 *      - arrayFlatten {Boolean} Optional. XXX
 *      - default Optional. Default value for options of this type, if no
 *        default is specified in the option type usage.
 */
export function addOptionType(optionType: any): void;
export function getOptionType(name: any): any;
/**
 * Return a synopsis string for the given option spec.
 *
 * Examples:
 *      > synopsisFromOpt({names: ['help', 'h'], type: 'bool'});
 *      '[ --help | -h ]'
 *      > synopsisFromOpt({name: 'file', type: 'string', helpArg: 'FILE'});
 *      '[ --file=FILE ]'
 */
export function synopsisFromOpt(o: any): string;
export const BASH_COMPLETION_TEMPLATE_PATH: string;
/**
 * Return a string suitable for a Bash completion file for this tool.
 *
 * @param args.name {String} The tool name.
 * @param args.options {Array} The array of dashdash option specs.
 * @param args.specExtra {String} Optional. Extra Bash code content to add
 *      to the end of the "spec". Typically this is used to append Bash
 *      "complete_TYPE" functions for custom option types. See
 *      "examples/ddcompletion.js" for an example.
 * @param args.argtypes {Array} Optional. Array of completion types for
 *      positional args (i.e. non-options). E.g.
 *          argtypes = ['fruit', 'veggie', 'file']
 *      will result in completion of fruits for the first arg, veggies for the
 *      second, and filenames for the third and subsequent positional args.
 *      If not given, positional args will use Bash's 'default' completion.
 *      See `specExtra` for providing Bash `complete_TYPE` functions, e.g.
 *      `complete_fruit` and `complete_veggie` in this example.
 */
export function bashCompletionFromOptions(args: any): any;
/**
 * Return the Bash completion "spec" (the string value for the "{{spec}}"
 * var in the "dashdash.bash_completion.in" template) for this tool.
 *
 * The "spec" is Bash code that defines the CLI options and subcmds for
 * the template's completion code. It looks something like this:
 *
 *      local cmd_shortopts="-J ..."
 *      local cmd_longopts="--help ..."
 *      local cmd_optargs="-p=tritonprofile ..."
 *
 * @param args.options {Array} The array of dashdash option specs.
 * @param args.context {String} Optional. A context string for the "local cmd*"
 *      vars in the spec. By default it is the empty string. When used to
 *      scope for completion on a *sub-command* (e.g. for "git log" on a "git"
 *      tool), then it would have a value (e.g. "__log"). See
 *      <http://github.com/trentm/node-cmdln> Bash completion for details.
 * @param opts.includeHidden {Boolean} Optional. Default false. By default
 *      hidden options and subcmds are "excluded". Here excluded means they
 *      won't be offered as a completion, but if used, their argument type
 *      will be completed. "Hidden" options and subcmds are ones with the
 *      `hidden: true` attribute to exclude them from default help output.
 * @param args.argtypes {Array} Optional. Array of completion types for
 *      positional args (i.e. non-options). E.g.
 *          argtypes = ['fruit', 'veggie', 'file']
 *      will result in completion of fruits for the first arg, veggies for the
 *      second, and filenames for the third and subsequent positional args.
 *      If not given, positional args will use Bash's 'default' completion.
 *      See `specExtra` for providing Bash `complete_TYPE` functions, e.g.
 *      `complete_fruit` and `complete_veggie` in this example.
 */
export function bashCompletionSpecFromOptions(args: any): string;
export function parseBool(option: any, optstr: any, arg: any): boolean;
export function parseString(option: any, optstr: any, arg: any): any;
export function parseNumber(option: any, optstr: any, arg: any): number;
export function parseInteger(option: any, optstr: any, arg: any): number;
export function parsePositiveInteger(option: any, optstr: any, arg: any): number;
/**
 * Supported date args:
 * - epoch second times (e.g. 1396031701)
 * - ISO 8601 format: YYYY-MM-DD[THH:MM:SS[.sss][Z]]
 *      2014-03-28T18:35:01.489Z
 *      2014-03-28T18:35:01.489
 *      2014-03-28T18:35:01Z
 *      2014-03-28T18:35:01
 *      2014-03-28
 */
export function parseDate(option: any, optstr: any, arg: any): Date;
