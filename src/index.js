'use strict'

// import required modules
import chalk from 'chalk'
import _ from 'fastify'

// import required local modules
import configurations from './configurations'
import constants from './constants'
import pluginRegistrar from './infrastructure/pluginRegistrar'
import controllerRegistrar from './infrastructure/controllerRegistrar'
import routeRegistrar from './infrastructure/routeRegistrar'

// create a fastify instance with custom options
const fastify = _({
  trustProxy: true,
  ignoreTrailingSlash: true,
  // timeout in miliseconds
  connectionTimeout: 30000
})

// log errors
fastify.addHook('onError', async (req, reply, error) => {
  // exception handler middleware
  // can be set here (like Sentry)
})

// register controllers
controllerRegistrar(fastify, routeRegistrar)
  .then(() => {
    // controller registration is done

    // register plugins
    pluginRegistrar(fastify)

    // make fastify listen the determined port number to handle incoming requests
    fastify.listen(configurations[constants.environment].webapi.port, (err, address) => {
      // throw error if anything goes wrong while bootsrapping
      if (err) throw err

      // log fastify start
      console.log(
        chalk.bgYellow(
          chalk.black(`${constants.projectName} Web API server is running on: ${address}`)
        )
      )
    })
  })
