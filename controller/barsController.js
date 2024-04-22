const controller = {};
const Bars = require("../models/Bars");

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

module.exports = controller;
