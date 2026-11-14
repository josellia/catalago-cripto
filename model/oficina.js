// Repositório em memória: os dados são reiniciados quando o servidor é encerrado.
let oficinas = [];
let proximoId = 1;

async function listar() {
  return oficinas.map((oficina) => ({ ...oficina }));
}
async function buscarPorId(id) {
  const oficina = oficinas.find((item) => item.id === Number(id));
  return oficina ? { ...oficina } : null;
}
async function criar(dados) {
  const oficina = {
    id: proximoId++,
    titulo: dados.titulo.trim(),
    responsavel: dados.responsavel.trim(),
    descricao: dados.descricao.trim(),
    cargaHoraria: Number(dados.cargaHoraria),
    inscricoesAbertas: true,
  };
  oficinas.push(oficina);
  return { ...oficina };
}
async function atualizar(id, dados) {
  const indice = oficinas.findIndex((item) => item.id === Number(id));
  if (indice < 0) return null;
  oficinas[indice] = {
    ...oficinas[indice],
    titulo: dados.titulo.trim(),
    responsavel: dados.responsavel.trim(),
    descricao: dados.descricao.trim(),
    cargaHoraria: Number(dados.cargaHoraria),
  };
  return { ...oficinas[indice] };
}
async function alternarInscricoes(id) {
  const oficina = oficinas.find((item) => item.id === Number(id));
  if (!oficina) return null;
  oficina.inscricoesAbertas = !oficina.inscricoesAbertas;
  return { ...oficina };
}
async function excluir(id) {
  const antes = oficinas.length;
  oficinas = oficinas.filter((item) => item.id !== Number(id));
  return oficinas.length < antes;
}
async function pesquisarPorTitulo(termo) {
  const busca = String(termo || "")
    .trim()
    .toLocaleLowerCase("pt-BR");
  return oficinas
    .filter((item) => item.titulo.toLocaleLowerCase("pt-BR").includes(busca))
    .map((item) => ({ ...item }));
}
async function obterResumo() {
  const abertas = oficinas.filter((item) => item.inscricoesAbertas);
  return {
    total: oficinas.length,
    abertas: abertas.length,
    encerradas: oficinas.length - abertas.length,
    cargaHorariaAbertas: abertas.reduce(
      (total, item) => total + item.cargaHoraria,
      0,
    ),
  };
}
module.exports = {
  listar,
  buscarPorId,
  criar,
  atualizar,
  alternarInscricoes,
  excluir,
  pesquisarPorTitulo,
  obterResumo,
};
