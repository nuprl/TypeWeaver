var isValidSemver: any = require('semver/functions/valid')
var cleanSemver: any = require('semver/functions/clean')
var validateLicense: any = require('validate-npm-package-license')
var hostedGitInfo: any = require('hosted-git-info')
var isBuiltinModule: any = require('is-core-module')
var depTypes: string[] = ['dependencies', 'devDependencies', 'optionalDependencies']
var extractDescription: any = require('./extract_description')
var url: any = require('url')
var typos: any = require('./typos.json')

var isEmail: boolean = (str: string) => str.includes('@') && (str.indexOf('@') < str.lastIndexOf('.'))

module.exports = {
  // default warning function
  warn: function () {},

  fixRepositoryField: function (data: any) {
    if (data.repositories) {
      this.warn('repositories')
      data.repository = data.repositories[0]
    }
    if (!data.repository) {
      return this.warn('missingRepository')
    }
    if (typeof data.repository === 'string') {
      data.repository = {
        type: 'git',
        url: data.repository,
      }
    }
    var r: any = data.repository.url || ''
    if (r) {
      var hosted: any = hostedGitInfo.fromUrl(r)
      if (hosted) {
        r = data.repository.url
          = hosted.getDefaultRepresentation() === 'shortcut' ? hosted.https() : hosted.toString()
      }
    }

    if (r.match(/github.com\/[^/]+\/[^/]+\.git\.git$/)) {
      this.warn('brokenGitUrl', r)
    }
  },

  fixTypos: function (data: any) {
    Object.keys(typos.topLevel).forEach(function (d: any) {
      if (Object.prototype.hasOwnProperty.call(data, d)) {
        this.warn('typo', d, typos.topLevel[d])
      }
    }, this)
  },

  fixScriptsField: function (data: any) {
    if (!data.scripts) {
      return
    }
    if (typeof data.scripts !== 'object') {
      this.warn('nonObjectScripts')
      delete data.scripts
      return
    }
    Object.keys(data.scripts).forEach(function (k: string) {
      if (typeof data.scripts[k] !== 'string') {
        this.warn('nonStringScript')
        delete data.scripts[k]
      } else if (typos.script[k] && !data.scripts[typos.script[k]]) {
        this.warn('typo', k, typos.script[k], 'scripts')
      }
    }, this)
  },

  fixFilesField: function (data: any) {
    var files: any = data.files
    if (files && !Array.isArray(files)) {
      this.warn('nonArrayFiles')
      delete data.files
    } else if (data.files) {
      data.files = data.files.filter(function (file: any) {
        if (!file || typeof file !== 'string') {
          this.warn('invalidFilename', file)
          return false
        } else {
          return true
        }
      }, this)
    }
  },

  fixBinField: function (data: any) {
    if (!data.bin) {
      return
    }
    if (typeof data.bin === 'string') {
      var b: {} = {}
      var match: any
      if (match = data.name.match(/^@[^/]+[/](.*)$/)) {
        b[match[1]] = data.bin
      } else {
        b[data.name] = data.bin
      }
      data.bin = b
    }
  },

  fixManField: function (data: any) {
    if (!data.man) {
      return
    }
    if (typeof data.man === 'string') {
      data.man = [data.man]
    }
  },
  fixBundleDependenciesField: function (data: any) {
    var bdd: string = 'bundledDependencies'
    var bd: IBoard = 'bundleDependencies'
    if (data[bdd] && !data[bd]) {
      data[bd] = data[bdd]
      delete data[bdd]
    }
    if (data[bd] && !Array.isArray(data[bd])) {
      this.warn('nonArrayBundleDependencies')
      delete data[bd]
    } else if (data[bd]) {
      data[bd] = data[bd].filter(function (filtered: any) {
        if (!filtered || typeof filtered !== 'string') {
          this.warn('nonStringBundleDependency', filtered)
          return false
        } else {
          if (!data.dependencies) {
            data.dependencies = {}
          }
          if (!Object.prototype.hasOwnProperty.call(data.dependencies, filtered)) {
            this.warn('nonDependencyBundleDependency', filtered)
            data.dependencies[filtered] = '*'
          }
          return true
        }
      }, this)
    }
  },

  fixDependencies: function (data: any, strict: boolean) {
    objectifyDeps(data, this.warn)
    addOptionalDepsToDeps(data, this.warn)
    this.fixBundleDependenciesField(data)

    ;['dependencies', 'devDependencies'].forEach(function (deps: any) {
      if (!(deps in data)) {
        return
      }
      if (!data[deps] || typeof data[deps] !== 'object') {
        this.warn('nonObjectDependencies', deps)
        delete data[deps]
        return
      }
      Object.keys(data[deps]).forEach(function (d: any) {
        var r: any = data[deps][d]
        if (typeof r !== 'string') {
          this.warn('nonStringDependency', d, JSON.stringify(r))
          delete data[deps][d]
        }
        var hosted: any = hostedGitInfo.fromUrl(data[deps][d])
        if (hosted) {
          data[deps][d] = hosted.toString()
        }
      }, this)
    }, this)
  },

  fixModulesField: function (data: any) {
    if (data.modules) {
      this.warn('deprecatedModules')
      delete data.modules
    }
  },

  fixKeywordsField: function (data: any) {
    if (typeof data.keywords === 'string') {
      data.keywords = data.keywords.split(/,\s+/)
    }
    if (data.keywords && !Array.isArray(data.keywords)) {
      delete data.keywords
      this.warn('nonArrayKeywords')
    } else if (data.keywords) {
      data.keywords = data.keywords.filter(function (kw: any) {
        if (typeof kw !== 'string' || !kw) {
          this.warn('nonStringKeyword')
          return false
        } else {
          return true
        }
      }, this)
    }
  },

  fixVersionField: function (data: any, strict: boolean) {
    // allow "loose" semver 1.0 versions in non-strict mode
    // enforce strict semver 2.0 compliance in strict mode
    var loose: boolean = !strict
    if (!data.version) {
      data.version = ''
      return true
    }
    if (!isValidSemver(data.version, loose)) {
      throw new Error('Invalid version: "' + data.version + '"')
    }
    data.version = cleanSemver(data.version, loose)
    return true
  },

  fixPeople: function (data: any) {
    modifyPeople(data, unParsePerson)
    modifyPeople(data, parsePerson)
  },

  fixNameField: function (data: any, options: any) {
    if (typeof options === 'boolean') {
      options = { strict: options }
    } else if (typeof options === 'undefined') {
      options = {}
    }
    var strict: boolean = options.strict
    if (!data.name && !strict) {
      data.name = ''
      return
    }
    if (typeof data.name !== 'string') {
      throw new Error('name field must be a string.')
    }
    if (!strict) {
      data.name = data.name.trim()
    }
    ensureValidName(data.name, strict, options.allowLegacyCase)
    if (isBuiltinModule(data.name)) {
      this.warn('conflictingName', data.name)
    }
  },

  fixDescriptionField: function (data: any) {
    if (data.description && typeof data.description !== 'string') {
      this.warn('nonStringDescription')
      delete data.description
    }
    if (data.readme && !data.description) {
      data.description = extractDescription(data.readme)
    }
    if (data.description === undefined) {
      delete data.description
    }
    if (!data.description) {
      this.warn('missingDescription')
    }
  },

  fixReadmeField: function (data: any) {
    if (!data.readme) {
      this.warn('missingReadme')
      data.readme = 'ERROR: No README data found!'
    }
  },

  fixBugsField: function (data: any) {
    if (!data.bugs && data.repository && data.repository.url) {
      var hosted: any = hostedGitInfo.fromUrl(data.repository.url)
      if (hosted && hosted.bugs()) {
        data.bugs = { url: hosted.bugs() }
      }
    } else if (data.bugs) {
      if (typeof data.bugs === 'string') {
        if (isEmail(data.bugs)) {
          data.bugs = { email: data.bugs }
        /* eslint-disable-next-line node/no-deprecated-api */
        } else if (url.parse(data.bugs).protocol) {
          data.bugs = { url: data.bugs }
        } else {
          this.warn('nonEmailUrlBugsString')
        }
      } else {
        bugsTypos(data.bugs, this.warn)
        var oldBugs: any = data.bugs
        data.bugs = {}
        if (oldBugs.url) {
          /* eslint-disable-next-line node/no-deprecated-api */
          if (typeof (oldBugs.url) === 'string' && url.parse(oldBugs.url).protocol) {
            data.bugs.url = oldBugs.url
          } else {
            this.warn('nonUrlBugsUrlField')
          }
        }
        if (oldBugs.email) {
          if (typeof (oldBugs.email) === 'string' && isEmail(oldBugs.email)) {
            data.bugs.email = oldBugs.email
          } else {
            this.warn('nonEmailBugsEmailField')
          }
        }
      }
      if (!data.bugs.email && !data.bugs.url) {
        delete data.bugs
        this.warn('emptyNormalizedBugs')
      }
    }
  },

  fixHomepageField: function (data: any) {
    if (!data.homepage && data.repository && data.repository.url) {
      var hosted: any = hostedGitInfo.fromUrl(data.repository.url)
      if (hosted && hosted.docs()) {
        data.homepage = hosted.docs()
      }
    }
    if (!data.homepage) {
      return
    }

    if (typeof data.homepage !== 'string') {
      this.warn('nonUrlHomepage')
      return delete data.homepage
    }
    /* eslint-disable-next-line node/no-deprecated-api */
    if (!url.parse(data.homepage).protocol) {
      data.homepage = 'http://' + data.homepage
    }
  },

  fixLicenseField: function (data: any) {
    const license: any = data.license || data.licence
    if (!license) {
      return this.warn('missingLicense')
    }
    if (
      typeof (license) !== 'string' ||
      license.length < 1 ||
      license.trim() === ''
    ) {
      return this.warn('invalidLicense')
    }
    if (!validateLicense(license).validForNewPackages) {
      return this.warn('invalidLicense')
    }
  },
}

