const router = require("express").Router();
router.get("/", (req, res) =>
  res.render("sobre", {
    title: "Sobre",
    active: "sobre",
    autor: "Josélia Pires",
  }),
);
module.exports = router;
