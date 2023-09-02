import { capitalize } from './capitalize';

export function formatarBreadcrumb(url: string) {
  let currentPage = url === '/' ? '' : url;
  let currentPageArray = currentPage.split('/').filter(x => x);
  let currentPageArrayFinal = currentPageArray;


  if (currentPageArray.length > 2) {
    currentPageArrayFinal = currentPageArray.slice(0, -1);
  }
  return currentPageArrayFinal.map((url) => {
    switch (url) {
      case 'area':
        url = 'Área'
        break;
      case 'celula':
        url = 'Célula'
        break;
      case 'pre-demanda':
        url = 'Pré-Demanda'
        break;
      case 'relatorio-atendimento-sustentacao':
        url = 'Relatório de Atendimento de Sustentação'
        break;
      case 'valor-atendimento':
        url = 'Valor Atendimento'
        break;
    }
    return capitalize(url);
  })
    .join(' > ');

}
