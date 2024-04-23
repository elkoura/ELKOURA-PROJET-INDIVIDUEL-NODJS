const controller = {};
const { Op, where } = require("sequelize");
const Bars = require("../models/Bars");
const Biere = require("../models/Bieres");
const BiereCommande = require("../models/BiereCommandes");
const Commande = require("../models/Commandes");

const Sequelize = require('sequelize');
const Op = Sequelize.Op;


controller.store = async (req, res) => {
    try {
        const bar = {
            name: req.body.name,
            adresse: req.body.adresse,
            tel: req.body.tel,
            email: req.body.email,
            description: req.body.description
        };

        const createdBar = await Bars.create(bar);
        res.json(createdBar);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

controller.update = async (req, res) => {
    try {
        const selectedBar = await Bars.findByPk(req.params.id_bar);
        const updatedBar = {
            name: req.body.name ?? selectedBar.name,
            adresse: req.body.adresse ?? selectedBar.adresse,
            tel: req.body.tel ?? selectedBar.tel,
            email: req.body.email ?? selectedBar.email,
            description: req.body.description ?? selectedBar.description
        };

        const result = await Bars.update(updatedBar, { where: { id: req.params.id_bar } });
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

controller.delete = async (req, res) => {
    try {
        const barId = req.params.id_bar;

        const deletedRows = await Bars.destroy({
            where: {
                id: barId
            }
        });

        if (deletedRows === 0) {
            return res.status(404).json({ error: "Bar not found" });
        }
        res.json({ message: "Bar deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

controller.getAll = async (req, res) => {
    try {
        const whereOptions = {};
        if (req.query.adresse) {
            whereOptions.adresse = req.query.adresse;
        }
        if (req.query.name) {
            whereOptions.name = req.query.name;
        }

        const bars = await Bars.findAll({ where: whereOptions });

        res.json(bars);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

controller.getOne = async (req, res) => {
    try {
        const barId = req.params.id_bar;

        const bar = await Bars.findByPk(barId);
        if (!bar) {
            return res.status(404).json({ error: "Bar not found" });
        }
        res.json(bar);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

controller.getAverageDegree = async (req, res) => {
    try {
        const barId = req.params.id_bar;
        const beersQuery = await Biere.findAll({ where: { bars_id: barId } });
        const beers = beersQuery.map((beers) => beers.dataValues);
        const degreeReducer = beers.reduce((accum, curr) => accum + curr.degree, 0);
        const averageDegree = degreeReducer / beers.length;

        let averageDegreeWithDate;
        if (req.query.date) {
            const commandeQuery = await Commande.findAll({
                where: {
                    bars_id: barId,
                    date: req.query.date
                },
                include: Biere
            });

            let totalDegree = 0;
            let totalCount = 0;

            commandeQuery.forEach((commande) => {
                const sum = commande.bieres?.reduce((accum, biere) => accum + biere.degree, 0);
                totalDegree += sum;
                totalCount += commande.bieres.length;
            });

            averageDegreeWithDate = totalDegree / totalCount;
        }

        res.json(averageDegreeWithDate ?? averageDegree);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
//Degré d'alcool moyen des bières d'un bar avec un prix compris entre un minimum et un maximum
controller.getAverageDegreeWithPriceRange = async (req, res) => {
    try {
        const { id_bar } = req.params;
        const { prix_min, prix_max } = req.query;

        const beers = await Biere.findAll({
            where: {
                bars_id: id_bar,
                prix: {
                    [Sequelize.Op.between]: [prix_min, prix_max]
                }
            }
        });

        const averageDegree = beers.reduce((total, next) => total + next.degree, 0) / (beers.length || 1);

        res.json({ averageDegree });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// Degré d'alcool moyen des bières des commandes d'un bar à une date donnée
controller.getAverageDegreeByDate = async (req, res) => {
    try {
        const { id_bar } = req.params;
        const { date } = req.query;

        // Supposons que vous avez un modèle Commande qui peut être joint à Biere via Biere_Commande
        const orders = await Commande.findAll({
            where: {
                bars_id: id_bar,
                date
            },
            include: [{
                model: Biere,
                as: 'bieres',
                through: { attributes: [] } // Ne pas inclure d'attributs de la table de liaison
            }]
        });

        // Vous devez calculer la moyenne des degrés des bières pour ces commandes
        let totalDegree = 0;
        let totalBeers = 0;
        orders.forEach(order => {
            order.bieres.forEach(beer => {
                totalDegree += beer.degree;
                totalBeers += 1;
            });
        });

        const averageDegree = totalDegree / (totalBeers || 1);

        res.json({ averageDegree });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//Liste des commandes d'un bar à une date donnée avec un prix compris entre deux valeurs 
controller.getOrdersByDateAndPriceRange = async (req, res) => {
    try {
        const { id_bar } = req.params;
        const { date, prix_min, prix_max } = req.query;

        const orders = await Commande.findAll({
            where: {
                bars_id: id_bar,
                date,
                prix: {
                    [Sequelize.Op.between]: [prix_min, prix_max]
                }
            }
        });

        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

controller.getFilteredOrders = async (req, res) => {
    try {
        // Récupération des paramètres de la requête.
        const { id_bar } = req.params;
        const { date, prix_min, prix_max, status, name } = req.query;

        // Recherche des commandes qui correspondent aux critères de filtre spécifiés.
        const orders = await Commande.findAll({
            where: {
                bars_id: id_bar,
                date: date,
                prix: {
                    [Sequelize.Op.between]: [prix_min, prix_max]
                },
                status: status,
                name: {
                    [Sequelize.Op.like]: `%${name}%`
                }
            }
        });

        // Envoi des commandes filtrées.
        res.json(orders);
    } catch (err) {
        // Gestion des erreurs.
        res.status(500).json({ error: err.message });
    }
};

controller.getBeersWithQueryParams = async (req, res) => {
    try {
        const barId = req.params.id_bar;
        const whereOptions = { bars_id: barId };
        let order = [];
        let limit = null;
        let offset = null;

        if (req.query.sort) {
            order.push(["name", req.query.sort]);
        }
        if (req.query.limit) {
            limit = parseInt(req.query.limit);
        }
        if (req.query.offset) {
            offset = parseInt(req.query.offset);
        }

        if (req.query.degree_min || req.query.degree_max) {
            const { degree_min, degree_max } = req.query;
            whereOptions.degree = {};
            if (degree_min) {
                whereOptions.degree = { [Op.gte]: parseFloat(degree_min) };
            }

            if (degree_max) {
                whereOptions.degree = {
                    ...whereOptions.degree,
                    [Op.lte]: parseFloat(degree_max)
                };
            }
        }

        if (req.query.prix_min || req.query.prix_max) {
            const { prix_min, prix_max } = req.query;
            whereOptions.prix = {};
            if (prix_min) {
                whereOptions.prix = { [Op.gte]: parseFloat(prix_min) };
            }

            if (prix_max) {
                whereOptions.prix = {
                    ...whereOptions.prix,
                    [Op.lte]: parseFloat(prix_max)
                };
            }
        }

        const beers = await Biere.findAll({
            where: whereOptions,
            order: order,
            limit: limit,
            offset: offset
        });

        res.json(beers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

controller.orderQuery = async (req, res) => {

    const barId = req.params.id_bar;
    const whereOptions = { bars_id: barId };

    if (req.query.date) {
        whereOptions.date = req.query.date;
    }

    if (req.query.prix_min || req.query.prix_max) {
        whereOptions.prix = {};
        if (req.query.prix_min) {
            whereOptions.prix = { [Op.gte]: parseFloat(req.query.prix_min) };
        }
        if (req.query.prix_max) {
            whereOptions.prix = { ...whereOptions.prix, [Op.lte]: parseFloat(req.query.prix_max) };
        }
    }

    if (req.query.status) {
        whereOptions.status = req.query.status;
    }

    if (req.query.name) {
        whereOptions.name = { [Op.like]: `%${req.query.name}%` };
    }

    const commandes = await Commande.findAll({ where: whereOptions });

    res.json(commandes);
}


module.exports = controller;
