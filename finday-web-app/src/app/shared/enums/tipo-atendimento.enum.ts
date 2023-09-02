export enum TipoAtendimentoEnum {
  PROJETO = 1,
  SUSTENTACAO = 2,
  RECURSO_PROPRIO = 3,
}

export const TipoAtendimentoDescricao = new Map<string, string>([
  ['PROJETO', 'Projeto'],
  ['SUSTENTACAO', 'Sustentação'],
  ['RECURSO_PROPRIO', 'Recurso próprio'],
]);

export const listaTipoAtendimentoDescricao = Object.entries(TipoAtendimentoEnum).map(([key, value]) => {
  return { codigo: Number(value), nome: TipoAtendimentoDescricao.get(key)};
}).filter((x) => x.nome != null);

export const listaTipoAtendimentoSemProjetoDescricao = Object.entries(TipoAtendimentoEnum).map(([key, value]) => {
  return { codigo: Number(value), nome: TipoAtendimentoDescricao.get(key)};
}).filter(x => x.codigo != TipoAtendimentoEnum.PROJETO).filter((x) => x.nome != null);
