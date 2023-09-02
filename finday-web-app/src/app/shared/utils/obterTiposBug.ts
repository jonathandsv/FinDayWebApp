import { Autocomplete } from '../models/autocomplete';

export default function obterTiposBug() {
  return [
    { codigo: '1', nome: 'Erro Funcional' },
    { codigo: 2, nome: 'Erro de Interface/Layout' },
  ] as Autocomplete[];
}
