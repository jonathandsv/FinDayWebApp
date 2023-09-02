import { Autocomplete } from '../models/autocomplete';

export default function obterUnidadeDemandante() {
  return [
    { codigo: 1, nome: 'COMTIC' },
    { codigo: 2, nome: 'COSAD' },
    { codigo: 3, nome: 'DIRSF' },
    { codigo: 4, nome: 'DISIC' },
    { codigo: 5, nome: 'DISIT' },
    { codigo: 6, nome: 'INOVA' },
  ] as Autocomplete[];
}
