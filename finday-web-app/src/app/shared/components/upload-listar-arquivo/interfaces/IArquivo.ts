export interface IArquivo {
    codigo: number,
    nome: string,
    data: Date,
    dataFormatada: string,
    codigoUsuarioCriacao?: number,
    usuarioCriacao: string,
    codigoTipoDocumento?: number,
    tipoDocumento: string,
    base64: string,
    extensao: string,
}
