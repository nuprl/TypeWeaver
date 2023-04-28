declare var Promise: PromiseConstructor;
declare var DEFAULT_WHITELIST: RangeErrorConstructor[];
declare var enabled: boolean;
declare function disable(): void;
declare function enable(options: any): void;
declare function logError(id: string, error: any): void;
declare function matchWhitelist(error: any, list: string[]): boolean;
