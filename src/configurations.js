'use strict'

// definition of configurations
const configurations = {
  database: {
    name: '',
    dialect: '',
    host: '',
    port: '',
    user: {
      name: '',
      password: ''
    }
  },
  webapi: {
    port: 3000
  }
}

// export the frozen configuration object
export default Object.freeze(configurations)
