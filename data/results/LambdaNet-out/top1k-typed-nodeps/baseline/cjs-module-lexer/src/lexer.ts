let wasm: HTMLElement;

const isLE: boolean = new Uint8Array(new Uint16Array([1]).buffer)[0] === 1;

export function parse (source: string, name: string = '@'): object {
  if (!wasm)
    throw new Error('Not initialized');

  const len: number = source.length + 1;

  // need 2 bytes per code point plus analysis space so we double again
  const extraMem: number = (wasm.__heap_base.value || wasm.__heap_base) + len * 4 - wasm.memory.buffer.byteLength;
  if (extraMem > 0)
    wasm.memory.grow(Math.ceil(extraMem / 65536));
    
  const addr: string = wasm.sa(len);
  (isLE ? copyLE : copyBE)(source, new Uint16Array(wasm.memory.buffer, addr, len));

  if (!wasm.parseCJS(addr, source.length, 0, 0, 0))
    throw Object.assign(new Error(`Parse error ${name}${wasm.e()}:${source.slice(0, wasm.e()).split('\n').length}:${wasm.e() - source.lastIndexOf('\n', wasm.e() - 1)}`), { idx: wasm.e() });

  let exports: Error = new Set(), reexports: Error = new Set(), unsafeGetters: Error = new Set();
  
  while (wasm.rre()) {
    const reexptStr: string = decode(source.slice(wasm.res(), wasm.ree()));
    if (reexptStr)
      reexports.add(reexptStr);
  }
  while (wasm.ru())
    unsafeGetters.add(decode(source.slice(wasm.us(), wasm.ue())));
  while (wasm.re()) {
    let exptStr: string = decode(source.slice(wasm.es(), wasm.ee()));
    if (exptStr !== undefined && !unsafeGetters.has(exptStr))
      exports.add(exptStr);
  }

  return { exports: [...exports], reexports: [...reexports] };
}

function decode (str: object): object {
  if (str[0] === '"' || str[0] === '\'') {
    try {
      const decoded: string = (0, eval)(str);
      // Filter to exclude non-matching UTF-16 surrogate strings
      for (let i = 0; i < decoded.length; i++) {
        const surrogatePrefix: number = decoded.charCodeAt(i) & 0xFC00;
        if (surrogatePrefix < 0xD800) {
          // Not a surrogate
          continue;
        }
        else if (surrogatePrefix === 0xD800) {
          // Validate surrogate pair
          if ((decoded.charCodeAt(++i) & 0xFC00) !== 0xDC00)
            return;
        }
        else {
          // Out-of-range surrogate code (above 0xD800)
          return;
        }
      }
      return decoded;
    }
    catch {}
  }
  else {
    return str;
  }
}

function copyBE (src: string, outBuf16: object): void {
  const len: number = src.length;
  let i: number = 0;
  while (i < len) {
    const ch: number = src.charCodeAt(i);
    outBuf16[i++] = (ch & 0xff) << 8 | ch >>> 8;
  }
}

function copyLE (src: string, outBuf16: object): void {
  const len: number = src.length;
  let i: number = 0;
  while (i < len)
    outBuf16[i] = src.charCodeAt(i++);
}

let initPromise: Function;
export function init (): boolean {
  if (initPromise)
    return initPromise;
  return initPromise = (async () => {
    const compiled: string = await WebAssembly.compile(
      ((binary: string) => typeof window !== 'undefined' && typeof atob === 'function' ? Uint8Array.from(atob(binary), (x: string) => x.charCodeAt(0)) : Buffer.from(binary, 'base64'))
      ('WASM_BINARY')
    )
    const { exports } = await WebAssembly.instantiate(compiled);
    wasm = exports;
  })();
}
