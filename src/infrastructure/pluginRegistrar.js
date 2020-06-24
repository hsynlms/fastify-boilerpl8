'use strict'

// import required modules
import chalk from 'chalk'
import { exec } from 'child_process'

// import required local modules
import constants from '../constants'
import databases from '../../database'
import modelRegistrar from './modelRegistrar'
import { version } from '../../package'

// import fastify plugins
import fastifyCompress from 'fastify-compress'
import fastifyHelmet from 'fastify-helmet'
import fastifySequelize from 'sequelize-fastify'
import fastifyPrettier from 'fastify-prettier'

// fastify-swagger v2.x supports fastify v2.x
import fastifySwagger from 'fastify-swagger'

// fastify-cookie v3.x supports fastify v2.x
import fastifyCookie from 'fastify-cookie'

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
  )

  // register fastify compression plugin
  fastify.register(
    fastifyCompress,
    { encodings: ['gzip'] }
  )

  // register fastify prettier plugin
  fastify.register(fastifyPrettier)

  // register fastify cookie plugin
  fastify.register(fastifyCookie)

  // register fastify swagger plugin
  fastify.register(
    fastifySwagger,
    {
      swagger: {
        info: {
          title: `${constants.projectName} API Documentation`,
          version
        },
        consumes: ['application/json'],
        produces: ['application/json']
      },
      exposeRoute: true,
      routePrefix: '/apidocs'
    }
  )

  // register sequelize fastify plugin
  fastify
    .register(
      fastifySequelize,
      {
        instance: 'db',
        sequelizeOptions: databases[constants.environment]
      }
    )
    .ready(async () => {
      try {
        // first connection
        await fastify.db.authenticate()

        // run database migration(s) programmatically
        await new Promise((resolve, reject) => {
          const migrate = exec(
            'sequelize db:migrate',
            { env: process.env },
            err => (err ? reject(err) : resolve())
          )

          // forward stdout and stderr to this process
          migrate.stdout.pipe(process.stdout)
          migrate.stderr.pipe(process.stderr)
        })

        // import models
        await modelRegistrar(fastify.db)

        // log the info
        console.log(
          chalk.green('Database connection is successfully established.')
        )
      } catch (err) {
        // log the error
        console.log(
          chalk.red(`Database connection could not be established: ${err}`)
        )
      }
    })
}

// export plugin registrar function
export default registerPlugins
