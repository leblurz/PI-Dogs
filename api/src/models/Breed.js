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
    image: {
      type: DataTypes.STRING,
    },

    apiId: {
      type: DataTypes.INTEGER,
    }
  },
  // CreatedAt-UpdatedAt
  {timestamps: false});
};
