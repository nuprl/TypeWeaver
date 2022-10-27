import { getInnermostScope } from "./get-innermost-scope"

/**
 * Find the variable of a given name.
 * @param {Scope} initialScope The scope to start finding.
 * @param {string|Node} nameOrNode The variable name to find. If this is a Node object then it should be an Identifier node.
 * @returns {Variable|null} The found variable or null.
 */
export function findVariable(initialScope: string, nameOrNode: string): string {
    let name: string = ""
    let scope: any = initialScope

    if (typeof nameOrNode === "string") {
        name = nameOrNode
    } else {
        name = nameOrNode.name
        scope = getInnermostScope(scope, nameOrNode)
    }

    while (scope != null) {
        const variable: any = scope.set.get(name)
        if (variable != null) {
            return variable
        }
        scope = scope.upper
    }

    return null
}
