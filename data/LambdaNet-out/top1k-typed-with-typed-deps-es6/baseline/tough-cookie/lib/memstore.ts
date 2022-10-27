/*!
 * Copyright (c) 2015, Salesforce.com, Inc.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice,
 * this list of conditions and the following disclaimer.
 *
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 * this list of conditions and the following disclaimer in the documentation
 * and/or other materials provided with the distribution.
 *
 * 3. Neither the name of Salesforce.com nor the names of its contributors may
 * be used to endorse or promote products derived from this software without
 * specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */
"use strict";
import { fromCallback } from 'universalify';
import { Store } from './store';
import { permuteDomain } from './permuteDomain';
import { pathMatch } from './pathMatch';
import { getCustomInspectSymbol, getUtilInspect } from './utilHelper';

class MemoryCookieStore extends Store {
  constructor() {
    super();
    this.synchronous = true;
    this.idx = {};
    const customInspectSymbol: Boolean = getCustomInspectSymbol();
    if (customInspectSymbol) {
      this[customInspectSymbol] = this.inspect;
    }
  }

  inspect() {
    const util: Object = { inspect: getUtilInspect(inspectFallback) };
    return `{ idx: ${util.inspect(this.idx, false, 2)} }`;
  }

  findCookie(domain, path, key, cb) {
    if (!this.idx[domain]) {
      return cb(null, undefined);
    }
    if (!this.idx[domain][path]) {
      return cb(null, undefined);
    }
    return cb(null, this.idx[domain][path][key] || null);
  }
  findCookies(domain, path, allowSpecialUseDomain, cb) {
    const results: Array = [];
    if (typeof allowSpecialUseDomain === "function") {
      cb = allowSpecialUseDomain;
      allowSpecialUseDomain = true;
    }
    if (!domain) {
      return cb(null, []);
    }

    let pathMatcher: Function;
    if (!path) {
      // null means "all paths"
      pathMatcher = function matchAll(domainIndex: Function): Void {
        for (const curPath in domainIndex) {
          const pathIndex: Function = domainIndex[curPath];
          for (const key in pathIndex) {
            results.push(pathIndex[key]);
          }
        }
      };
    } else {
      pathMatcher = function matchRFC(domainIndex: Function): Void {
        //NOTE: we should use path-match algorithm from S5.1.4 here
        //(see : https://github.com/ChromiumWebApps/chromium/blob/b3d3b4da8bb94c1b2e061600df106d590fda3620/net/cookies/canonical_cookie.cc#L299)
        Object.keys(domainIndex).forEach((cookiePath: String) => {
          if (pathMatch(path, cookiePath)) {
            const pathIndex: Function = domainIndex[cookiePath];
            for (const key in pathIndex) {
              results.push(pathIndex[key]);
            }
          }
        });
      };
    }

    const domains: Array = permuteDomain(domain, allowSpecialUseDomain) || [domain];
    const idx: Object = this.idx;
    domains.forEach((curDomain: String) => {
      const domainIndex: String = idx[curDomain];
      if (!domainIndex) {
        return;
      }
      pathMatcher(domainIndex);
    });

    cb(null, results);
  }

  putCookie(cookie, cb) {
    if (!this.idx[cookie.domain]) {
      this.idx[cookie.domain] = {};
    }
    if (!this.idx[cookie.domain][cookie.path]) {
      this.idx[cookie.domain][cookie.path] = {};
    }
    this.idx[cookie.domain][cookie.path][cookie.key] = cookie;
    cb(null);
  }
  updateCookie(oldCookie, newCookie, cb) {
    // updateCookie() may avoid updating cookies that are identical.  For example,
    // lastAccessed may not be important to some stores and an equality
    // comparison could exclude that field.
    this.putCookie(newCookie, cb);
  }
  removeCookie(domain, path, key, cb) {
    if (
      this.idx[domain] &&
      this.idx[domain][path] &&
      this.idx[domain][path][key]
    ) {
      delete this.idx[domain][path][key];
    }
    cb(null);
  }
  removeCookies(domain, path, cb) {
    if (this.idx[domain]) {
      if (path) {
        delete this.idx[domain][path];
      } else {
        delete this.idx[domain];
      }
    }
    return cb(null);
  }
  removeAllCookies(cb) {
    this.idx = {};
    return cb(null);
  }
  getAllCookies(cb) {
    const cookies: Array = [];
    const idx: Object = this.idx;

    const domains: Array = Object.keys(idx);
    domains.forEach((domain: String) => {
      const paths: Array = Object.keys(idx[domain]);
      paths.forEach((path: String) => {
        const keys: Array = Object.keys(idx[domain][path]);
        keys.forEach((key: String) => {
          if (key !== null) {
            cookies.push(idx[domain][path][key]);
          }
        });
      });
    });

    // Sort by creationIndex so deserializing retains the creation order.
    // When implementing your own store, this SHOULD retain the order too
    cookies.sort((a: Object, b: Object) => {
      return (a.creationIndex || 0) - (b.creationIndex || 0);
    });

    cb(null, cookies);
  }
}

[
  "findCookie",
  "findCookies",
  "putCookie",
  "updateCookie",
  "removeCookie",
  "removeCookies",
  "removeAllCookies",
  "getAllCookies"
].forEach((name: String) => {
  MemoryCookieStore.prototype[name] = fromCallback(
    MemoryCookieStore.prototype[name]
  );
});

exports.MemoryCookieStore = MemoryCookieStore;

function inspectFallback(val: Object): String {
  const domains: Array = Object.keys(val);
  if (domains.length === 0) {
    return "{}";
  }
  let result: String = "{\n";
  Object.keys(val).forEach((domain: String, i: String) => {
    result += formatDomain(domain, val[domain]);
    if (i < domains.length - 1) {
      result += ",";
    }
    result += "\n";
  });
  result += "}";
  return result;
}

function formatDomain(domainName: String, domainValue: Function): String {
  const indent: String = "  ";
  let result: String = `${indent}'${domainName}': {\n`;
  Object.keys(domainValue).forEach((path: String, i: String, paths: Array) => {
    result += formatPath(path, domainValue[path]);
    if (i < paths.length - 1) {
      result += ",";
    }
    result += "\n";
  });
  result += `${indent}}`;
  return result;
}

function formatPath(pathName: String, pathValue: Function): String {
  const indent: String = "    ";
  let result: String = `${indent}'${pathName}': {\n`;
  Object.keys(pathValue).forEach((cookieName: String, i: String, cookieNames: String) => {
    const cookie: Cookie = pathValue[cookieName];
    result += `      ${cookieName}: ${cookie.inspect()}`;
    if (i < cookieNames.length - 1) {
      result += ",";
    }
    result += "\n";
  });
  result += `${indent}}`;
  return result;
}

exports.inspectFallback = inspectFallback;
