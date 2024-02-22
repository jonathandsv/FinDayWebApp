import { Autocomplete } from "../interfaces/autocomplete.interface";

export enum WalletTypeEnum {
    NONE = 0,
    CARD = 1,
    ACCOUNT = 2
}

export const WalletTypeEnumDescription = new Map<string, string>([
    ['NONE', 'Nennhum'],
    ['CARD', 'Cartão'],
    ['ACCOUNT', 'Conta'],
]);

export const listWalletTypeEnum: Autocomplete[] = Object.entries(WalletTypeEnum).map(([key, value]) => {
    return { id: Number(value), name: WalletTypeEnumDescription.get(key)} as Autocomplete;
})
.filter((x) => x.name != null)
.filter((x) => x.id != WalletTypeEnum.NONE);