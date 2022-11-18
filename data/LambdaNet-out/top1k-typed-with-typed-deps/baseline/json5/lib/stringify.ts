const util: string = require('./util')

module.exports = function stringify (value: string, replacer: object, space: number): string {
    const stack: any[] = []
    let indent: string = ''
    let propertyList: any[]
    let replacerFunc: Function
    let gap: string = ''
    let quote: string

    if (
        replacer != null &&
        typeof replacer === 'object' &&
        !Array.isArray(replacer)
    ) {
        space = replacer.space
        quote = replacer.quote
        replacer = replacer.replacer
    }

    if (typeof replacer === 'function') {
        replacerFunc = replacer
    } else if (Array.isArray(replacer)) {
        propertyList = []
        for (const v of replacer) {
            let item: string

            if (typeof v === 'string') {
                item = v
            } else if (
                typeof v === 'number' ||
                v instanceof String ||
                v instanceof Number
            ) {
                item = String(v)
            }

            if (item !== undefined && propertyList.indexOf(item) < 0) {
                propertyList.push(item)
            }
        }
    }

    if (space instanceof Number) {
        space = Number(space)
    } else if (space instanceof String) {
        space = String(space)
    }

    if (typeof space === 'number') {
        if (space > 0) {
            space = Math.min(10, Math.floor(space))
            gap = '          '.substr(0, space)
        }
    } else if (typeof space === 'string') {
        gap = space.substr(0, 10)
    }

    return serializeProperty('', {'': value})

    function serializeProperty (key: string, holder: object): string {
        let value: string = holder[key]
        if (value != null) {
            if (typeof value.toJSON5 === 'function') {
                value = value.toJSON5(key)
            } else if (typeof value.toJSON === 'function') {
                value = value.toJSON(key)
            }
        }

        if (replacerFunc) {
            value = replacerFunc.call(holder, key, value)
        }

        if (value instanceof Number) {
            value = Number(value)
        } else if (value instanceof String) {
            value = String(value)
        } else if (value instanceof Boolean) {
            value = value.valueOf()
        }

        switch (value) {
        case null: return 'null'
        case true: return 'true'
        case false: return 'false'
        }

        if (typeof value === 'string') {
            return quoteString(value, false)
        }

        if (typeof value === 'number') {
            return String(value)
        }

        if (typeof value === 'object') {
            return Array.isArray(value) ? serializeArray(value) : serializeObject(value)
        }

        return undefined
    }

    function quoteString (value: any[]): string {
        const quotes: object = {
            "'": 0.1,
            '"': 0.2,
        }

        const replacements: object = {
            "'": "\\'",
            '"': '\\"',
            '\\': '\\\\',
            '\b': '\\b',
            '\f': '\\f',
            '\n': '\\n',
            '\r': '\\r',
            '\t': '\\t',
            '\v': '\\v',
            '\0': '\\0',
            '\u2028': '\\u2028',
            '\u2029': '\\u2029',
        }

        let product: string = ''

        for (let i = 0; i < value.length; i++) {
            const c: string = value[i]
            switch (c) {
            case "'":
            case '"':
                quotes[c]++
                product += c
                continue

            case '\0':
                if (util.isDigit(value[i + 1])) {
                    product += '\\x00'
                    continue
                }
            }

            if (replacements[c]) {
                product += replacements[c]
                continue
            }

            if (c < ' ') {
                let hexString: string = c.charCodeAt(0).toString(16)
                product += '\\x' + ('00' + hexString).substring(hexString.length)
                continue
            }

            product += c
        }

        const quoteChar: number = quote || Object.keys(quotes).reduce((a: string, b: number) => (quotes[a] < quotes[b]) ? a : b)

        product = product.replace(new RegExp(quoteChar, 'g'), replacements[quoteChar])

        return quoteChar + product + quoteChar
    }

    function serializeObject (value: string): string {
        if (stack.indexOf(value) >= 0) {
            throw TypeError('Converting circular structure to JSON5')
        }

        stack.push(value)

        let stepback: number = indent
        indent = indent + gap

        let keys: any[] = propertyList || Object.keys(value)
        let partial: any[] = []
        for (const key of keys) {
            const propertyString: number = serializeProperty(key, value)
            if (propertyString !== undefined) {
                let member: string = serializeKey(key) + ':'
                if (gap !== '') {
                    member += ' '
                }
                member += propertyString
                partial.push(member)
            }
        }

        let final: string
        if (partial.length === 0) {
            final = '{}'
        } else {
            let properties: string
            if (gap === '') {
                properties = partial.join(',')
                final = '{' + properties + '}'
            } else {
                let separator: string = ',\n' + indent
                properties = partial.join(separator)
                final = '{\n' + indent + properties + ',\n' + stepback + '}'
            }
        }

        stack.pop()
        indent = stepback
        return final
    }

    function serializeKey (key: string): any[] {
        if (key.length === 0) {
            return quoteString(key, true)
        }

        const firstChar: any[] = String.fromCodePoint(key.codePointAt(0))
        if (!util.isIdStartChar(firstChar)) {
            return quoteString(key, true)
        }

        for (let i = firstChar.length; i < key.length; i++) {
            if (!util.isIdContinueChar(String.fromCodePoint(key.codePointAt(i)))) {
                return quoteString(key, true)
            }
        }

        return key
    }

    function serializeArray (value: string): string {
        if (stack.indexOf(value) >= 0) {
            throw TypeError('Converting circular structure to JSON5')
        }

        stack.push(value)

        let stepback: number = indent
        indent = indent + gap

        let partial: any[] = []
        for (let i = 0; i < value.length; i++) {
            const propertyString: string = serializeProperty(String(i), value)
            partial.push((propertyString !== undefined) ? propertyString : 'null')
        }

        let final: string
        if (partial.length === 0) {
            final = '[]'
        } else {
            if (gap === '') {
                let properties: string = partial.join(',')
                final = '[' + properties + ']'
            } else {
                let separator: string = ',\n' + indent
                let properties: string = partial.join(separator)
                final = '[\n' + indent + properties + ',\n' + stepback + ']'
            }
        }

        stack.pop()
        indent = stepback
        return final
    }
}
