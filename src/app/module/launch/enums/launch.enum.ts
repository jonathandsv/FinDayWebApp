export enum LaunchTypeEnum {
    CREDIT = 1,
    DEBIT = 2
}

export const LaunchTypeDescription = new Map<string, string>([
    ['CREDIT', 'Credit'],
    ['DEBIT', 'Debit']
]);

export const listaLaunchType = Object.entries(LaunchTypeEnum).map(([key, value]) => {
    return { codigo: Number(value), nome: LaunchTypeDescription.get(key) };
}).filter((x) => x.nome != null);