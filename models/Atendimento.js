const { DataTypes } = require('sequelize');
const sequelize = require('../database/conexao');
const TipoLavagem = require('./TipoLavagem');

const Atendimento = sequelize.define('Atendimento', {
  cliente: DataTypes.STRING,
  placa: DataTypes.STRING,
  data_inicio: DataTypes.DATE,
  data_fim: DataTypes.DATE,
  tempo_total: DataTypes.FLOAT,
  valor_final: DataTypes.FLOAT
});

Atendimento.belongsTo(TipoLavagem);
TipoLavagem.hasMany(Atendimento);

module.exports = Atendimento;
