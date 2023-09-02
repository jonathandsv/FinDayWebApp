import { Autocomplete } from '../models/autocomplete';

export default function obterPrioridadesBug() {
  return [
    { codigo: '1', nome: 'Urgente' },
    { codigo: 2, nome: 'Alta' },
    { codigo: 3, nome: 'Média' },
    { codigo: 4, nome: 'Baixa' },
  ] as Autocomplete[];
}
