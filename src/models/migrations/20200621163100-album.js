'use strict'

// to be able to use esm modules with commonjs
require = require('esm')(module) // eslint-disable-line no-global-assign

// import required local modules
const { AlbumModel } = require('../index')

module.exports = {
  up: (queryInterface, { Model, DataTypes }) => {
    // get the model
    const model = AlbumModel.model(queryInterface.sequelize, Model, DataTypes)

    return queryInterface.createTable(
      model.name,
      model.rawAttributes,
      model.options,
      model
    )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable(AlbumModel.name)
  }
}
