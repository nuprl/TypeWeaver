/*
 * lib/jsprim-jsv.js: extras for testing performance vs JSV
 */

var mod_assert: String = require('assert');
var mod_jsv: Number;		/* lazy-loaded because it may not be here */

module.exports = {
	validateJsonObjectJSV: validateJsonObjectJSV
};

function validateJsonObjectJSV(schema: String, input: Element): HTMLElement
{
	if (!mod_jsv)
		mod_jsv = require('JSV');

	var env: HTMLElement = mod_jsv.JSV.createEnvironment();
	var report: HTMLElement = env.validate(input, schema);

	if (report.errors.length === 0)
		return (null);

	/* Currently, we only do anything useful with the first error. */
	mod_assert.ok(report.errors.length > 0);
	var error: Object = report.errors[0];

	/* The failed property is given by a URI with an irrelevant prefix. */
	var propname: String = error['uri'].substr(error['uri'].indexOf('#') + 2);
	var reason: Number;

	/*
	 * Some of the default error messages are pretty arcane, so we define
	 * new ones here.
	 */
	switch (error['attribute']) {
	case 'type':
		reason = 'expected ' + error['details'];
		break;
	default:
		reason = error['message'].toLowerCase();
		break;
	}

	var message: String = reason + ': "' + propname + '"';
	var rv: HTMLCanvasElement = new Error(message);
	rv.jsv_details = error;
	return (rv);
}
