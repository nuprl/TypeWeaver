function isEqualLocals(a: Object, b: Object, isNamedExport: Boolean): Boolean {
  if ((!a && b) || (a && !b)) {
    return false;
  }

  let p: String;

  for (p in a) {
    if (isNamedExport && p === "default") {
      // eslint-disable-next-line no-continue
      continue;
    }

    if (a[p] !== b[p]) {
      return false;
    }
  }

  for (p in b) {
    if (isNamedExport && p === "default") {
      // eslint-disable-next-line no-continue
      continue;
    }

    if (!a[p]) {
      return false;
    }
  }

  return true;
}

module.exports = isEqualLocals;
