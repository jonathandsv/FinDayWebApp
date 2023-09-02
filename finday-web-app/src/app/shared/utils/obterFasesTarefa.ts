import { Autocomplete } from '../models/autocomplete';

export default function obterFasesTarefa() {
  return [
    { codigo: '0', nome: 'Backlog' },
    { codigo: 1, nome: 'A Fazer' },
    { codigo: 2, nome: 'Fazendo' },
    { codigo: 3, nome: 'Concluída' },
    { codigo: 4, nome: 'Cancelada' },
  ] as Autocomplete[];
}
