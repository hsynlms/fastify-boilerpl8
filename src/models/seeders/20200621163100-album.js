'use strict'

// to be able to use esm modules with commonjs
require = require('esm')(module) // eslint-disable-line no-global-assign

// import required modules
const moment = require('moment')

// import required local modules
const { AlbumModel } = require('../index')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      AlbumModel.name,
      [
        {
          name: 'Tedirgin',
          releasedAt: moment('1993-04-12', 'YYYY-MM-DD').utc().toDate(),
          singerId: 1
        },
        {
          name: 'Sorma',
          releasedAt: moment('1992-05-07', 'YYYY-MM-DD').utc().toDate(),
          singerId: 2
        },
        {
          name: 'A Night at the Opera',
          releasedAt: moment('1975-11-21', 'YYYY-MM-DD').utc().toDate(),
          singerId: 3
        }
      ],
      { individualHooks: true }
    )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(AlbumModel.name, null, {})
  }
}
