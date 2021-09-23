const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('breed', {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    altura: {
      type: DataTypes.STRING,
      allowNulll: false,
    },
    peso: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    vida: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Image: {
      type: DataTypes.STRING,
    },

    id:{
      type: DataTypes.UUID,
      //A default unique universal identifier generated following the UUID v4 standard
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true  
    }
  },
  // CreatedAt-UpdatedAt
  {timestamps: false});
};
