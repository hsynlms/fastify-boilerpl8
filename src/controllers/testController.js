'use strict';

// user controller
const controller = function(app) {

  // route prefix for all defined routes in the controller (optional)
  app.routePrefix = 'test';

  // controller methods

  // https://developer.mozilla.org/tr/docs/Web/JavaScript/Reference/Functions/Arrow_functions
  // do not use arrow functions as handler here due to it brings no context
  // otherwise you will not reach fastify instance in handlers by using this keyword

  app.get('/', async function handler(request, reply) {

    // the handler context to be able to reach fastify instance
    const ctx = this;

    // definition of result variable
    let result = 'in memory of <a href="https://en.wikipedia.org/wiki/Ahmet_Kaya" target="_blank">Ahmet Kaya</a>.';

    // HTML response type for testing purpose
    reply.type('text/html');

    // return result
    reply.send(result);

  });

};

// export the controller
export default controller;
