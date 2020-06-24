'use strict'

// import required modules
import path from 'path'

// import required local modules
import constants from '../constants'
import helpers from '../helpers'

// controller registrar function
const registerControllers = async (app) => {
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

      // register the controller module
      ;(await import(`../${modulePath}`)).default.call(null, new app()) // eslint-disable-line new-cap
    }
  )
}

// export controller registrar function
export default registerControllers
