#!/usr/bin/env node
declare const fs: any;
declare const path: any;
declare const autoInject: any;
declare function generateIndex(done: Function): void;
declare function loadAliases(cb: any): void;
declare function readEntries(cb: any): void;
declare function renderTemplate(entries: any, aliases: any, template: any): any;
