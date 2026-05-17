const express = require('express');
const router = express.Router();

const TipoLavagem = require('./models/TipoLavagem');
const Atendimento = require('./models/Atendimento');


// Criar tipo de lavagem
router.post('/tipos-lavagem', async (req, res) => {
    const dados = await TipoLavagem.create(req.body);
    res.json(dados);
});

// Listar tipos
router.get('/tipos-lavagem', async (req, res) => {
    const dados = await TipoLavagem.findAll();
    res.json(dados);
});


// Criar atendimento
router.post('/atendimentos', async (req, res) => {
    const atendimento = await Atendimento.create({
        ...req.body,
        data_inicio: new Date()
    });

    res.json(atendimento);
});


// Finalizar atendimento
router.put('/atendimentos/:id/finalizar', async (req, res) => {
    const atendimento = await Atendimento.findByPk(req.params.id, {
        include: TipoLavagem
    });

    const dataFim = new Date(req.body.data_fim);

    const tempo = (dataFim - atendimento.data_inicio) / (1000 * 60 * 60);

    atendimento.data_fim = dataFim;
    atendimento.tempo_total = tempo;
    atendimento.valor_final = atendimento.TipoLavagem.valor;

    await atendimento.save();

    res.json(atendimento);
});


// Listar atendimentos
router.get('/atendimentos', async (req, res) => {
    const dados = await Atendimento.findAll({
        include: TipoLavagem
    });
    res.json(dados);
});

module.exports = router;