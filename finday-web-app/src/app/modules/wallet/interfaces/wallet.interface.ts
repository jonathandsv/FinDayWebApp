import { TypeWalletEnum } from "../enums/type-wallet.enum";

export interface Wallet {
    id?: string;
    name?: string;
    type?: TypeWalletEnum;
}

export interface WalletInput {
    id?: string;
    name?: string;
    type?: TypeWalletEnum;
}