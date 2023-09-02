import { Autocomplete } from '../models/autocomplete';

export default function obterCriticidade() {
  return [
    { codigo: 1, nome: 'Baixa' },
    { codigo: 2, nome: 'Média' },
    { codigo: 3, nome: 'Alta' },
  ] as Autocomplete[];
}
