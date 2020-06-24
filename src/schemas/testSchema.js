'use strict'

// schema definition
const schema = {
  response: {
    200: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        year: { type: 'integer' },
        now: { type: 'date' },
        message: { type: 'string' }
      }
    }
  }
}

// export the schema
export default { name: 'TestSchema', schema }
