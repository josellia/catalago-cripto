const router = require("express").Router();
const Oficina = require("../model/oficina");
router.get("/", (req, res) =>
  res.render("pesquisa", {
    title: "Pesquisa",
    active: "pesquisa",
    pesquisou: false,
  }),
);
router.post("/", async (req, res, next) => {
  try {
    const termo = String(req.body.termo || "").trim();
    if (!termo)
      return res
        .status(400)
        .render("pesquisa", {
          title: "Pesquisa",
          active: "pesquisa",
          termo,
          pesquisou: true,
          erro: "Digite um termo para pesquisar.",
        });
    const resultados = await Oficina.pesquisarPorTitulo(termo);
    res.render("pesquisa", {
      title: "Pesquisa",
      active: "pesquisa",
      termo,
      resultados,
      pesquisou: true,
    });
  } catch (error) {
    next(error);
  }
});
module.exports = router;
