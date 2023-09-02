import { Autocomplete } from '../models/autocomplete';

export default function obterProfissionais() {
  return [
    { codigo: '1', nome: 'Liciane' },
    { codigo: 2, nome: 'Gleisse' },
    { codigo: 3, nome: 'Flávio' },
    { codigo: 4, nome: 'Evellyn' },
    { codigo: 5, nome: 'Douglas' },
    { codigo: 6, nome: 'Elildo' },
  ] as Autocomplete[];
}
