import { Autocomplete } from '../models/autocomplete';

export default function obterTiposTarefa() {
  return [
    { codigo: '3', nome: 'Estória Técnica' },
    { codigo: 4, nome: 'Estória de Usuário' },
    { codigo: 5, nome: 'Tarefa' },
  ] as Autocomplete[];
}
