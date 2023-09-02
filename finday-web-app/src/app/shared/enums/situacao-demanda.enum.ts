export enum SituacaoDemandaEnum {
  AUTORIZADA = 1,
  DEVOLVIDA_PARA_AJUSTE = 2,
  CANCELADA = 3,
  EM_ATENDIMENTO = 4,
  EM_IMPEDIMENTO = 5,
  EM_HOMOLOGACAO = 6,
  HOMOLOGACAO_APROVADA = 7,
  EM_PRODUCAO = 8,
  DEMANDA_CONCLUIDA = 9,
  DEMANDA_AJUSTADA = 10,
  IMPEDIMENTO_CONCLUIDO = 11,
  HOMOLOGACAO_RECUSADA = 12,
  PRODUCAO_RECUSADA = 13,
  RECURSO_PROPIO_ATENDIMENTO = 14,
  RECURSO_PROPIO_HOMOLOGACAO_APROVAR = 15,
  RECURSO_PROPIO_HOMOLOGACAO_APROVADA = 16,
  RECURSO_PROPIO_HOMOLOGACAO_RECUSADA = 17,
  RECURSO_PROPIO_PRODUCAO_APROVAR = 18,
  RECURSO_PROPIO_PRODUCAO_APROVADA = 19,
  RECURSO_PROPIO_PRODUCAO_RECUSADA = 20,
  RECURSO_PROPIO_DEMANDA_CONCLUIDA = 21,
  RECURSO_PROPIO_CANCELADA = 22
}

export const SituacaoDemandaRecursoProprioDescricao = new Map<string, string>([
  ['RECURSO_PROPIO_ATENDIMENTO', 'Atendimento com recurso próprio'],
  ['RECURSO_PROPIO_HOMOLOGACAO_APROVAR', 'Homologação a aprovar - recurso próprio'],
  ['RECURSO_PROPIO_HOMOLOGACAO_APROVADA', 'Homologação aprovada - recurso próprio'],
  ['RECURSO_PROPIO_HOMOLOGACAO_RECUSADA', 'Homologação rejeitada - recurso próprio'],
  ['RECURSO_PROPIO_PRODUCAO_APROVAR', 'Produção a aprovar - recurso próprio'],
  ['RECURSO_PROPIO_PRODUCAO_APROVADA', 'Produção aprovada - recurso próprio'],
  ['RECURSO_PROPIO_PRODUCAO_RECUSADA', 'Produção rejeitada - recurso próprio'],
  ['RECURSO_PROPIO_DEMANDA_CONCLUIDA', 'Demanda concluída com recurso próprio'],
  ['RECURSO_PROPIO_CANCELADA', 'Cancelada com recurso próprio'],
]);

export const listaSituacaoDemandaRecursoProprio = Object.entries(SituacaoDemandaEnum).map(([key, value]) => {
  return { codigo: Number(value), nome: SituacaoDemandaRecursoProprioDescricao.get(key)};
}).filter((x) => x.nome != null);

