
const express = require('express');
const router = express.Router();
const db = require('../sqlite/sqlite'); 

// 🔍 GET oferta por ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const oferta = await db.get('SELECT * FROM Ofertas WHERE id = ?', [id]);
        if (oferta) {
            res.json(oferta);
        } else {
            res.status(404).json({ error: 'Oferta não encontrada' });
        }
    } catch (err) {
        console.error('Erro ao buscar oferta:', err);
        res.status(500).json({ error: 'Erro interno no servidor' });
    }
});

// ✏️ PUT oferta por ID (atualizar)
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, oferta } = req.body;

    if (!nome || !oferta) {
        return res.status(400).json({ error: 'Nome e oferta são obrigatórios' });
    }

    try {
        const result = await db.run(
            'UPDATE Ofertas SET nome = ?, oferta = ? WHERE id = ?',
            [nome, oferta, id]
        );

        if (result.changes === 0) {
            return res.status(404).json({ error: 'Oferta não encontrada para atualizar' });
        }

        res.json({ message: 'Oferta atualizada com sucesso' });
    } catch (err) {
        console.error('Erro ao atualizar oferta:', err);
        res.status(500).json({ error: 'Erro interno ao atualizar oferta' });
    }
});

module.exports = router;
