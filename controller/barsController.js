const controller = {};
const { Op, where } = require("sequelize");
const Bars = require("../models/Bars");
const Biere = require("../models/Bieres");

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
        const beers = beersQuery.map(beers => beers.dataValues)
        const averageDegree = beers.reduce((accum, curr) => accum + curr.degree, 0) / beers.length

        res.json(averageDegree);


    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


controller.getBeers = async (req, res) => {
    try {
        const barId = req.params.id_bar;
        const whereOptions = { bars_id: barId };
        let order = [];
        let limit = null;
        let offset = null;

        let prixMin = null;
        let prixMax = null;

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

        console.log(whereOptions)
        const beers = await Biere.findAll({
            where: whereOptions,
            // order: order,
            // limit: limit,
            // offset: offset,
        });

        res.json(beers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = controller;
