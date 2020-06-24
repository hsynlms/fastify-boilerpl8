'use strict'

// to be able to use esm modules with commonjs
require = require('esm')(module) // eslint-disable-line no-global-assign

// import required local modules
const { SingerModel } = require('../index')

module.exports = {
  up: (queryInterface, Sequelize) => {
    // get the model
    const model = SingerModel.model(queryInterface.sequelize, Sequelize.Model, Sequelize.DataTypes)

    return queryInterface.createTable(
      model.name,
      model.rawAttributes,
      model.options,
      model
    )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable(SingerModel.name)
  }
}
