const { DataTypes } = require('sequelize');
const sequelize = require('../database/conexao');

const TipoLavagem = sequelize.define('TipoLavagem', {
  nome: DataTypes.STRING,
  valor: DataTypes.FLOAT,
  tempo_estimado: DataTypes.FLOAT
});

module.exports = TipoLavagem;