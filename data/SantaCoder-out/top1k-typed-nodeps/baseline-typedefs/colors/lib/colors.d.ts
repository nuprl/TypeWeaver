declare var colors: any;
declare var util: any;
declare var ansiStyles: any;
declare var defineProps: <T>(o: T, properties: PropertyDescriptorMap & ThisType<any>) => T;
declare var newLineRegex: RegExp;
declare var stylize: (str: string, style: string) => any;
declare var matchOperatorsRe: RegExp;
declare var escapeStringRegexp: (str: string) => string;
declare function build(_styles: any): () => any;
declare var styles: {};
declare var proto: () => void;
declare function applyStyle(): any;
declare function init(): {};
declare var sequencer: (map: Function, str: string) => string;
