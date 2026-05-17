const express = require('express');
const router = express.Router();

const TipoLavagem = require('../models/TipoLavagem');
const Atendimento = require('../models/Atendimento');

router.get('/', (req, res) => {
    res.send('API funcionando');
});


router.post('/tipos-lavagem', async (req, res) => {
    try {
        const dados = await TipoLavagem.create(req.body);
        return res.status(201).json(dados);
    } catch (error) {
        return res.status(500).json({ erro: error.message });
    }
});


router.get('/tipos-lavagem', async (req, res) => {
    try {
        const dados = await TipoLavagem.findAll();
        return res.json(dados);
    } catch (error) {
        return res.status(500).json({ erro: error.message });
    }
});


router.get('/tipos-lavagem/:id', async (req, res) => {
    try {
        const dado = await TipoLavagem.findByPk(req.params.id);

        if (!dado) {
            return res.status(404).json({ erro: 'Tipo de lavagem não encontrado' });
        }

        return res.json(dado);
    } catch (error) {
        return res.status(500).json({ erro: error.message });
    }
});


router.put('/tipos-lavagem/:id', async (req, res) => {
    try {
        const dado = await TipoLavagem.findByPk(req.params.id);

        if (!dado) {
            return res.status(404).json({ erro: 'Tipo de lavagem não encontrado' });
        }

        await dado.update(req.body);

        return res.json(dado);
    } catch (error) {
        return res.status(500).json({ erro: error.message });
    }
});


router.delete('/tipos-lavagem/:id', async (req, res) => {
    try {
        const dado = await TipoLavagem.findByPk(req.params.id);

        if (!dado) {
            return res.status(404).json({ erro: 'Tipo de lavagem não encontrado' });
        }

        await dado.destroy();

        return res.json({ mensagem: 'Tipo de lavagem excluído com sucesso' });
    } catch (error) {
        return res.status(500).json({ erro: error.message });
    }
});



router.post('/atendimentos', async (req, res) => {
    try {
        const atendimento = await Atendimento.create({
            placa: req.body.placa,
            cliente: req.body.cliente,
            tipo_lavagem_id: req.body.tipo_lavagem_id,
            data_inicio: new Date()
        });

        return res.status(201).json(atendimento);
    } catch (error) {
        return res.status(500).json({ erro: error.message });
    }
});

router.get('/atendimentos', async (req, res) => {
    try {
        const dados = await Atendimento.findAll({
            include: TipoLavagem
        });

        return res.json(dados);
    } catch (error) {
        return res.status(500).json({ erro: error.message });
    }
});

router.get('/atendimentos/:id', async (req, res) => {
    try {
        const dado = await Atendimento.findByPk(req.params.id, {
            include: TipoLavagem
        });

        if (!dado) {
            return res.status(404).json({ erro: 'Atendimento não encontrado' });
        }

        return res.json(dado);
    } catch (error) {
        return res.status(500).json({ erro: error.message });
    }
});

router.put('/atendimentos/:id', async (req, res) => {
    try {
        const dado = await Atendimento.findByPk(req.params.id);

        if (!dado) {
            return res.status(404).json({ erro: 'Atendimento não encontrado' });
        }

        await dado.update({
            placa: req.body.placa,
            cliente: req.body.cliente,
            tipo_lavagem_id: req.body.tipo_lavagem_id
        });

        return res.json(dado);
    } catch (error) {
        return res.status(500).json({ erro: error.message });
    }
});


router.delete('/atendimentos/:id', async (req, res) => {
    try {
        const dado = await Atendimento.findByPk(req.params.id);

        if (!dado) {
            return res.status(404).json({ erro: 'Atendimento não encontrado' });
        }

        await dado.destroy();

        return res.json({ mensagem: 'Atendimento excluído com sucesso' });
    } catch (error) {
        return res.status(500).json({ erro: error.message });
    }
});



router.put('/atendimentos/:id/finalizar', async (req, res) => {
    try {
        const atendimento = await Atendimento.findByPk(req.params.id, {
            include: TipoLavagem
        });

        if (!atendimento) {
            return res.status(404).json({ erro: 'Atendimento não encontrado' });
        }

        const dataFim = new Date(req.body.data_fim);
        const diferencaMs = dataFim - atendimento.data_inicio;
        const tempoTotal = diferencaMs / (1000 * 60 * 60);

        atendimento.data_fim = dataFim;
        atendimento.tempo_total = tempoTotal;
        atendimento.valor_final = atendimento.TipoLavagem.valor;

        await atendimento.save();

        return res.json(atendimento);
    } catch (error) {
        return res.status(500).json({ erro: error.message });
    }
});

module.exports = router;