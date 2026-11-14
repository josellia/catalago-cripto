const Oficina = require("../model/oficina");

function validar(dados) {
  const titulo = String(dados.titulo || "").trim();
  const responsavel = String(dados.responsavel || "").trim();
  const descricao = String(dados.descricao || "").trim();
  const cargaHoraria = Number(dados.cargaHoraria);
  const erros = [];
  if (!titulo) erros.push("Informe o título da oficina.");
  if (!responsavel) erros.push("Informe o nome da pessoa responsável.");
  if (!descricao) erros.push("Informe a descrição da atividade.");
  if (!Number.isInteger(cargaHoraria) || cargaHoraria < 1 || cargaHoraria > 40)
    erros.push("A carga horária deve ser um número inteiro entre 1 e 40.");
  return { erros, dados: { titulo, responsavel, descricao, cargaHoraria } };
}

exports.inicio = async (req, res, next) => {
  try {
    const [oficinas, resumo] = await Promise.all([
      Oficina.listar(),
      Oficina.obterResumo(),
    ]);
    const somenteAbertas = req.query.filtro === "abertas";
    const exibidas = somenteAbertas
      ? oficinas.filter((item) => item.inscricoesAbertas)
      : oficinas;
    res.render("index", {
      title: "Início",
      active: "inicio",
      oficinas: exibidas,
      resumo,
      somenteAbertas,
      catalogoVazio: oficinas.length === 0,
      nenhumaAberta:
        somenteAbertas && oficinas.length > 0 && exibidas.length === 0,
    });
  } catch (error) {
    next(error);
  }
};
exports.formNova = (req, res) =>
  res.render("oficinas/form", {
    title: "Nova oficina",
    active: "nova",
    acao: "/oficinas",
    botao: "Cadastrar oficina",
  });
exports.criar = async (req, res, next) => {
  try {
    const resultado = validar(req.body);
    if (resultado.erros.length)
      return res
        .status(400)
        .render("oficinas/form", {
          title: "Nova oficina",
          active: "nova",
          acao: "/oficinas",
          botao: "Cadastrar oficina",
          oficina: req.body,
          erros: resultado.erros,
        });
    await Oficina.criar(resultado.dados);
    res.redirect("/");
  } catch (error) {
    next(error);
  }
};
exports.detalhes = async (req, res, next) => {
  try {
    const oficina = await Oficina.buscarPorId(req.params.id);
    if (!oficina)
      return res
        .status(404)
        .render("error", {
          title: "Não encontrada",
          message: "Oficina não encontrada.",
        });
    res.render("oficinas/detalhes", { title: "Detalhes da oficina", oficina });
  } catch (error) {
    next(error);
  }
};
exports.formEditar = async (req, res, next) => {
  try {
    const oficina = await Oficina.buscarPorId(req.params.id);
    if (!oficina)
      return res
        .status(404)
        .render("error", {
          title: "Não encontrada",
          message: "Oficina não encontrada.",
        });
    res.render("oficinas/form", {
      title: "Editar oficina",
      oficina,
      acao: `/oficinas/${oficina.id}/editar`,
      botao: "Salvar alterações",
    });
  } catch (error) {
    next(error);
  }
};
exports.atualizar = async (req, res, next) => {
  try {
    const atual = await Oficina.buscarPorId(req.params.id);
    if (!atual)
      return res
        .status(404)
        .render("error", {
          title: "Não encontrada",
          message: "Oficina não encontrada.",
        });
    const resultado = validar(req.body);
    if (resultado.erros.length)
      return res
        .status(400)
        .render("oficinas/form", {
          title: "Editar oficina",
          oficina: { ...atual, ...req.body },
          acao: `/oficinas/${atual.id}/editar`,
          botao: "Salvar alterações",
          erros: resultado.erros,
        });
    await Oficina.atualizar(req.params.id, resultado.dados);
    res.redirect("/");
  } catch (error) {
    next(error);
  }
};
exports.alternar = async (req, res, next) => {
  try {
    await Oficina.alternarInscricoes(req.params.id);
    res.redirect("/");
  } catch (error) {
    next(error);
  }
};
exports.excluir = async (req, res, next) => {
  try {
    await Oficina.excluir(req.params.id);
    res.redirect("/");
  } catch (error) {
    next(error);
  }
};