function isValidScopedPackageName (spec: any): any {
  if (spec.charAt(0) !== '@') {
    return false
  }

  var rest: string[] = spec.slice(1).split('/')
  if (rest.length !== 2) {
    return false
  }

  return rest[0] && rest[1] &&
    rest[0] === encodeURIComponent(rest[0]) &&
    rest[1] === encodeURIComponent(rest[1])
}

function isCorrectlyEncodedName (spec: any): any {
  return !spec.match(/[/@\s+%:]/) &&
    spec === encodeURIComponent(spec)
}

function ensureValidName (name: string, strict: boolean, allowLegacyCase: any): void {
  if (name.charAt(0) === '.' ||
      !(isValidScopedPackageName(name) || isCorrectlyEncodedName(name)) ||
      (strict && (!allowLegacyCase) && name !== name.toLowerCase()) ||
      name.toLowerCase() === 'node_modules' ||
      name.toLowerCase() === 'favicon.ico') {
    throw new Error('Invalid name: ' + JSON.stringify(name))
  }
}

function modifyPeople (data: any, fn: any): void {
  if (data.author) {
    data.author = fn(data.author)
  }['maintainers', 'contributors'].forEach(function (set) {
    if (!Array.isArray(data[set])) {
      return
    }
    data[set] = data[set].map(fn)
  })
  return data
}

