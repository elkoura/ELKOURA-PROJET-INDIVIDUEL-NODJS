const controller = {};
const { Op, where } = require("sequelize");
const Bars = require("../models/Bars");
const Biere = require("../models/Bieres");
const BiereCommande = require("../models/BiereCommandes");
const Commande = require("../models/Commandes");

controller.store = async (req, res) => {
  try {
    const { name, adresse, tel, email, description } = req.body;
    const bar = {
      name,
      adresse,
      tel,
      email,
      description,
    };

    const [createdBar, created] = await Bars.findOrCreate({
      where: { name: bar.name },
      defaults: bar,
    });

    if (!created) return res.status(404).json({ error: "Bar already exists" });

    res.setHeader("Content-Type", "application/json");
    return res.status(201).json(createdBar);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

controller.update = async (req, res) => {
  try {
    const selectedBar = await Bars.findByPk(req.params.id_bar);

    if (!selectedBar)
      return res.status(404).json({
        err,
        message: `Le bar avec l'id: '${req.params.id_bar}' n'existe pas.`,
      });

    const updatedBar = req.body;

    const result = await selectedBar.update(updatedBar);

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
        id: barId,
      },
    });

    if (deletedRows === 0) {
      return res.status(404).json({ error: "Bar not found" });
    }

    res.status(200).json({ message: "Bar deleted successfully" });
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
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    return res.json(bars);
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
          date: req.query.date,
        },
        include: Biere,
      });

      let totalDegree = 0;
      let totalCount = 0;

      commandeQuery.forEach((commande) => {
        const sum = commande.bieres?.reduce(
          (accum, biere) => accum + biere.degree,
          0,
        );
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
          [Op.lte]: parseFloat(degree_max),
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
          [Op.lte]: parseFloat(prix_max),
        };
      }
    }

    const beers = await Biere.findAll({
      where: whereOptions,
      order: order,
      limit: limit,
      offset: offset,
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
      whereOptions.prix = {
        ...whereOptions.prix,
        [Op.lte]: parseFloat(req.query.prix_max),
      };
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
};

module.exports = controller;
