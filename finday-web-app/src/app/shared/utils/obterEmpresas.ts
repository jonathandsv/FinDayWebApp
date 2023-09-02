import { Autocomplete } from '../models/autocomplete';

export default function obterEmpresas() {
  return [
    { codigo: '1', nome: 'Cast' },
    { codigo: 2, nome: 'Google' },
    { codigo: 3, nome: 'Facebook' },
    { codigo: 4, nome: 'Microsoft' },
    { codigo: 5, nome: 'Amazon' },
  ] as Autocomplete[];
}
