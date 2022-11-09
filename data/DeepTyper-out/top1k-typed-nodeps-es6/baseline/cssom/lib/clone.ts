//.CommonJS
var CSSOM: any = {
	CSSStyleSheet: require("./CSSStyleSheet").CSSStyleSheet,
	CSSRule: require("./CSSRule").CSSRule,
	CSSStyleRule: require("./CSSStyleRule").CSSStyleRule,
	CSSGroupingRule: require("./CSSGroupingRule").CSSGroupingRule,
	CSSConditionRule: require("./CSSConditionRule").CSSConditionRule,
	CSSMediaRule: require("./CSSMediaRule").CSSMediaRule,
	CSSSupportsRule: require("./CSSSupportsRule").CSSSupportsRule,
	CSSStyleDeclaration: require("./CSSStyleDeclaration").CSSStyleDeclaration,
	CSSKeyframeRule: require('./CSSKeyframeRule').CSSKeyframeRule,
	CSSKeyframesRule: require('./CSSKeyframesRule').CSSKeyframesRule
};
///CommonJS


/**
 * Produces a deep copy of stylesheet — the instance variables of stylesheet are copied recursively.
 * @param {CSSStyleSheet|CSSOM.CSSStyleSheet} stylesheet
 * @nosideeffects
 * @return {CSSOM.CSSStyleSheet}
 */
CSSOM.clone = function clone(stylesheet: any): any {

	var cloned: any = new CSSOM.CSSStyleSheet();

	var rules: any = stylesheet.cssRules;
	if (!rules) {
		return cloned;
	}

	for (var i = 0, rulesLength = rules.length; i < rulesLength; i++) {
		var rule: any = rules[i];
		var ruleClone: any = cloned.cssRules[i] = new rule.constructor();

		var style: any = rule.style;
		if (style) {
			var styleClone: any = ruleClone.style = new CSSOM.CSSStyleDeclaration();
			for (var j = 0, styleLength = style.length; j < styleLength; j++) {
				var name: any = styleClone[j] = style[j];
				styleClone[name] = style[name];
				styleClone._importants[name] = style.getPropertyPriority(name);
			}
			styleClone.length = style.length;
		}

		if (rule.hasOwnProperty('keyText')) {
			ruleClone.keyText = rule.keyText;
		}

		if (rule.hasOwnProperty('selectorText')) {
			ruleClone.selectorText = rule.selectorText;
		}

		if (rule.hasOwnProperty('mediaText')) {
			ruleClone.mediaText = rule.mediaText;
		}

		if (rule.hasOwnProperty('conditionText')) {
			ruleClone.conditionText = rule.conditionText;
		}

		if (rule.hasOwnProperty('cssRules')) {
			ruleClone.cssRules = clone(rule).cssRules;
		}
	}

	return cloned;

};

//.CommonJS
export const clone: any = CSSOM.clone;
///CommonJS
