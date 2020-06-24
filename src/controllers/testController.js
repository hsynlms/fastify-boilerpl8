'use strict'

// import required modules
import moment from 'moment'

// import required local modules
import constants from '../constants'
import helpers from '../helpers'

// controller function
const controller = (app, schemas, cache) => {
  // sets route prefix for all defined routes in the controller (optional)
  app.routePrefix = 'test'

  // controller methods

  // https://developer.mozilla.org/tr/docs/Web/JavaScript/Reference/Functions/Arrow_functions
  // do not use arrow functions as handler here due to it brings its own context
  // otherwise you cannot reach fastify instance in handlers by using this keyword

  app.get('/', { schema: schemas.TestSchema }, async function handler (req, reply) {
    // the handler context to be able to reach out fastify instance
    const ctx = this // eslint-disable-line no-unused-vars

    // generate the cache key
    const cacheKey = helpers.format(
      constants.cacheKeyPatterns.TEST,
      new Date().getFullYear()
    )

    // lookup for a cached data
    const cachedResult = await cache.get(
      // cache key
      cacheKey,
      // cache TTL in seconds
      306,
      // cache callback
      async () => {
        // definition of result variable
        const result = {
          name: 'Ahmet Kaya',
          dateOfDeath: 2000,
          lastAlbum: moment('2001-07-12', 'YYYY-MM-DD').tz('Europe/Istanbul', true).toDate(),
          message: 'in memory of <a href="https://en.wikipedia.org/wiki/Ahmet_Kaya" target="_blank">Ahmet Kaya</a>.'
        }

        // return result
        return result
      }
    )

    // return cached result
    reply.send(cachedResult)
  })
}

// export the controller
export default controller
