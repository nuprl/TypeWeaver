export function _reset(): void;
export function releaseExit(): void;
export function captureExit(): void;
export const _handlers: any[];
export function _flush(lastTime: any, code: any): RSVP.Promise<void>;
export function onExit(cb: any): void;
export function offExit(cb: any): void;
export function exit(...args: any[]): void;
export function listenerCount(): number;
import RSVP from "rsvp";
