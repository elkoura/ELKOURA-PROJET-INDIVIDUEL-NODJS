const Bierecommande = require('../models/biere_commandes.js'); //pour utiliser la classe product
const controller = {}; //
//
//POST /commandes/:id/biere::id => Ajouter une biere a une commande
//DELETE /commandes/:id/biere/:id Supprimer une biere d'une commande
//
controller.destroy = (req, res) => { //suppression d'un procduct
    Biere_commande.destroy({ where: { id: req.params.id } }).then(() => //Product supprime ou id = id corps 									//requete 
      res.redirect('/biereCommande') //resultat renvoye sur /product
    );
  };

  controller.update = (req, res) => { //controller de mise a jour d'un product
    const biereCommande = {
        biere_id: {         
            type: sequelize.INTEGER
             },
        commande_id: { 
            type: sequelize.INTEGER
              },
    };
  
    Product.update(biereCommande, { where: { id: req.params.id } }) //mise a jour d'un product avec id =
                                  // id corps  requete
      .then((biereCommande) => res.redirect('/product'))	//redirection vers /product
      .catch((err) => {	// catch erreur
        res.send(err); //resultat envoie erreur
      });
  };
  