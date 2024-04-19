const Bars = require("../models/Bars");

const controller = {};

controller.store = (req, res) => {
  const bar = {
    name: req.body.name,
    adresse: req.body.adresse,
    tel: req.body.tel,
    email: req.body.email,
    description: req.body.description,
  };

  console.log(bar);

  Bars.create(bar)
    .then((bar) => {
      res.json(bar);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};

controller.update = (req, res) => {
  const updatedBar = {
    name: req.body.name,
    adresse: req.body.adresse,
    tel: req.body.tel,
    email: req.body.email,
    description: req.body.description,
  };

  Bars.update(updatedBar, { where: { id: req.params.id_bar } })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};

controller.delete = (req, res) => {
  const barId = req.params.id_bar;

  Bars.destroy({
    where: {
      id: barId,
    },
  })
    .then((deletedRows) => {
      if (deletedRows === 0) {
        return res.status(404).json({ error: "Bar not found" });
      }
      res.json({ message: "Bar deleted successfully" });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};

controller.getAll = (req, res) => {
  Bars.findAll()
    .then((bars) => {
      res.json(bars);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};

controller.getOne = (req, res) => {
  const barId = req.params.id_bar;

  Bars.findByPk(barId)
    .then((bar) => {
      if (!bar) {
        return res.status(404).json({ error: "Bar not found" });
      }
      res.json(bar);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};

module.exports = controller;
