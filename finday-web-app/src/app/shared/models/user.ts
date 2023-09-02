export class Usuario {
  codigo?: number;
  login?: string;
  nome?: string;
  apelido?: string;
  email?: string;
  cpf?: string;
  codigoDominio?: number;
  codigoEmpresa?: number;
  inRelacaoContratual: number;
  codigoPapelProfissional: number;
  numeroTelefoneContato: string;
  numeroTelefoneContatoAux: string;
  nomepapel?: string;
  perfil?: Perfil;
  ehPraMostrarHome?: string;
}
export interface Perfil {
  nome: string;
  funcionalidades?: Funcionalidade[]
}
export interface Funcionalidade {
  nome: string;
  acoes: string[];
}
