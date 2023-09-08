export interface planBase {
     id?: string;
     name?: string;
     description?: string;
     totalValue?: number;
     expectedDateOfConclusion?: any;
     expectedValueMonthly?: number;
     type?: TypePlanEnum;
     userId?: string;
     userName?: string;
     createdAt?: any;
     updatedAt?: any;
     
     acumulatedTotal?: number;
     missingValueToGoal?: number;
     numberOfMonthsToGoal?: number;
     expectedNumberOfMonthsToGoal?: number;
     numberOfMonthsInvested?: number;
}

export enum TypePlanEnum {
    Short = 0,
    Mid = 1,
    Long = 2,
}

export const TypePlanDescription = new Map<string, string>([
    ['Short', 'Curto Prazo'],
    ['Mid', 'Médio Prazo'],
    ['Long', 'Longo Prazo']
]);
  
export const listTypePlan = Object.entries(TypePlanEnum).map(([key, value]) => {
    return { codigo: Number(value), nome: TypePlanDescription.get(key)};
}).filter((x) => x.nome != null);