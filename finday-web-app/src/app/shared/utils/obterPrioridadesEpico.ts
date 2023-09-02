import { Autocomplete } from '../models/autocomplete';

export default function obterPrioridadesEpico() {
  return [
    { codigo: '1', nome: 'Alta' },
    { codigo: 2, nome: 'Média' },
    { codigo: 3, nome: 'Baixa' },
  ] as Autocomplete[];
}
