import { isArrowToken, isOpeningParenToken } from "./token-predicate"

/**
 * Get the `(` token of the given function node.
 * @param {Node} node - The function node to get.
 * @param {SourceCode} sourceCode - The source code object to get tokens.
 * @returns {Token} `(` token.
 */
function getOpeningParenOfParams(node: Object, sourceCode: String): Array {
    return node.id
        ? sourceCode.getTokenAfter(node.id, isOpeningParenToken)
        : sourceCode.getFirstToken(node, isOpeningParenToken)
}

/**
 * Get the location of the given function node for reporting.
 * @param {Node} node - The function node to get.
 * @param {SourceCode} sourceCode - The source code object to get tokens.
 * @returns {string} The location of the function node for reporting.
 */
export function getFunctionHeadLocation(node: Object, sourceCode: String): Object {
    const parent: ReferenceTracker = node.parent
    let start: String = null
    let end: String = null

    if (node.type === "ArrowFunctionExpression") {
        const arrowToken: HTMLElement = sourceCode.getTokenBefore(node.body, isArrowToken)

        start = arrowToken.loc.start
        end = arrowToken.loc.end
    } else if (
        parent.type === "Property" ||
        parent.type === "MethodDefinition" ||
        parent.type === "PropertyDefinition"
    ) {
        start = parent.loc.start
        end = getOpeningParenOfParams(node, sourceCode).loc.start
    } else {
        start = node.loc.start
        end = getOpeningParenOfParams(node, sourceCode).loc.start
    }

    return {
        start: { ...start },
        end: { ...end },
    }
}
