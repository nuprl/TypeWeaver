/**
 * Module dependencies.
 */

import crypto from 'crypto';

/**
 * Sign the given `val` with `secret`.
 *
 * @param {String} val
 * @param {String} secret
 * @return {String}
 * @api private
 */

export const sign: Function = function(val: String, secret: Number){
  if ('string' != typeof val) throw new TypeError("Cookie value must be provided as a string.");
  if (null == secret) throw new TypeError("Secret key must be provided.");
  return val + '.' + crypto
    .createHmac('sha256', secret)
    .update(val)
    .digest('base64')
    .replace(/\=+$/, '');
};

/**
 * Unsign and decode the given `input` with `secret`,
 * returning `false` if the signature is invalid.
 *
 * @param {String} input
 * @param {String} secret
 * @return {String|Boolean}
 * @api private
 */

export const unsign: Function = function(input: String, secret: Number){
  if ('string' != typeof input) throw new TypeError("Signed cookie string must be provided.");
  if (null == secret) throw new TypeError("Secret key must be provided.");
  var tentativeValue: String = input.slice(0, input.lastIndexOf('.')),
      expectedInput: Object = sign(tentativeValue, secret),
      expectedBuffer: Array = Buffer.from(expectedInput),
      inputBuffer: Array = Buffer.from(input);
  return (
    expectedBuffer.length === inputBuffer.length &&
    crypto.timingSafeEqual(expectedBuffer, inputBuffer)
   ) ? tentativeValue : false;
};
