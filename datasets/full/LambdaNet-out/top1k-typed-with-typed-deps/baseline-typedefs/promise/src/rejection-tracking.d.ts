declare var Promise: HTMLElement;
declare var DEFAULT_WHITELIST: any[];
declare var enabled: boolean;
declare function disable(): void;
declare function enable(options: HTMLElement): void;
declare function logError(id: string, error: Error): void;
declare function matchWhitelist(error: object, list: any[]): boolean;
