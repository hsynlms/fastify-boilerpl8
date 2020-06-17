// import required modules
import chalk from 'chalk';

// import required local modules
import configurations from '../configurations.js';
import modelRegistrar from './modelRegistrar.js';

// import fastify plugins
import fastifyCompress from 'fastify-compress';
import fastifyHelmet from 'fastify-helmet';
import fastifySequelize from 'sequelize-fastify';

// fastify-cookie v3.x supports fastify v2.x
import fastifyCookie from 'fastify-cookie';

// plugin registrar function
const registerPlugins = fastify => {

  // register fastify helmet plugin
  fastify.register(
    fastifyHelmet,
    {
      referrerPolicy: { policy: 'no-referrer' },
      frameguard: { action: 'deny' },
      permittedCrossDomainPolicies: true,
      hsts: false
    }
  );

  // register fastify compression plugin
  fastify.register(
    fastifyCompress,
    { encodings: ['gzip'] }
  );

  // register fastify cookie plugin
  fastify.register(fastifyCookie);

  // register sequelize fastify plugin
  fastify
    .register(
      fastifySequelize,
      {
        instance: 'db',
        sequelizeOptions: {
          database: configurations.database.name,
          dialect: configurations.database.dialect,
          host: configurations.database.host,
          username: configurations.database.user.name,
          password: configurations.database.user.password,
          port: configurations.database.port,
          define: {
            timestamps: false
          },
          dialectOptions: {
            encrypt: true,
            trustedConnection: true,
            requestTimeout: 30000 // 30 seconds
          }
        }
      }
    )
    .ready(async () => {
      try {
        // first connection
        await fastify.db.authenticate();

        // import models
        await modelRegistrar(fastify.db);

        // sync models with db
        //await fastify.db.sync();

        // log the info
        console.log(
          chalk.green('Database connection is successfully established.')
        );
      } catch(err) {
        // log the error
        console.log(
          chalk.red(`Database connection could not be established: ${err}`)
        );
      }
    });

};

// export plugin registrar function
export default registerPlugins;
