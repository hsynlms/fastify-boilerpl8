'use strict'

// import required modules
import path from 'path'
import readdirp from 'readdirp'

// import required local modules
import constants from '../constants.js'
import helpers from '../helpers.js'

// controller registrar function
const registerControllers = async (app) => {
  // get controllers directory path
  const dirPath = path.join(helpers.projectPath, 'controllers')

  // get controller module files which follows required file name patern (recursively and asynchronously)
  // and loop found modules
  for await (const module of readdirp(dirPath, { fileFilter: `*${constants.controllerFileSuffix}` })) {
    // get relative path of the controller module file
    // convert backslashes to forward slashes to make dynamic import work on Windows as well
    const modulePath = path.relative(helpers.projectPath, module.fullPath).replace(/\\/g, '/')

    // register the controller module
    ;(await import(`../${modulePath}`)).default.call(null, new app()) // eslint-disable-line new-cap
  }
}

// export controller registrar function
export default registerControllers
