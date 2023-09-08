export interface launch {
    id?: string;
    walletId?: string;
    description?: string;
    isInstallment?: boolean;
    launchDate?: any;
    value?: number;
    categoryId?: string;
    userId?: string;
    userName?: string;
    planId?: string;
    createdAt?: any;
    updatedAt?: any;
}

export enum LaunchTypeEnum {
    Credit = 1,
    Debit = 2
}