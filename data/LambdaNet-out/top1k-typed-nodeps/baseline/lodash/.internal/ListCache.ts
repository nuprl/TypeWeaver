import assocIndexOf from './assocIndexOf.js'

class ListCache {

  /**
   * Creates an list cache object.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */
  constructor(entries) {
    let index: Number = -1
    const length: Number = entries == null ? 0 : entries.length

    this.clear()
    while (++index < length) {
      const entry: Object = entries[index]
      this.set(entry[0], entry[1])
    }
  }

  /**
   * Removes all key-value entries from the list cache.
   *
   * @memberOf ListCache
   */
  clear() {
    this.__data__ = []
    this.size = 0
  }

  /**
   * Removes `key` and its value from the list cache.
   *
   * @memberOf ListCache
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */
  delete(key) {
    const data: Array = this.__data__
    const index: String = assocIndexOf(data, key)

    if (index < 0) {
      return false
    }
    const lastIndex: Number = data.length - 1
    if (index == lastIndex) {
      data.pop()
    } else {
      data.splice(index, 1)
    }
    --this.size
    return true
  }

  /**
   * Gets the list cache value for `key`.
   *
   * @memberOf ListCache
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */
  get(key) {
    const data: Object = this.__data__
    const index: String = assocIndexOf(data, key)
    return index < 0 ? undefined : data[index][1]
  }

  /**
   * Checks if a list cache value for `key` exists.
   *
   * @memberOf ListCache
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  has(key) {
    return assocIndexOf(this.__data__, key) > -1
  }

  /**
   * Sets the list cache `key` to `value`.
   *
   * @memberOf ListCache
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the list cache instance.
   */
  set(key, value) {
    const data: Array = this.__data__
    const index: String = assocIndexOf(data, key)

    if (index < 0) {
      ++this.size
      data.push([key, value])
    } else {
      data[index][1] = value
    }
    return this
  }
}

export default ListCache
