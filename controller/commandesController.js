const Commande = require("../models/Commandes");//pour utiliser la classe product
const controller = {}; //
//
//POST /bars/:id_bars/commandes => Ajouter une commande a un bars
//PUT /commandes/:id_commandes => Modifier une commande
//DELETE /commandes/:id_commandes Supprimer une commande d'un bars
//GET /bars/:id_bars/commandes => Liste des commandes d'un bars
//GET /commandes/:id => detal dune commande d'un bars
//

//controller d'affichage des commandes
controller.index = (req, res) => { //arguments de getAll():requete (req) et resultat (res)
    Commande.findAll().then((queryResult) => { // findAll() , then() = fonctions (req = findAll() 												,res=queryResult()
        res.render("index", { commandes: queryResult }) // render=fonction res
    })
};

//controller des creations de commande
controller.create = (req, res) => {
    res.render("create");
}

//controller des mises a jour de commandes
controller.edit = (req, res) => {
    Commande.findByPk(req.params.id).then((commande) => {
        res.render("edit", { commandes: commande })
    })
}

//controller d'affichage d'une commande
controller.store = (req, res) => {
    const commande = {
        name: req.body.name,
        prix: req.body.prix,
        bars_id: req.body.bars_id,
        date: req.body.date,
        status: req.body.status,
    }
}

console.log(commande);

//creation d'une commande
Commande.create(commande).then((commande) => {
    res.redirect('/commandes')
})
    .catch((error) => {
        res.send(error);
    });

//controller de mise a jour
controller.update = (req, res) => {
    const commande = {
        name: req.body.name,
        prix: parseFloat(req.body.prix),
        bars_id: req.body.bars_id,
        date: req.body.date,
        status: req.body.status,
    }
}

//mise a jour d'une commande avec id
Commande.update(commande, { where: { id: req.params.id } })
    .then((commande) => res.redirect('/commandes'))
    .catch((error) => {
        res.send(error);
    });

//controller de suppression d'une commande
controller.destroy = ((req, res) => {
    commande.destroy({ where: { id: req.params.id } })
        .then(() => res.redirect('/commandes')
        );
})

module.exports = controller;