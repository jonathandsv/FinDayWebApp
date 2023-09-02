import { StatusEnum } from "src/app/shared/enums/status.enum";
import { IEtiqueta } from "../components/etiquetas/interfaces/etiqueta.interface";

export interface IComentarioInput {
  codigoTarefa?: number,
  codigoProfissional?: number,
  descricao?: string,
  listaEtiquetas?: IEtiqueta[],
}
export interface IRespostaComentarioInput {
  codigoTarefa?: number,
  codigoProfissional?: number,
  descricao?: string,
  codigoComentario?: number,
  codigoRespostaComentarioPai?: number,
}

export interface IComentarioRetorno {
  adicionado: boolean,
}

export interface IComentario {
  codigo?: number,
  codigoTarefa?: number,
  dataCriacao?: any,
  dataCriacaoFormatada?: any,
  descricao?: string,
  
  codigoProfissional?: number,
  email?: string,
  cpf?: string,
  nome?: string,
  etiquetas?: IEtiqueta[],
  respostaComentario?: IRespostaComentario[],

  comentador?: IComentador
  mostrarResponderComentario?: boolean
  temResposta?: boolean,
  eResposta?: boolean
}

export interface IComentador {
  codigo?: number,
  base64?: string,
}

export interface IRespostaComentario {
  codigo: number;
  codigoTarefa?: number;
  codigoProfissional: number;
  nome: string;
  codigoRespostaComentarioPai?: number;
  codigoComentario?: number;
  dataCriacao: any;
  descricao: string;
  dataCriacaoFormatada?: any,
  etiquetas?: IEtiqueta[],
  respostaComentario?: IRespostaComentario[],

  codigoProfissionalRespondido?: number,
  nomeProfissionalRespondido?: string,
  comentador?: IComentador,
  mostrarResponderComentario?: boolean
  temResposta?: boolean,
  codigoComentarioPai?: number,
  eResposta?: boolean,
}

export interface IComentarioOutput {
  comentarios?: IComentario[],
  comentadores?: IComentador[]
}
