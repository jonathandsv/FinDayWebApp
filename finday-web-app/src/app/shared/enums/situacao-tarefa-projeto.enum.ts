import { Autocomplete } from "../models/autocomplete";

export enum SituacaoTarefaProjetoEnum {
  AUTORIZADA = 1,
  REFINADA = 2,
  BACKLOG_SPRINT_ATUAL = 3,
  EM_DESENVOLVIMENTO = 4,
  EM_TESTE_FABRICA = 5,
  EM_AMBIENTE_HOMOLOGACAO = 6, // old bug
  HOMOLOGADO = 7, // old homologado
  EM_AMBIENTE_PRODUCAO = 8, // old teste homologacao
  CONCLUIDO = 9,
  BUG = 10, // old Impedimento
  IMPEDIMENTO = 11
}

export const SituacaoTarefaEnumDescricao = new Map<string, string>([
  ['AUTORIZADA', '1-  Autorizada'],
  ['REFINADA', '2 - Refinada'],
  ['BACKLOG_SPRINT_ATUAL', '3 - Backlog - Sprint atual'],
  ['EM_DESENVOLVIMENTO', '4 - Em desenvolvimento'],
  ['EM_TESTE_FABRICA', '5 - Em teste - Fábrica'],
  ['EM_AMBIENTE_HOMOLOGACAO', '6 - Em ambiente de homologação'],
  ['HOMOLOGADO', '7 - Homologada'],
  ['EM_AMBIENTE_PRODUCAO', '8 - Em ambiente de produção'],
  ['CONCLUIDO', '9 - Concluída'],
  ['BUG', 'Bug'],
  ['IMPEDIMENTO', 'Impedimento']
]);

export const listaEtapaTarefaProjetoEnum: Autocomplete[] = Object.entries(SituacaoTarefaProjetoEnum).map(([key, value]) => {
  return { codigo: Number(value), nome: SituacaoTarefaEnumDescricao.get(key)};
}).filter((x) => x.nome != null);


