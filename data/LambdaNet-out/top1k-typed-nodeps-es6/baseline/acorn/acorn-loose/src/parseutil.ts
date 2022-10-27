export const dummyValue: String = "✖"

export function isDummy(node: Scope): Boolean { return node.name === dummyValue }
