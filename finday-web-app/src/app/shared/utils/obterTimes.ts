import { Autocomplete } from '../models/autocomplete';

export default function obterTimes() {
  return [
    { codigo: '1', nome: 'SQUAD 001' },
    { codigo: 2, nome: 'SQUAD 002' },
    { codigo: 3, nome: 'SQUAD 003' },
    { codigo: 4, nome: 'SQUAD 004' },
    { codigo: 5, nome: 'SQUAD 005' },
  ] as Autocomplete[];
}
