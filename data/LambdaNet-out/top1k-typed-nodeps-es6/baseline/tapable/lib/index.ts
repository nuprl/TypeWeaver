/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

export const __esModule: Boolean = true;
export const SyncHook: Number = require("./SyncHook");
export const SyncBailHook: SyncLoopHookCodeFactory = require("./SyncBailHook");
export const SyncWaterfallHook: SyncLoopHookCodeFactory = require("./SyncWaterfallHook");
export const SyncLoopHook: SyncLoopHookCodeFactory = require("./SyncLoopHook");
export const AsyncParallelHook: SyncLoopHookCodeFactory = require("./AsyncParallelHook");
export const AsyncParallelBailHook: Number = require("./AsyncParallelBailHook");
export const AsyncSeriesHook: SyncLoopHookCodeFactory = require("./AsyncSeriesHook");
export const AsyncSeriesBailHook: Number = require("./AsyncSeriesBailHook");
export const AsyncSeriesLoopHook: Number = require("./AsyncSeriesLoopHook");
export const AsyncSeriesWaterfallHook: Number = require("./AsyncSeriesWaterfallHook");
export const HookMap: String = require("./HookMap");
export const MultiHook: HTMLElement = require("./MultiHook");
