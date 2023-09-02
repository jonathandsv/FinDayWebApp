import { Autocomplete } from '../models/autocomplete';

export default function obterCelulas() {
  return [
    { codigo: 1, nome: 'CÉLULA X' },
    { codigo: 2, nome: 'CÉLULA Y' },
    { codigo: 3, nome: 'CÉLULA Z' },
  ] as Autocomplete[];
}
