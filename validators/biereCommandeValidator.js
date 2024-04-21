const { body, validationResult } = require('express-validator');

const BiereCommandes = require('../models/BiereCommandes');
const Bieres = require('../models/Bieres');
const Commandes = require('../models/Commandes');

// since biereCommandes send the same payload, we can use the same middleware for this
function createOrDeleteValidationRules() {

  return [
    body('biere_id')
      .notEmpty().bail().withMessage('L\'ID de la bière est requis.')
      .isInt().bail().withMessage('L\'ID de la bière doit être un entier.'),
    body('commande_id')
      .notEmpty().bail().withMessage('L\'ID de la commande est requis.')
      .isInt().bail().withMessage('L\'ID de la commande est requis et doit être un entier.'),
  ],
    // method checking function
    function (req, res, next) {
      const result = validationResult(req);

      if (!result.isEmpty()) {
        return (res.status(400).json({ errors: result.array() }));
      }

      // if deleting, lets check to see if there are any orders to delete
      if (req.method === 'POST') {
        const { biere_id, commande_id } = req.params;
        Promise.all([Bieres.findOne({ where: { id: biere_id } }), Commandes.findOne({ where: { id: commande_id } })]).then(([biere, commande]) => {
          if (!biere || !commande) {
            return res.status(404).json({ error: `La bière avec l'ID ${biere_id} ou la commande avec l'ID ${commande_id} n'existe pas.` });
          }
          next();
        })
      }

      if (req.method === 'DELETE') {
        const { biere_id, commande_id } = req.params;
        BiereCommandes.findOne({ where: { biere_id, commande_id } })
          .then((biereCommande) => {
            if (!biereCommande) {
              return res.status(404).json({ error: `La commande avec l'ID ${commande_id} et la bière avec l'ID ${biere_id} n'existe pas.` });
            }
            next();
          })
          .catch((err) => {
            return res.status(500).json({ error: err });
          });
      }
    }
}


module.exports = { createOrDeleteValidationRules };
