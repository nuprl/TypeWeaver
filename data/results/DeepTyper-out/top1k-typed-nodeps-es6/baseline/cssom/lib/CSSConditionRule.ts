//.CommonJS
var CSSOM: any = {
  CSSRule: require("./CSSRule").CSSRule,
  CSSGroupingRule: require("./CSSGroupingRule").CSSGroupingRule
};
///CommonJS


/**
 * @constructor
 * @see https://www.w3.org/TR/css-conditional-3/#the-cssconditionrule-interface
 */
CSSOM.CSSConditionRule = function CSSConditionRule(): void {
  CSSOM.CSSGroupingRule.call(this);
  this.cssRules = [];
};

CSSOM.CSSConditionRule.prototype = new CSSOM.CSSGroupingRule();
CSSOM.CSSConditionRule.prototype.constructor = CSSOM.CSSConditionRule;
CSSOM.CSSConditionRule.prototype.conditionText = ''
CSSOM.CSSConditionRule.prototype.cssText = ''

//.CommonJS
export const CSSConditionRule: any = CSSOM.CSSConditionRule;
///CommonJS
