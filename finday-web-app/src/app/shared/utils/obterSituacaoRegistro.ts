import { Autocomplete } from '../models/autocomplete';

export default function obterSituacaoRegistro() {
  return [
    { codigo: 1, nome: 'Registrada' },
    { codigo: 2, nome: 'Em atendimento' },
    { codigo: 3, nome: 'Cancelada' },
    { codigo: 4, nome: 'Concluída' },
  ] as Autocomplete[];
}
