// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).

let getRandomValues: any;

const rnds8: any = new Uint8Array(16);

export default function rng(): any {
  // lazy load so that environments that need to polyfill have a chance to do so
  if (!getRandomValues) {
    // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation.
    getRandomValues =
      typeof crypto !== 'undefined' &&
      crypto.getRandomValues &&
      crypto.getRandomValues.bind(crypto);
    if (!getRandomValues) {
      throw new Error(
        'crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported'
      );
    }
  }

  return getRandomValues(rnds8);
}
