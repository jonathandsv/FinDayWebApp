export enum EtapaKanbanEnum {
  AFAZER = 1,
  FAZENDO = 2,
  IMPEDIMENTO = 3,
  HOMOLOGACAO = 4,
  PRODUCAO = 5,
  CONCLUIDO = 6,
  CANCELADA = 7
}

export const EtapaKanbanEnumDescricao = new Map<string, string>([
  ['AFAZER', 'A Fazer'],
  ['FAZENDO', 'Fazendo'],
  ['IMPEDIMENTO', 'Impedimento'],
  ['HOMOLOGACAO', 'Homologação'],
  ['PRODUCAO', 'Produção'],
  ['CONCLUIDO', 'Concluída'],
  ['CANCELADA', 'Cancelada'],
]);

export const listaEtapaKanban = Object.entries(EtapaKanbanEnum).map(([key, value]) => {
  return { codigo: Number(value), nome: EtapaKanbanEnumDescricao.get(key)};
}).filter((x) => x.nome != null);

