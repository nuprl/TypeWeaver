import balanced from 'balanced-match';

const escSlash: string = '\0SLASH'+Math.random()+'\0';
const escOpen: string = '\0OPEN'+Math.random()+'\0';
const escClose: string = '\0CLOSE'+Math.random()+'\0';
const escComma: string = '\0COMMA'+Math.random()+'\0';
const escPeriod: string = '\0PERIOD'+Math.random()+'\0';

/**
 * @return {number}
 */
function numeric(str: string): number {
  return parseInt(str, 10) == str
    ? parseInt(str, 10)
    : str.charCodeAt(0);
}

/**
 * @param {string} str
 */
function escapeBraces(str: string): string {
  return str.split('\\\\').join(escSlash)
            .split('\\{').join(escOpen)
            .split('\\}').join(escClose)
            .split('\\,').join(escComma)
            .split('\\.').join(escPeriod);
}

/**
 * @param {string} str
 */
function unescapeBraces(str: string): string {
  return str.split(escSlash).join('\\')
            .split(escOpen).join('{')
            .split(escClose).join('}')
            .split(escComma).join(',')
            .split(escPeriod).join('.');
}

/**
 * Basically just str.split(","), but handling cases
 * where we have nested braced sections, which should be
 * treated as individual members, like {a,{b,c},d}
 * @param {string} str
 */
function parseCommaParts(str: string): any[] {
  if (!str)
    return [''];

  const parts: any[] = [];
  const m: HTMLElement = balanced('{', '}', str);

  if (!m)
    return str.split(',');

  const {pre, body, post} = m;
  const p: any[] = pre.split(',');

  p[p.length-1] += '{' + body + '}';
  const postParts: any[] = parseCommaParts(post);
  if (post.length) {
    p[p.length-1] += postParts.shift();
    p.push.apply(p, postParts);
  }

  parts.push.apply(parts, p);

  return parts;
}

/**
 * @param {string} str
 */
function expandTop(str: string): any[] {
  if (!str)
    return [];

  // I don't know why Bash 4.3 does this, but it does.
  // Anything starting with {} will have the first two bytes preserved
  // but *only* at the top level, so {},a}b will not expand to anything,
  // but a{},b}c will be expanded to [a}c,abc].
  // One could argue that this is a bug in Bash, but since the goal of
  // this module is to match Bash's rules, we escape a leading {}
  if (str.slice(0, 2) === '{}') {
    str = '\\{\\}' + str.slice(2);
  }

  return expand(escapeBraces(str), true).map(unescapeBraces);
}

/**
 * @param {string} str
 */
function embrace(str: string): string {
  return '{' + str + '}';
}

/**
 * @param {string} el
 */
function isPadded(el: string): boolean {
  return /^-?0\d/.test(el);
}

/**
 * @param {number} i
 * @param {number} y
 */
function lte(i: number, y: number): boolean {
  return i <= y;
}

/**
 * @param {number} i
 * @param {number} y
 */
function gte(i: number, y: number): boolean {
  return i >= y;
}

/**
 * @param {string} str
 * @param {boolean} [isTop]
 */
function expand(str: number, isTop: boolean): any[] {
  /** @type {string[]} */
  const expansions: any[] = [];

  const m: HTMLElement = balanced('{', '}', str);
  if (!m) return [str];

  // no need to expand pre, since it is guaranteed to be free of brace-sets
  const pre: number = m.pre;
  const post: any[] = m.post.length
    ? expand(m.post, false)
    : [''];

  if (/\$$/.test(m.pre)) {
    for (let k = 0; k < post.length; k++) {
      const expansion: string = pre+ '{' + m.body + '}' + post[k];
      expansions.push(expansion);
    }
  } else {
    const isNumericSequence: boolean = /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(m.body);
    const isAlphaSequence: boolean = /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(m.body);
    const isSequence: boolean = isNumericSequence || isAlphaSequence;
    const isOptions: boolean = m.body.indexOf(',') >= 0;
    if (!isSequence && !isOptions) {
      // {a},b}
      if (m.post.match(/,.*\}/)) {
        str = m.pre + '{' + m.body + escClose + m.post;
        return expand(str);
      }
      return [str];
    }

    let n: any[];
    if (isSequence) {
      n = m.body.split(/\.\./);
    } else {
      n = parseCommaParts(m.body);
      if (n.length === 1) {
        // x{{a,b}}y ==> x{a}y x{b}y
        n = expand(n[0], false).map(embrace);
        if (n.length === 1) {
          return post.map(function(p: string) {
            return m.pre + n[0] + p;
          });
        }
      }
    }

    // at this point, n is the parts, and we know it's not a comma set
    // with a single entry.
    let N: any[];

    if (isSequence) {
      const x: string = numeric(n[0]);
      const y: string = numeric(n[1]);
      const width: number = Math.max(n[0].length, n[1].length)
      let incr: number = n.length == 3
        ? Math.abs(numeric(n[2]))
        : 1;
      let test: Function = lte;
      const reverse: boolean = y < x;
      if (reverse) {
        incr *= -1;
        test = gte;
      }
      const pad: boolean = n.some(isPadded);

      N = [];

      for (let i = x; test(i, y); i += incr) {
        let c: string;
        if (isAlphaSequence) {
          c = String.fromCharCode(i);
          if (c === '\\')
            c = '';
        } else {
          c = String(i);
          if (pad) {
            const need: number = width - c.length;
            if (need > 0) {
              const z: string = new Array(need + 1).join('0');
              if (i < 0)
                c = '-' + z + c.slice(1);
              else
                c = z + c;
            }
          }
        }
        N.push(c);
      }
    } else {
      N = [];

      for (let j = 0; j < n.length; j++) {
        N.push.apply(N, expand(n[j], false));
      }
    }

    for (let j = 0; j < N.length; j++) {
      for (let k = 0; k < post.length; k++) {
        const expansion: string = pre + N[j] + post[k];
        if (!isTop || isSequence || expansion)
          expansions.push(expansion);
      }
    }
  }

  return expansions;
}

export default expandTop;
