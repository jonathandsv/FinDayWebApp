export interface Sistema {
    
    inMotivacao?: number;
    coSqSistema?: number;
    noSistema: string;
    deSistema: string;
    productOwner?: number;
    productOwnerSubstituto?: number;
    liderTec?: number;
    liderTecSubstituto?: number;
    noProfissional: string;
    unidadeTi: number;
    unidadeDemandante: number;
    inStatus?: number;
    dataCriacaoInicio?: string;
    dataCriacaoFim?: string;
    palavrasChave?: string;
    celulaDesenv: number;
}

export interface SistemaListarOutput {
    
    sistema: string;
    areati: string;
    areadm: string;
    lidertec: string;
    po: string;
    status:string;
    isAtivo:boolean;
}