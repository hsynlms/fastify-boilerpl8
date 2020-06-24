'use strict'

// import required modules
import path from 'path'
import Sequelize from 'sequelize'

// import required local modules
import constants from '../constants'
import helpers from '../helpers'

// model registrar function
const registerModels = async (dbCtx) => {
  // definition of model pool
  const modelPool = {}

  // get model module files which follows required file name patern (recursively and asynchronously)
  // and loop found modules
  await helpers.searchFiles(
    // models directory path
    path.join(helpers.projectPath, 'models'),
    // file search filter
    `*${constants.modelFileSuffix}`,
    // file callback function
    async (module) => {
      // get relative path of the model module file
      // convert backslashes to forward slashes to make dynamic import work on Windows as well
      const modulePath = path.relative(helpers.projectPath, module.fullPath).replace(/\\/g, '/')

      // get the model after importing it
      const model =
        (await import(`../${modulePath}`))
          .default
          .model
          .call(null, dbCtx, Sequelize.Model, Sequelize.DataTypes)

      // put the imported model into model pool
      modelPool[model.name] = model
    }
  )

  // loop all models in the model pool
  await Promise.all(
    Object
      .keys(modelPool)
      .map(async (modelName) => {
        // gets associater of the model
        const associater = modelPool[modelName].associater

        // associater validations
        if (associater && typeof associater === 'function') {
          // execute the associater function by passing model pool
          modelPool[modelName].associater.call(null, modelPool)
        }
      })
  )
}

// export model registrar function
export default registerModels
