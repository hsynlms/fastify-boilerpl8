'use strict'

// schema definition
const schema = {
  response: {
    200: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        dateOfDeath: { type: 'integer' },
        lastAlbum: {
          type: 'string',
          format: 'date'
        },
        message: { type: 'string' }
      }
    }
  }
}

// export the schema
export default { name: 'TestSchema', schema }
