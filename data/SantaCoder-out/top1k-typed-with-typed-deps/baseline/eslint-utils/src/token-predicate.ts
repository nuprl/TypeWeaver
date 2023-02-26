/**
 * Negate the result of `this` calling.
 * @param {Token} token The token to check.
 * @returns {boolean} `true` if the result of `this(token)` is `false`.
 */
function negate0(token: Token) {
    return !this(token) //eslint-disable-line no-invalid-this
}

/**
 * Creates the negate function of the given function.
 * @param {function(Token: any):boolean} f - The function to negate.
 * @returns {function(Token: any):boolean} Negated function.
 */
function negate(f: Function) {
    return negate0.bind(f)
}

/**
 * Checks if the given token is a PunctuatorToken with the given value
 * @param {Token} token - The token to check.
 * @param {string} value - The value to check.
 * @returns {boolean} `true` if the token is a PunctuatorToken with the given value.
 */
function isPunctuatorTokenWithValue(token: Token, value: string) {
    return token.type === "Punctuator" && token.value === value
}

/**
 * Checks if the given token is an arrow token or not.
 * @param {Token} token - The token to check.
 * @returns {boolean} `true` if the token is an arrow token.
 */
export function isArrowToken(token: Token) {
    return isPunctuatorTokenWithValue(token, "=>")
}

/**
 * Checks if the given token is a comma token or not.
 * @param {Token} token - The token to check.
 * @returns {boolean} `true` if the token is a comma token.
 */
export function isCommaToken(token: Token) {
    return isPunctuatorTokenWithValue(token, ",")
}

/**
 * Checks if the given token is a semicolon token or not.
 * @param {Token} token - The token to check.
 * @returns {boolean} `true` if the token is a semicolon token.
 */
export function isSemicolonToken(token: Token) {
    return isPunctuatorTokenWithValue(token, ";")
}

/**
 * Checks if the given token is a colon token or not.
 * @param {Token} token - The token to check.
 * @returns {boolean} `true` if the token is a colon token.
 */
export function isColonToken(token: Token) {
    return isPunctuatorTokenWithValue(token, ":")
}

/**
 * Checks if the given token is an opening parenthesis token or not.
 * @param {Token} token - The token to check.
 * @returns {boolean} `true` if the token is an opening parenthesis token.
 */
export function isOpeningParenToken(token: Token) {
    return isPunctuatorTokenWithValue(token, "(")
}

/**
 * Checks if the given token is a closing parenthesis token or not.
 * @param {Token} token - The token to check.
 * @returns {boolean} `true` if the token is a closing parenthesis token.
 */
export function isClosingParenToken(token: Token) {
    return isPunctuatorTokenWithValue(token, ")")
}

/**
 * Checks if the given token is an opening square bracket token or not.
 * @param {Token} token - The token to check.
 * @returns {boolean} `true` if the token is an opening square bracket token.
 */
export function isOpeningBracketToken(token: SyntaxKind.OpenBraceToken) {
    return isPunctuatorTokenWithValue(token, "[")
}

/**
 * Checks if the given token is a closing square bracket token or not.
 * @param {Token} token - The token to check.
 * @returns {boolean} `true` if the token is a closing square bracket token.
 */
export function isClosingBracketToken(token: IToken) {
    return isPunctuatorTokenWithValue(token, "]")
}

/**
 * Checks if the given token is an opening brace token or not.
 * @param {Token} token - The token to check.
 * @returns {boolean} `true` if the token is an opening brace token.
 */
export function isOpeningBraceToken(token: SyntaxKind.OpenBraceToken) {
    return isPunctuatorTokenWithValue(token, "{")
}

/**
 * Checks if the given token is a closing brace token or not.
 * @param {Token} token - The token to check.
 * @returns {boolean} `true` if the token is a closing brace token.
 */
export function isClosingBraceToken(token: Token) {
    return isPunctuatorTokenWithValue(token, "}")
}

/**
 * Checks if the given token is a comment token or not.
 * @param {Token} token - The token to check.
 * @returns {boolean} `true` if the token is a comment token.
 */
export function isCommentToken(token: IToken) {
    return ["Block", "Line", "Shebang"].includes(token.type)
}

export const isNotArrowToken = negate(isArrowToken)
export const isNotCommaToken = negate(isCommaToken)
export const isNotSemicolonToken = negate(isSemicolonToken)
export const isNotColonToken = negate(isColonToken)
export const isNotOpeningParenToken = negate(isOpeningParenToken)
export const isNotClosingParenToken = negate(isClosingParenToken)
export const isNotOpeningBracketToken = negate(isOpeningBracketToken)
export const isNotClosingBracketToken = negate(isClosingBracketToken)
export const isNotOpeningBraceToken = negate(isOpeningBraceToken)
export const isNotClosingBraceToken = negate(isClosingBraceToken)
export const isNotCommentToken = negate(isCommentToken)