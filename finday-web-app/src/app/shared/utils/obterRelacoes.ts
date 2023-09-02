import { Autocomplete } from '../models/autocomplete';

export default function obterRelacoes() {
  return [
    { codigo: 5, nome: 'Consultoria Externa' },
    { codigo: 2, nome: 'Estagiário' },
    { codigo: 4, nome: 'Pessoa Jurídica' },
    { codigo: 3, nome: 'Servidor Público' },
    { codigo: 1, nome: 'Terceirizado' },

  ] as Autocomplete[];
}