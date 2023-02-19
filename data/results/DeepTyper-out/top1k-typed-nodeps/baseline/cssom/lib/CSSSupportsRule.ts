//.CommonJS
var CSSOM: any = {
  CSSRule: require("./CSSRule").CSSRule,
  CSSGroupingRule: require("./CSSGroupingRule").CSSGroupingRule,
  CSSConditionRule: require("./CSSConditionRule").CSSConditionRule
};
///CommonJS


/**
 * @constructor
 * @see https://drafts.csswg.org/css-conditional-3/#the-csssupportsrule-interface
 */
CSSOM.CSSSupportsRule = function CSSSupportsRule(): void {
  CSSOM.CSSConditionRule.call(this);
};

CSSOM.CSSSupportsRule.prototype = new CSSOM.CSSConditionRule();
CSSOM.CSSSupportsRule.prototype.constructor = CSSOM.CSSSupportsRule;
CSSOM.CSSSupportsRule.prototype.type = 12;

Object.defineProperty(CSSOM.CSSSupportsRule.prototype, "cssText", {
  get: function() {
    var cssTexts: any[] = [];

    for (var i = 0, length = this.cssRules.length; i < length; i++) {
      cssTexts.push(this.cssRules[i].cssText);
    }

    return "@supports " + this.conditionText + " {" + cssTexts.join("") + "}";
  }
});

//.CommonJS
exports.CSSSupportsRule = CSSOM.CSSSupportsRule;
///CommonJS
