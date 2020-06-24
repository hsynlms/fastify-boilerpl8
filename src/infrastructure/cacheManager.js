'use strict'

// import required modules
import NodeCache from 'node-cache'

// model registrar function
const cacheManager = async () => {
  // create a node cache instance
  const cache = new NodeCache({ useClones: false })

  // declaration of cache dropper
  const dropCache = (key) => {
    // validations
    if (typeof key !== 'string') {
      throw Error('Cache key must be in type of: string')
    }

    // delete/remove/drop the cache
    return cache.del(key)
  }

  // declaration of cache checker
  const hasCache = (key) => {
    // validations
    if (typeof key !== 'string') {
      throw Error('Cache key must be in type of: string')
    }

    // check for the cache
    return cache.has(key)
  }

  // declaration of cache flusher
  const flushCache = () => cache.flushAll()

  // declaration of cache setter
  const setCache = async (key, data, ttl = 600) => {
    // definition of cache success
    let isCached = false

    // validations
    if (typeof key !== 'string') {
      throw Error('Cache key must be in type of: string')
    } else if (typeof data === 'undefined') {
      throw Error('Cache data cannot be in type of: undefined')
    } else if (typeof ttl !== 'number') {
      throw Error('Cache TTL must be in type of: number')
    } else {
      // try to store the data in cache
      isCached = cache.set(key, data, ttl)
    }

    // return the cache success result
    return isCached
  }

  // declaration of cache getter
  const getCache = async (key, ttl = 600, callback) => {
    // validations
    if (typeof key !== 'string') {
      throw Error('Cache key must be in type of: string')
    }

    // try to get the cached data
    let cachedData = cache.get(key)

    // if the key is not found in cache and callback function is provided
    // store the returned data from the callback function in cache
    if (typeof cacheData === 'undefined' && callback) {
      // validations
      if (typeof callback !== 'function') {
        throw Error('Cache callback which returns the data will be cached must be in type of: function')
      } else {
        // run the callback function to get the cache data
        const data = await callback()

        // store the data in cache
        await setCache(key, data, ttl)

        // reset the cached data variable
        cachedData = data
      }
    }

    // return the cached data
    return cachedData
  }

  // return cache manger object
  return {
    get: getCache,
    set: setCache,
    flush: flushCache,
    drop: dropCache,
    has: hasCache
  }
}

// export cache manager function
export default cacheManager
