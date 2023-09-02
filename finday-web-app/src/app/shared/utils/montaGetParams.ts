export function montaGetParams(parametros: any) {
  return Object.keys(parametros)
    .map((k) => `${k}=${encodeURI(parametros[k])}`)
    .reduce((a, b) => a + '&' + b);
}
