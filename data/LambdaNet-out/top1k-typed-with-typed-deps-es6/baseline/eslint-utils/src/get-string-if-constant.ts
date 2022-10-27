import { getStaticValue } from "./get-static-value"

/**
 * Get the value of a given node if it's a literal or a template literal.
 * @param {Node} node The node to get.
 * @param {Scope} [initialScope] The scope to start finding variable. Optional. If the node is an Identifier node and this scope was given, this checks the variable of the identifier, and returns the value of it if the variable is a constant.
 * @returns {string|null} The value of the node, or `null`.
 */
export function getStringIfConstant(node: Object, initialScope: String = null): Array {
    // Handle the literals that the platform doesn't support natively.
    if (node && node.type === "Literal" && node.value === null) {
        if (node.regex) {
            return `/${node.regex.pattern}/${node.regex.flags}`
        }
        if (node.bigint) {
            return node.bigint
        }
    }

    const evaluated: Object = getStaticValue(node, initialScope)
    return evaluated && String(evaluated.value)
}
