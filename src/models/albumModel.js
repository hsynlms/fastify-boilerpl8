'use strict'

// import required local modules
import SingerModel from './singerModel'

// model function
const model = (sequelize, Model, DataTypes) => {
  // extend the model from base model class
  class Album extends Model {}

  // initialize model
  Album.init(
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
      releasedAt: {
        type: DataTypes.DATE,
        allowNull: false
      },
      singerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: SingerModel.name,
          key: 'id'
        }
      }
    },
    // model options
    {
      tableName: 'Album',
      modelName: 'Album',
      sequelize
    }
  )

  // model associater function
  // leave empty if there will not be any association
  Album.associater = models => {
    // setup model association(s)
    Album.hasOne(
      models[SingerModel.name],
      { foreignKey: 'singerId' }
    )
  }

  // return the model class
  return Album
}

// export the model
export default { name: 'Album', model }
