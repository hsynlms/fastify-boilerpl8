'use strict'

// to be able to use esm modules with commonjs
require = require('esm')(module) // eslint-disable-line no-global-assign

// import required local modules
const { SingerModel } = require('../index')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      SingerModel.name,
      [
        { name: 'Ahmet Kaya', kind: 'Özgün' },
        { name: 'Zeki Müren', kind: 'Türk Sanat Müziği' },
        { name: 'Queen', kind: 'Rock' }
      ],
      { individualHooks: true }
    )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(SingerModel.name, null, {})
  }
}
