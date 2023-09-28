import { TypeWalletEnum } from "../enum/type-wallet.enum";

export interface IWallet {
    id?: string;
    name?: string;
    type?: TypeWalletEnum;
}