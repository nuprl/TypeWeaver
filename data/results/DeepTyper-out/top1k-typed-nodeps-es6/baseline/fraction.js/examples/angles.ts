/**
 * @license Fraction.js v2.7.0 01/06/2015
 * http://www.xarg.org/2014/03/rational-numbers-in-javascript/
 *
 * Copyright (c) 2015, Robert Eisele (robert@xarg.org)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 **/

// This example generates a list of angles with human readable radians

import Fraction from '../fraction.min.js';

var tab: any[] = [];
for (var d = 1; d <= 360; d++) {

   var pi: number = Fraction(2, 360).mul(d);
   var tau: number = Fraction(1, 360).mul(d);
  
   if (pi.d <= 6 && pi.d != 5)
      tab.push([
        d,
        pi.toFraction() + "pi",
        tau.toFraction() + "tau"]);
}

console.table(tab);
