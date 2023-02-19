function requireUtil() {
  try {
    // eslint-disable-next-line no-restricted-modules
    return require("util");
  } catch (e) {
    return null;
  }
}

// for v10.12.0+
function lookupCustomInspectSymbol() {
  return Symbol.for("nodejs.util.inspect.custom");
}

// for older node environments
function tryReadingCustomSymbolFromUtilInspect(options: any) {
  const _requireUtil = options.requireUtil || requireUtil;
  const util = _requireUtil();
  return util ? util.inspect.custom : null;
}

export const getUtilInspect = function getUtilInspect(fallback: any,  options = {}: GetUtilInspectOption) {
  const _requireUtil = options.requireUtil || requireUtil;
  const util = _requireUtil();
  return function inspect(value: any,  showHidden: any,  depth: number) {
    return util ? util.inspect(value, showHidden, depth) : fallback(value);
  };
};

export const getCustomInspectSymbol = function getCustomInspectSymbol(options = {}: InspectOptions) {
  const _lookupCustomInspectSymbol =
    options.lookupCustomInspectSymbol || lookupCustomInspectSymbol;

  // get custom inspect symbol for node environments
  return (
    _lookupCustomInspectSymbol() ||
    tryReadingCustomSymbolFromUtilInspect(options)
  );
};