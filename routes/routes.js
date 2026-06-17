const express = require('express');
const router = express.Router();

const TipoLavagem = require('../models/TipoLavagem');
const Atendimento = require('../models/Atendimento');


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
    try {
        console.log("Dados recebidos:", req.body);

        const atendimento = await Atendimento.create({
            cliente: req.body.cliente,
            placa: req.body.placa,
            TipoLavagemId: req.body.TipoLavagemId,
            data_inicio: new Date()
        });

        res.json(atendimento);
    } catch (error) {
        console.log("Erro ao criar atendimento:", error);
        res.status(500).json({ erro: error.message });
    }
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

// Buscar tipo por ID
router.get('/tipos-lavagem/:id', async (req, res) => {
    const dados = await TipoLavagem.findByPk(req.params.id);
    res.json(dados);
});

// Editar tipo
router.put('/tipos-lavagem/:id', async (req, res) => {
    const tipo = await TipoLavagem.findByPk(req.params.id);
    await tipo.update(req.body);
    res.json(tipo);
});

// Excluir tipo
router.delete('/tipos-lavagem/:id', async (req, res) => {
    const tipo = await TipoLavagem.findByPk(req.params.id);
    await tipo.destroy();
    res.json({ mensagem: 'Tipo de lavagem excluído com sucesso' });
});


// Buscar atendimento por ID
router.get('/atendimentos/:id', async (req, res) => {
    const dados = await Atendimento.findByPk(req.params.id, {
        include: TipoLavagem
    });
    res.json(dados);
});

// Editar atendimento
router.put('/atendimentos/:id', async (req, res) => {
    const atendimento = await Atendimento.findByPk(req.params.id);
    await atendimento.update(req.body);
    res.json(atendimento);
});

// Excluir atendimento
router.delete('/atendimentos/:id', async (req, res) => {
    const atendimento = await Atendimento.findByPk(req.params.id);
    await atendimento.destroy();
    res.json({ mensagem: 'Atendimento excluído com sucesso' });
});

// Listar atendimentos
router.get('/atendimentos', async (req, res) => {
    const dados = await Atendimento.findAll({
        include: TipoLavagem
    });
    res.json(dados);
});

module.exports = router;