function unParsePerson (person: any): any {
  if (typeof person === 'string') {
    return person
  }
  var name: any = person.name || ''
  var u: any = person.url || person.web
  var wrappedUrl: string = u ? (' (' + u + ')') : ''
  var e: string = person.email || person.mail
  var wrappedEmail: string = e ? (' <' + e + '>') : ''
  return name + wrappedEmail + wrappedUrl
}

function parsePerson (person: any): any {
  if (typeof person !== 'string') {
    return person
  }
  var matchedName: any = person.match(/^([^(<]+)/)
  var matchedUrl: any = person.match(/\(([^()]+)\)/)
  var matchedEmail: any = person.match(/<([^<>]+)>/)
  var obj: any = {}
  if (matchedName && matchedName[0].trim()) {
    obj.name = matchedName[0].trim()
  }
  if (matchedEmail) {
    obj.email = matchedEmail[1]
  }
  if (matchedUrl) {
    obj.url = matchedUrl[1]
  }
  return obj
}

function addOptionalDepsToDeps (data: any, warn: any): any {
  var o: any = data.optionalDependencies
  if (!o) {
    return
  }
  var d: any = data.dependencies || {}
  Object.keys(o).forEach(function (k: string) {
    d[k] = o[k]
  })
  data.dependencies = d
}

function depObjectify (deps: any[], type, warn: any): any {
  if (!deps) {
    return {}
  }
  if (typeof deps === 'string') {
    deps = deps.trim().split(/[\n\r\s\t ,]+/)
  }
  if (!Array.isArray(deps)) {
    return deps
  }
  warn('deprecatedArrayDependencies', type)
  var o: any = {}
  deps.filter(function (d: any) {
    return typeof d === 'string'
  }).forEach(function (d: any) {
    d = d.trim().split(/(:?[@\s><=])/)
    var dn: any = d.shift()
    var dv: string = d.join('')
    dv = dv.trim()
    dv = dv.replace(/^@/, '')
    o[dn] = dv
  })
  return o
}

function objectifyDeps (data: any, warn: any): void {
  depTypes.forEach(function (type) {
    if (!data[type]) {
      return
    }
    data[type] = depObjectify(data[type], type, warn)
  })
}

function bugsTypos (bugs: any, warn: any): void {
  if (!bugs) {
    return
  }
  Object.keys(bugs).forEach(function (k: string) {
    if (typos.bugs[k]) {
      warn('typo', k, typos.bugs[k], 'bugs')
      bugs[typos.bugs[k]] = bugs[k]
      delete bugs[k]
    }
  })
}
