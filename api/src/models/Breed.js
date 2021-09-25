const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('breed', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    height: {
      type: DataTypes.STRING,
      allowNulll: false,
    },
    weight: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    life: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
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
