const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('lavacao', 'postgres', '6658458', {
    host: 'localhost',
    dialect: 'postgres'
});

module.exports = sequelize;