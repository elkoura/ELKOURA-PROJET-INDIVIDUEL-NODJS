const Bars = require("../models/Bars");

const controller = {};

controller.store = (req, res) => {
  const bar = {
    name: req.body.name,
    adresse: req.body.adresse,
    tel: req.body.tel,
    email: req.body.email,
    price: req.body.price,
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

module.exports = controller;
