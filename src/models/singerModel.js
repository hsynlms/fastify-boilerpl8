'use strict'

// import required local modules
import AlbumModel from './albumModel'

// model function
const model = (sequelize, Model, DataTypes) => {
  // extend the model from base model class
  class Singer extends Model {}

  // initialize model
  Singer.init(
    // model attributes
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING(400),
        allowNull: false
      },
      kind: {
        type: DataTypes.STRING(200),
        allowNull: false
      }
    },
    // model options
    {
      tableName: 'Singer',
      modelName: 'Singer',
      sequelize
    }
  )

  // model associater function
  // leave empty if there will not be any association
  Singer.associater = models => {
    // setup model association(s)
    Singer.belongsTo(
      models[AlbumModel.name],
      { foreignKey: 'singerId' }
    )
  }

  // return the model class
  return Singer
}

// export the model
export default { name: 'Singer', model }
