import { Autocomplete } from '../models/autocomplete';

export function obterMeses() {
  return [
    { codigo: 1, nome: 'Janeiro' },
    { codigo: 2, nome: 'Fevereiro' },
    { codigo: 3, nome: 'Março' },
    { codigo: 4, nome: 'Abril' },
    { codigo: 5, nome: 'Maio' },
    { codigo: 6, nome: 'Junho' },
    { codigo: 7, nome: 'Julho' },
    { codigo: 8, nome: 'Agosto' },
    { codigo: 9, nome: 'Setembro' },
    { codigo: 10, nome: 'Outubro' },
    { codigo: 11, nome: 'Novembro' },
    { codigo: 12, nome: 'Dezembro' },
  ] as Autocomplete[];
}

export function obterAnos() {
    return montarAnos();
}

function montarAnos() {
    let arrayAnos: Autocomplete[] = [];
    const ANOINICIAL = 2023;
    const ANOATUAL = new Date().getFullYear();
    const QTDANOS = (ANOATUAL - ANOINICIAL);
    
    arrayAnos.push({
        codigo: ANOINICIAL,
        nome: (ANOINICIAL).toString()
    });

    for (let i = 0; i < QTDANOS; i++) {
        arrayAnos.push({
            codigo: ANOINICIAL + (i + 1),
            nome: (ANOINICIAL + (i + 1)).toString()
        })
    }
    return arrayAnos;
}