export interface IMenu {
  nome: string;
  icone: string;
  ordem: number;
  funcionalidades: IFuncionalidadeItem[];
}
export interface IFuncionalidadeItem {
  nome: string;
  rota: string;
  icone: string;
  ordem: number;
  acoes: IAcaoItem[];
}

export interface IAcaoItem {
  nome: string;
}
