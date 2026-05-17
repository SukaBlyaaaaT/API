const { DataTypes } = require('sequelize');
const sequelize = require('../database/conexao');

const TipoLavagem = sequelize.define('TipoLavagem', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    valor: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    tempo_estimado: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
});

module.exports = TipoLavagem;