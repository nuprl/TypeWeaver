import util from './util';

export default function stringify (value: String, replacer: Object, space: Number): String {
    const stack: Array = []
    let indent: String = ''
    let propertyList: Array
    let replacerFunc: Function
    let gap: String = ''
    let quote: String

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
            let item: String

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

    function serializeProperty (key: String, holder: Object): String {
        let value: String = holder[key]
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

    function quoteString (value: Array): String {
        const quotes: Object = {
            "'": 0.1,
            '"': 0.2,
        }

        const replacements: Object = {
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

        let product: String = ''

        for (let i = 0; i < value.length; i++) {
            const c: String = value[i]
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
                let hexString: String = c.charCodeAt(0).toString(16)
                product += '\\x' + ('00' + hexString).substring(hexString.length)
                continue
            }

            product += c
        }

        const quoteChar: Number = quote || Object.keys(quotes).reduce((a: String, b: Number) => (quotes[a] < quotes[b]) ? a : b)

        product = product.replace(new RegExp(quoteChar, 'g'), replacements[quoteChar])

        return quoteChar + product + quoteChar
    }

    function serializeObject (value: String): String {
        if (stack.indexOf(value) >= 0) {
            throw TypeError('Converting circular structure to JSON5')
        }

        stack.push(value)

        let stepback: Number = indent
        indent = indent + gap

        let keys: Array = propertyList || Object.keys(value)
        let partial: Array = []
        for (const key of keys) {
            const propertyString: Number = serializeProperty(key, value)
            if (propertyString !== undefined) {
                let member: String = serializeKey(key) + ':'
                if (gap !== '') {
                    member += ' '
                }
                member += propertyString
                partial.push(member)
            }
        }

        let final: String
        if (partial.length === 0) {
            final = '{}'
        } else {
            let properties: String
            if (gap === '') {
                properties = partial.join(',')
                final = '{' + properties + '}'
            } else {
                let separator: String = ',\n' + indent
                properties = partial.join(separator)
                final = '{\n' + indent + properties + ',\n' + stepback + '}'
            }
        }

        stack.pop()
        indent = stepback
        return final
    }

    function serializeKey (key: String): Array {
        if (key.length === 0) {
            return quoteString(key, true)
        }

        const firstChar: Array = String.fromCodePoint(key.codePointAt(0))
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

    function serializeArray (value: String): String {
        if (stack.indexOf(value) >= 0) {
            throw TypeError('Converting circular structure to JSON5')
        }

        stack.push(value)

        let stepback: Number = indent
        indent = indent + gap

        let partial: Array = []
        for (let i = 0; i < value.length; i++) {
            const propertyString: String = serializeProperty(String(i), value)
            partial.push((propertyString !== undefined) ? propertyString : 'null')
        }

        let final: String
        if (partial.length === 0) {
            final = '[]'
        } else {
            if (gap === '') {
                let properties: String = partial.join(',')
                final = '[' + properties + ']'
            } else {
                let separator: String = ',\n' + indent
                let properties: String = partial.join(separator)
                final = '[\n' + indent + properties + ',\n' + stepback + ']'
            }
        }

        stack.pop()
        indent = stepback
        return final
    }
};
