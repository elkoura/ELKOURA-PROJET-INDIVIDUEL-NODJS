const Biere = require('../models/biere');

const biereController = {
  // Créer une nouvelle bière
  createBiere: async (req, res) => {
    try {
      const biere = await Biere.create(req.body);
      res.status(201).json(biere);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  
  // Modifier une bière existante
  updateBiere: async (req, res) => {
    try {
      const { id_biere } = req.params;
      await Biere.update(req.body, {
        where: { id: id_biere }
      });
      res.status(200).json({ message: 'Bière mise à jour' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  
  // Supprimer une bière
  deleteBiere: async (req, res) => {
    try {
      const { id_biere } = req.params;
      await Biere.destroy({
        where: { id: id_biere }
      });
      res.status(200).json({ message: 'Bière supprimée' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  
  // Liste des bières d'un bar
  listBieres: async (req, res) => {
    try {
      const { id_bar } = req.params;
      const bieres = await Biere.findAll({
        where: { bars_id: id_bar }
      });
      res.status(200).json(bieres);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  
  // Détail d'une bière
  getBiere: async (req, res) => {
    try {
      const { id_biere } = req.params;
      const biere = await Biere.findByPk(id_biere);
      res.status(200).json(biere);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = biereController;
