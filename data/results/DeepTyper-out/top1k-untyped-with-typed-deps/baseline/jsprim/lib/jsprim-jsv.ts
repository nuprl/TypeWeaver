/*
 * lib/jsprim-jsv.js: extras for testing performance vs JSV
 */

var mod_assert: any = require('assert');
var mod_jsv: any;		/* lazy-loaded because it may not be here */

module.exports = {
	validateJsonObjectJSV: validateJsonObjectJSV
};

function validateJsonObjectJSV(schema: any, input: any): any
{
	if (!mod_jsv)
		mod_jsv = require('JSV');

	var env: any = mod_jsv.JSV.createEnvironment();
	var report: any = env.validate(input, schema);

	if (report.errors.length === 0)
		return (null);

	/* Currently, we only do anything useful with the first error. */
	mod_assert.ok(report.errors.length > 0);
	var error: any = report.errors[0];

	/* The failed property is given by a URI with an irrelevant prefix. */
	var propname: any = error['uri'].substr(error['uri'].indexOf('#') + 2);
	var reason: any;

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

	var message: string = reason + ': "' + propname + '"';
	var rv: Error = new Error(message);
	rv.jsv_details = error;
	return (rv);
}
