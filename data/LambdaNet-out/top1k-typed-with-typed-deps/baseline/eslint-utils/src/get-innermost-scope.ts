/**
 * Get the innermost scope which contains a given location.
 * @param {Scope} initialScope The initial scope to search.
 * @param {Node} node The location to search.
 * @returns {Scope} The innermost scope.
 */
export function getInnermostScope(initialScope: String, node: Object): PatternMatcher {
    const location: Number = node.range[0]

    let scope: Object = initialScope
    let found: Boolean = false
    do {
        found = false
        for (const childScope of scope.childScopes) {
            const range: Object = childScope.block.range

            if (range[0] <= location && location < range[1]) {
                scope = childScope
                found = true
                break
            }
        }
    } while (found)

    return scope
}
