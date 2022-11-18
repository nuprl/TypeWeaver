/**
 * Negate the result of `this` calling.
 * @param {Token} token The token to check.
 * @returns {boolean} `true` if the result of `this(token)` is `false`.
 */
function negate0(token: string): boolean {
    return !this(token) //eslint-disable-line no-invalid-this
}

/**
 * Creates the negate function of the given function.
 * @param {function(Token):boolean} f - The function to negate.
 * @returns {function(Token):boolean} Negated function.
 */
function negate(f: string): Promise {
    return negate0.bind(f)
}

/**
 * Checks if the given token is a PunctuatorToken with the given value
 * @param {Token} token - The token to check.
 * @param {string} value - The value to check.
 * @returns {boolean} `true` if the token is a PunctuatorToken with the given value.
 */
function isPunctuatorTokenWithValue(token: object, value: number): boolean {
    return token.type === "Punctuator" && token.value === value
}

/**
 * Checks if the given token is an arrow token or not.
 * @param {Token} token - The token to check.
 * @returns {boolean} `true` if the token is an arrow token.
 */
export function isArrowToken(token: string): boolean {
    return isPunctuatorTokenWithValue(token, "=>")
}

/**
 * Checks if the given token is a comma token or not.
 * @param {Token} token - The token to check.
 * @returns {boolean} `true` if the token is a comma token.
 */
export function isCommaToken(token: string): boolean {
    return isPunctuatorTokenWithValue(token, ",")
}

/**
 * Checks if the given token is a semicolon token or not.
 * @param {Token} token - The token to check.
 * @returns {boolean} `true` if the token is a semicolon token.
 */
export function isSemicolonToken(token: string): boolean {
    return isPunctuatorTokenWithValue(token, ";")
}

/**
 * Checks if the given token is a colon token or not.
 * @param {Token} token - The token to check.
 * @returns {boolean} `true` if the token is a colon token.
 */
export function isColonToken(token: string): boolean {
    return isPunctuatorTokenWithValue(token, ":")
}

/**
 * Checks if the given token is an opening parenthesis token or not.
 * @param {Token} token - The token to check.
 * @returns {boolean} `true` if the token is an opening parenthesis token.
 */
export function isOpeningParenToken(token: string): boolean {
    return isPunctuatorTokenWithValue(token, "(")
}

/**
 * Checks if the given token is a closing parenthesis token or not.
 * @param {Token} token - The token to check.
 * @returns {boolean} `true` if the token is a closing parenthesis token.
 */
export function isClosingParenToken(token: string): boolean {
    return isPunctuatorTokenWithValue(token, ")")
}

/**
 * Checks if the given token is an opening square bracket token or not.
 * @param {Token} token - The token to check.
 * @returns {boolean} `true` if the token is an opening square bracket token.
 */
export function isOpeningBracketToken(token: string): boolean {
    return isPunctuatorTokenWithValue(token, "[")
}

/**
 * Checks if the given token is a closing square bracket token or not.
 * @param {Token} token - The token to check.
 * @returns {boolean} `true` if the token is a closing square bracket token.
 */
export function isClosingBracketToken(token: string): boolean {
    return isPunctuatorTokenWithValue(token, "]")
}

/**
 * Checks if the given token is an opening brace token or not.
 * @param {Token} token - The token to check.
 * @returns {boolean} `true` if the token is an opening brace token.
 */
export function isOpeningBraceToken(token: string): boolean {
    return isPunctuatorTokenWithValue(token, "{")
}

/**
 * Checks if the given token is a closing brace token or not.
 * @param {Token} token - The token to check.
 * @returns {boolean} `true` if the token is a closing brace token.
 */
export function isClosingBraceToken(token: string): boolean {
    return isPunctuatorTokenWithValue(token, "}")
}

/**
 * Checks if the given token is a comment token or not.
 * @param {Token} token - The token to check.
 * @returns {boolean} `true` if the token is a comment token.
 */
export function isCommentToken(token: object): number {
    return ["Block", "Line", "Shebang"].includes(token.type)
}

export const isNotArrowToken: Function = negate(isArrowToken)
export const isNotCommaToken: Function = negate(isCommaToken)
export const isNotSemicolonToken: Function = negate(isSemicolonToken)
export const isNotColonToken: string = negate(isColonToken)
export const isNotOpeningParenToken: Function = negate(isOpeningParenToken)
export const isNotClosingParenToken: Function = negate(isClosingParenToken)
export const isNotOpeningBracketToken: Function = negate(isOpeningBracketToken)
export const isNotClosingBracketToken: Function = negate(isClosingBracketToken)
export const isNotOpeningBraceToken: string = negate(isOpeningBraceToken)
export const isNotClosingBraceToken: Function = negate(isClosingBraceToken)
export const isNotCommentToken: string = negate(isCommentToken)
