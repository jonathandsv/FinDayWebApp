import { StatusEnum } from "src/app/shared/enums/status.enum";
import { TipoAtendimentoEnum } from "src/app/shared/enums/tipo-atendimento.enum";

export interface IFiltroAutocomplete {
  nome?: string;
  descricao?: string;
  ativo?: StatusEnum;
  ehPraFiltrarPorPapelProfissional?: boolean;
  semCadastroPorUsuarioPadrao?: boolean;
  ehParaConterCelulas?: boolean;
  timesSemCelulasVinculadas?: boolean;
  tipoAtendimento?: TipoAtendimentoEnum;
  comDemandasConcluidas?: boolean;
  mes?: number;
  ano?: number;
  areaTiVinculadaSistema?: boolean
}
