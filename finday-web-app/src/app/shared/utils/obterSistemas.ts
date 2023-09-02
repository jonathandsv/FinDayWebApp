import { Autocomplete } from '../models/autocomplete';

export default function obterSistemas() {
  return [
    { codigo: '1', nome: 'Oásis Ágil' },
    { codigo: 2, nome: 'SIGEST' },
    { codigo: 3, nome: 'SIGGO' },
    { codigo: 4, nome: 'AFC' },
    { codigo: 5, nome: 'PSV' },
    { codigo: 6, nome: 'SITAF' },
    { codigo: 7, nome: 'SAG' },
  ] as Autocomplete[];
}
