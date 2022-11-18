export const dummyValue: string = "✖"

export function isDummy(node: TokenType): boolean { return node.name === dummyValue }
