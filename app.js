const express = require("express");
const path = require("path");
const { engine } = require("express-handlebars");
const createError = require("http-errors");
const indexRouter = require("./routes/index");
const oficinasRouter = require("./routes/oficinas");
const sobreRouter = require("./routes/sobre");
const pesquisaRouter = require("./routes/pesquisa");

const app = express();
app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    defaultLayout: "main",
    layoutsDir: path.join(__dirname, "views/layouts"),
    helpers: {
      eq: (a, b) => String(a) === String(b),
      formatStatus: (abertas) => (abertas ? "Abertas" : "Encerradas"),
      active: (current, expected) => (current === expected ? "active" : ""),
    },
  }),
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  "/vendor/bootstrap",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist")),
);

app.use("/", indexRouter);
app.use("/oficinas", oficinasRouter);
app.use("/sobre", sobreRouter);
app.use("/pesquisa", pesquisaRouter);

app.use((req, res, next) => next(createError(404, "Página não encontrada")));
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render("error", {
    title: "Erro",
    message: err.message,
    error: app.get("env") === "development" ? err : {},
  });
});
module.exports = app;
