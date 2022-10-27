/**
 * Get the innermost scope which contains a given location.
 * @param {Scope} initialScope The initial scope to search.
 * @param {Node} node The location to search.
 * @returns {Scope} The innermost scope.
 */
export function getInnermostScope(initialScope: any, node: any): any {
    const location: any = node.range[0]

    let scope: any = initialScope
    let found: boolean = false
    do {
        found = false
        for (const childScope of scope.childScopes) {
            const range: any = childScope.block.range

            if (range[0] <= location && location < range[1]) {
                scope = childScope
                found = true
                break
            }
        }
    } while (found)

    return scope
}
