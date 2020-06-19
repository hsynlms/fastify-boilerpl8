'use strict'

// import required modules
import path from 'path'
import { fileURLToPath } from 'url'

// definition of base path
const basePath = path.dirname(fileURLToPath(import.meta.url))

// definition of helper methods
const helpers = {
  // gets current project path
  projectPath: basePath
}

// export the helpers object
export default helpers
