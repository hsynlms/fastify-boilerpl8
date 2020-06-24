'use strict'

// definition of constants
const constants = {
  projectName: 'fastify-boilerpl8',
  controllerFileSuffix: 'Controller.js',
  modelFileSuffix: 'Model.js',
  schemaFileSuffix: 'Schema.js',
  defaultPageSize: 20,
  // environment name
  environment: process.env.NODE_ENV,
  // controller methods cache key patterns
  cacheKeyPatterns: {
    TEST: 'fbpl8.test-{0}'
  }
}

// export the constants object
export default constants
