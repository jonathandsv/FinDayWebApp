import { Autocomplete } from '../models/autocomplete';

export default function obterTipoAtendimento() {
  return [
    { codigo: null, nome: "Selecione" },
    { codigo: 1, nome: 'Projeto', descricao: 'Projeto' },
    { codigo: 2, nome: 'Sustentação', descricao: 'Sustentação' },
    { codigo: 3, nome: 'Recurso próprio', descricao: 'Recurso próprio' },
  ] as Autocomplete[];
}
