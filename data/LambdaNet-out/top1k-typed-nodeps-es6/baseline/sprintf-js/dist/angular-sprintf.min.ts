/*! sprintf-js v1.1.2 | Copyright (c) 2007-present, Alexandru Mărășteanu <hello@alexei.ro> | BSD-3-Clause */
!function(){"use strict";angular.module("sprintf",[]).filter("sprintf",function(){return function(){return sprintf.apply(null,arguments)}}).filter("fmt",["$filter",function(t: Function){return t("sprintf")}]).filter("vsprintf",function(){return function(t: String,n: Number){return vsprintf(t,n)}}).filter("vfmt",["$filter",function(t: Function){return t("vsprintf")}])}();
//# sourceMappingURL=angular-sprintf.min.js.map
