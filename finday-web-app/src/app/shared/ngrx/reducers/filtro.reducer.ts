import { createAction, createReducer, on, props } from "@ngrx/store";


export interface IFiltro {
  nome: string;
  filtro: any;
  paginacao: any;
}

export const filtroInitialState: IFiltro = {
  nome: '',
  filtro: '',
  paginacao: ''
}


export const adicionarFiltro = createAction('[Filtro paginacao] Adicionar filtro', props<{nome: string, filtro: any, paginacao: any }>());
export const limparFiltroSalvo = createAction('[Filtro paginacao] Limpar filtro');

export const filtroReducer = createReducer(
  filtroInitialState,
  on(adicionarFiltro, (state, action) => {
  return {
    ...state,
    nome: action.nome,
    filtro: action.filtro,
    paginacao: action.paginacao
  }
}),
on(limparFiltroSalvo, (state) => filtroInitialState)
);
