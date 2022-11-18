// Each scope gets a bitset that may contain these flags
export const
    SCOPE_TOP: number = 1,
    SCOPE_FUNCTION: number = 2,
    SCOPE_ASYNC: number = 4,
    SCOPE_GENERATOR: number = 8,
    SCOPE_ARROW: number = 16,
    SCOPE_SIMPLE_CATCH: number = 32,
    SCOPE_SUPER: number = 64,
    SCOPE_DIRECT_SUPER: number = 128,
    SCOPE_CLASS_STATIC_BLOCK: number = 256,
    SCOPE_VAR: number = SCOPE_TOP | SCOPE_FUNCTION | SCOPE_CLASS_STATIC_BLOCK

export function functionFlags(async: boolean, generator: boolean): number {
  return SCOPE_FUNCTION | (async ? SCOPE_ASYNC : 0) | (generator ? SCOPE_GENERATOR : 0)
}

// Used in checkLVal* and declareName to determine the type of a binding
export const
    BIND_NONE: number = 0, // Not a binding
    BIND_VAR: number = 1, // Var-style binding
    BIND_LEXICAL: number = 2, // Let- or const-style binding
    BIND_FUNCTION: number = 3, // Function declaration
    BIND_SIMPLE_CATCH: number = 4, // Simple (identifier pattern) catch binding
    BIND_OUTSIDE: number = 5 // Special case for function names as bound inside the function
