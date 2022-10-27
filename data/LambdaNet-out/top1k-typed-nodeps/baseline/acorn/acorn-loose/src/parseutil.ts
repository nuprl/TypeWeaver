export const dummyValue: String = "✖"

export function isDummy(node: TokenType): Boolean { return node.name === dummyValue }
