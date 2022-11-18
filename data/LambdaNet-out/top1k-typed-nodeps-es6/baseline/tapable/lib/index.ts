/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

export const __esModule: boolean = true;
export const SyncHook: number = require("./SyncHook");
export const SyncBailHook: SyncLoopHookCodeFactory = require("./SyncBailHook");
export const SyncWaterfallHook: SyncLoopHookCodeFactory = require("./SyncWaterfallHook");
export const SyncLoopHook: SyncLoopHookCodeFactory = require("./SyncLoopHook");
export const AsyncParallelHook: SyncLoopHookCodeFactory = require("./AsyncParallelHook");
export const AsyncParallelBailHook: number = require("./AsyncParallelBailHook");
export const AsyncSeriesHook: SyncLoopHookCodeFactory = require("./AsyncSeriesHook");
export const AsyncSeriesBailHook: number = require("./AsyncSeriesBailHook");
export const AsyncSeriesLoopHook: number = require("./AsyncSeriesLoopHook");
export const AsyncSeriesWaterfallHook: number = require("./AsyncSeriesWaterfallHook");
export const HookMap: string = require("./HookMap");
export const MultiHook: HTMLElement = require("./MultiHook");
