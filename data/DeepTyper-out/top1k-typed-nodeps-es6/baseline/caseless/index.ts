function Caseless (dict: string[]): void {
  this.dict = dict || {}
}
Caseless.prototype.set = function (name: string, value: any, clobber: any) {
  if (typeof name === 'object') {
    for (var i in name) {
      this.set(i, name[i], value)
    }
  } else {
    if (typeof clobber === 'undefined') clobber = true
    var has: boolean = this.has(name)

    if (!clobber && has) this.dict[has] = this.dict[has] + ',' + value
    else this.dict[has || name] = value
    return has
  }
}
Caseless.prototype.has = function (name: string) {
  var keys: string[] = Object.keys(this.dict)
    , name = name.toLowerCase()
    ;
  for (var i=0;i<keys.length;i++) {
    if (keys[i].toLowerCase() === name) return keys[i]
  }
  return false
}
Caseless.prototype.get = function (name: string) {
  name = name.toLowerCase()
  var result: any, _key
  var headers: any = this.dict
  Object.keys(headers).forEach(function (key: string) {
    _key = key.toLowerCase()
    if (name === _key) result = headers[key]
  })
  return result
}
Caseless.prototype.swap = function (name: string) {
  var has: boolean = this.has(name)
  if (has === name) return
  if (!has) throw new Error('There is no header than matches "'+name+'"')
  this.dict[name] = this.dict[has]
  delete this.dict[has]
}
Caseless.prototype.del = function (name: string) {
  name = String(name).toLowerCase()
  var deleted: boolean = false
  var changed: number = 0
  var dict: string[] = this.dict
  Object.keys(this.dict).forEach(function(key: string) {
    if (name === String(key).toLowerCase()) {
      deleted = delete dict[key]
      changed += 1
    }
  })
  return changed === 0 ? true : deleted
}

export default function (dict): string[] {return new Caseless(dict)};

export const httpify: boolean = function (resp: any, headers: any) {
  var c: any = new Caseless(headers)
  resp.setHeader = function (key: string, value: any, clobber: boolean) {
    if (typeof value === 'undefined') return
    return c.set(key, value, clobber)
  }
  resp.hasHeader = function (key: string) {
    return c.has(key)
  }
  resp.getHeader = function (key: string) {
    return c.get(key)
  }
  resp.removeHeader = function (key: string) {
    return c.del(key)
  }
  resp.headers = c.dict
  return c
};
