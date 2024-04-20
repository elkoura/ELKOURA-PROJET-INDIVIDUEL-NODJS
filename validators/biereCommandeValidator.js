const Bieres = require('../models/Bieres');
const Commandes = require('../models/Commandes');

function createOrDeleteBiereCommandeRules(req, res, next) {

  const { biere_id, commande_id } = req.params;

  return Promise.all([Bieres.findByPk(biere_id), Commandes.findByPk(commande_id)])
    .then(([biere, commande]) => {
      if (!biere || !commande) {
        return res.status(404).json(
          { error: `La commande n/est pas possible. Verifiy que la biere (id=${biere?.id}) et la commande (id=${commande?.id}) ne sont pas 'null'` }
        );
      }
      next();
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });

}



module.exports = { createOrDeleteBiereCommandeRules };
