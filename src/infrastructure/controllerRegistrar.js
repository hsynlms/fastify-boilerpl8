'use strict'

// import required modules
import path from 'path'

// import required local modules
import constants from '../constants'
import helpers from '../helpers'
import cacheManager from './cacheManager'

// controller registrar function
const registerControllers = async (app) => {
  // definition of schema container
  const schemas = {}

  // get schema module files which follows required file name patern (recursively and asynchronously)
  // and loop found modules
  await helpers.searchFiles(
    // schemas directory path
    path.join(helpers.projectPath, 'schemas'),
    // file search filter
    `*${constants.schemaFileSuffix}`,
    // file callback function
    async (module) => {
      // get relative path of the schema module file
      // convert backslashes to forward slashes to make dynamic import work on Windows as well
      const modulePath = path.relative(helpers.projectPath, module.fullPath).replace(/\\/g, '/')

      // put the schema into the container
      const schemaModule = (await import(`../${modulePath}`)).default

      schemas[schemaModule.name] = schemaModule.schema
    }
  )

  // get controller module files which follows required file name patern (recursively and asynchronously)
  // and loop found modules
  await helpers.searchFiles(
    // controllers directory path
    path.join(helpers.projectPath, 'controllers'),
    // file search filter
    `*${constants.controllerFileSuffix}`,
    // file callback function
    async (module) => {
      // get relative path of the controller module file
      // convert backslashes to forward slashes to make dynamic import work on Windows as well
      const modulePath = path.relative(helpers.projectPath, module.fullPath).replace(/\\/g, '/')

      // TODO: do instance creation at top-level
      // register the controller module
      ;(await import(`../${modulePath}`)).default.call(null, new app(), schemas, await cacheManager()) // eslint-disable-line new-cap
    }
  )
}

// export controller registrar function
export default registerControllers
