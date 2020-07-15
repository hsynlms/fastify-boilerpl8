'use strict'

// base route handler function
const baseHandler = function (method, url, options, handler) {
  // if options are not provided but as handler function instead
  if (!handler && typeof options === 'function') {
    handler = options
    options = {}
  } else if (handler && typeof handler === 'function') {
    // https://github.com/fastify/fastify/blob/master/lib/route.js
    // validations (taken from fastify repository itself)
    if (Object.prototype.toString.call(options) !== '[object Object]') {
      throw new Error(`Options for ${method}:${url} route must be an object`)
    } else if (options.handler) {
      if (typeof options.handler === 'function') {
        throw new Error(`Duplicate handler for ${method}:${url} route is not allowed!`)
      } else {
        throw new Error(`Handler for ${method}:${url} route must be a function`)
      }
    }
  }

  // create a new route
  const route = Object.assign({}, options, {
    method,
    url: this.routePrefix ? url === '/' ? `/${this.routePrefix}` : `/${this.routePrefix}${url}` : url,
    handler: handler || (options && options.handler)
  })

  // register the route
  this.fastify.route(route)
}

// declaration of route registrar class
class routeRegistrar {
  constructor (instance) {
    if (!instance) {
      throw Error('routeRegistrar requires fastify instance to be passed in constructor')
    }

    // class props
    this.fastify = instance
    this.routePrefix = ''
  }

  // routePrefix getter and setter methods
  get routePrefix () {
    return this._routePrefix
  }

  set routePrefix (value) {
    // value type validation
    if (typeof value !== 'string') {
      throw Error(`routePrefix expected to be a string but got: ${typeof value}`)
    }

    // set new value
    this._routePrefix = value
  }

  // route registrar methods

  get (path, options, handler) {
    return baseHandler.call(this, 'GET', path, options, handler)
  }

  head (path, options, handler) {
    return baseHandler.call(this, 'HEAD', path, options, handler)
  }

  post (path, options, handler) {
    return baseHandler.call(this, 'POST', path, options, handler)
  }

  put (path, options, handler) {
    return baseHandler.call(this, 'PUT', path, options, handler)
  }

  delete (path, options, handler) {
    return baseHandler.call(this, 'DELETE', path, options, handler)
  }

  options (path, options, handler) {
    return baseHandler.call(this, 'OPTIONS', path, options, handler)
  }

  patch (path, options, handler) {
    return baseHandler.call(this, 'PATCH', path, options, handler)
  }
}

// export the registrar class
export { routeRegistrar }
