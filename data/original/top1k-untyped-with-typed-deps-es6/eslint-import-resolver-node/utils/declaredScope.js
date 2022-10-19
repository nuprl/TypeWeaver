'use strict';
export const __esModule = true;

export const default = function declaredScope(context, name) {
  const references = context.getScope().references;
  const reference = references.find(x => x.identifier.name === name);
  if (!reference) return undefined;
  return reference.resolved.scope.type;
};
