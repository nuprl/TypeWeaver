// Each scope gets a bitset that may contain these flags
export const
    SCOPE_TOP: Number = 1,
    SCOPE_FUNCTION: Number = 2,
    SCOPE_ASYNC: Number = 4,
    SCOPE_GENERATOR: Number = 8,
    SCOPE_ARROW: Number = 16,
    SCOPE_SIMPLE_CATCH: Number = 32,
    SCOPE_SUPER: Number = 64,
    SCOPE_DIRECT_SUPER: Number = 128,
    SCOPE_CLASS_STATIC_BLOCK: Number = 256,
    SCOPE_VAR: Number = SCOPE_TOP | SCOPE_FUNCTION | SCOPE_CLASS_STATIC_BLOCK

export function functionFlags(async: Boolean, generator: Boolean): Number {
  return SCOPE_FUNCTION | (async ? SCOPE_ASYNC : 0) | (generator ? SCOPE_GENERATOR : 0)
}

// Used in checkLVal* and declareName to determine the type of a binding
export const
    BIND_NONE: Number = 0, // Not a binding
    BIND_VAR: Number = 1, // Var-style binding
    BIND_LEXICAL: Number = 2, // Let- or const-style binding
    BIND_FUNCTION: Number = 3, // Function declaration
    BIND_SIMPLE_CATCH: Number = 4, // Simple (identifier pattern) catch binding
    BIND_OUTSIDE: Number = 5 // Special case for function names as bound inside the function
