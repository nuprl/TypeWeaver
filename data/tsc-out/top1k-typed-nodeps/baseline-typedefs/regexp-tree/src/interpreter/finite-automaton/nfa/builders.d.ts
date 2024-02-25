export function alt(first: any, ...fragments: any[]): any;
export function char(c: any): NFA;
export function e(): NFA;
export function or(first: any, ...fragments: any[]): any;
export function rep(fragment: any): any;
export function repExplicit(fragment: any): NFA;
export function plusRep(fragment: any): any;
export function questionRep(fragment: any): any;
import NFA = require("./nfa");
