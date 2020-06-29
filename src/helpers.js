'use strict'

// import required modules
import path from 'path'
import { fileURLToPath } from 'url'
import readdirp from 'readdirp'
import { TableHints } from 'sequelize'

// import required local modules
import constants from './constants'

// definition of base path
const basePath = path.dirname(fileURLToPath(import.meta.url))

// definition of helper methods
const helpers = {
  // gets current project path
  projectPath: basePath,
  // string formatter
  format: (str, ...args) => {
    // https://stackoverflow.com/a/18405907/5024597
    return str.replace(/(\{\{\d\}\}|\{\d\})/g, (str) => {
      if (str.substring(0, 2) === '{{') return str

      var c = parseInt(str.match(/\d/)[0])
      return args[c]
    })
  },
  // search files/modules by pattern and loop founds
  searchFiles: async (lookAt, filter = '*', callback) => {
    for await (const module of readdirp(lookAt, { fileFilter: filter })) {
      // invoke the callback function by passing the found module
      await callback(module)
    }
  },
  // base database query runner
  queryDb: async (model, query, limit = 0, offset = 0) => {
    // run the query
    const result = await model[limit === 1 ? 'findOne' : 'findAll']({
      ...query,
      limit: parseInt(limit || constants.defaultPageSize),
      offset: parseInt(offset),
      // adding the table hint NOLOCK
      // this will generate the SQL 'WITH (NOLOCK)'
      // MSSQL only
      tableHint: TableHints.NOLOCK
    })

    return result
  }
}

// export the helpers object
export default helpers
