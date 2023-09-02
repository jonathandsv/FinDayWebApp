import { Autocomplete } from '../models/autocomplete';

export default function obterMotivacaoRegistro() {
  return [
    { codigo: '1', nome: 'Projeto' },
    { codigo: 2, nome: 'Sustentação' },
  ] as Autocomplete[];
}
