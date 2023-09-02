import { Autocomplete } from '../models/autocomplete';

export default function obterTipoSustentacao() {
  return [
    { codigo: '', nome: 'Selecione...', descricao: 'Selecione...' },
    { codigo: 1, nome: 'Serviço Eventual' },
    { codigo: 2, nome: 'Critica' },
    { codigo: 3, nome: 'Emergencial' },
  ] as Autocomplete[];
}
