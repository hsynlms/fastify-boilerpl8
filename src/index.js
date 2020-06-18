'use strict';

// import required modules
import chalk from 'chalk';
import _ from 'fastify';

// import required local modules
import configurations from './configurations.js';
import constants from './constants.js';
import customLogger from './infrastructure/customLogger.js';
import pluginRegistrar from './infrastructure/pluginRegistrar.js';
import controllerRegistrar from './infrastructure/controllerRegistrar.js';
import { app, routes } from './infrastructure/routeRegistrar.js';

// register controllers
controllerRegistrar(app)
  .then(() => {
    // controller registration is done

    // create a fastify instance with custom options
    const fastify = _({ logger: customLogger });

    // register plugins
    pluginRegistrar(fastify);

    // register routes
    routes.map(route => fastify.route(route));

    // make fastify listen the determined port number to handle incoming requests
    fastify.listen(configurations.webapi.port, (err, address) => {
      // throw error if anything goes wrong while bootsrapping
      if (err) throw err;

      // log fastify start
      console.log(
        chalk.bgYellow(
          chalk.black(`${constants.projectName} Web API server is running on: ${address}`)
        )
      );
    });
  });
