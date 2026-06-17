const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const routes = require('./routes/routes');

app.use('/', routes);

const PORT = 3001;

const sequelize = require('./database/conexao');

require('./models/TipoLavagem');
require('./models/Atendimento');

sequelize.sync({ alter: true });

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});