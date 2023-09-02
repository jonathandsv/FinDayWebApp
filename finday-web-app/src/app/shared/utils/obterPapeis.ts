import { Autocomplete } from '../models/autocomplete';

export default function obterPapeis() {
  return [
    { codigo: '1', nome: 'Apoio a Requisito' },
    { codigo: 2, nome: 'Arquiteto' },
    { codigo: 3, nome: 'Desenvolvedor' },
    { codigo: 4, nome: 'Lider Técnico' },
    { codigo: 5, nome: 'Product Owner' },
    { codigo: 6, nome: 'Scrum Master' },
    { codigo: 7, nome: 'Testador' },
  ] as Autocomplete[];
}
