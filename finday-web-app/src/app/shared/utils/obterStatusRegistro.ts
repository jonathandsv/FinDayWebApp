import { Autocomplete } from '../models/autocomplete';

export default function obterStatusRegistro() {
  return [
    { codigo: -1, nome: 'Todos' },
    { codigo: 1, nome: 'Ativo' },
    { codigo: 0, nome: 'Inativo' },
  ] as Autocomplete[];
}
