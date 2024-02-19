import { Autocomplete } from "../interfaces/autocomplete.interface";

export enum LaunchTypeEnum {
    CREDIT = 1,
    DEBIT = 2
}

export const LaunchTypeEnumDescription = new Map<string, string>([
    ['CREDIT', 'Crédito'],
    ['DEBIT', 'Débito']
]);

export const listLaunchTypeEnum: Autocomplete[] = Object.entries(LaunchTypeEnum).map(([key, value]) => {
    return { id: Number(value), name: LaunchTypeEnumDescription.get(key)} as Autocomplete;
}).filter((x) => x.name != null);
