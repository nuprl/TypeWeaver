#!/usr/bin/env node
declare var dashdash: any;
declare var options: ({
    names: string[];
    type: string;
    help: string;
    env?: undefined;
} | {
    names: string[];
    type: string;
    env: string;
    help?: undefined;
})[];
declare var parser: any;
