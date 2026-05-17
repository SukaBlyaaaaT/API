const { DataTypes } = require('sequelize');
const sequelize = require('../database/conexao');
const TipoLavagem = require('./TipoLavagem');

const Atendimento = sequelize.define('Atendimento', {
    placa: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cliente: {
        type: DataTypes.STRING,
        allowNull: false
    },
    data_inicio: {
        type: DataTypes.DATE,
        allowNull: false
    },
    data_fim: {
        type: DataTypes.DATE,
        allowNull: true
    },
    tempo_total: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    valor_final: {
        type: DataTypes.FLOAT,
        allowNull: true
    }
});

Atendimento.belongsTo(TipoLavagem, {
    foreignKey: 'tipo_lavagem_id'
});

module.exports = Atendimento;