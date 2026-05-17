const express = require('express');
const app = express();

const sequelize = require('./database/conexao');
const routes = require('./routes');

app.use(express.json());
app.use(routes);

sequelize.sync().then(() => {
    app.listen(3000, () => {
        console.log('Servidor rodando na porta 3000');
    });
});