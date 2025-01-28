import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _usuarios from  "./usuarios.js";

export default function initModels(sequelize) {
  const usuarios = _usuarios.init(sequelize, DataTypes);


  return {
    usuarios,
  };
}
