export interface launch {
    id?: string;
    walletId?: string;
    description?: string;
    isInstallment?: boolean;
    timesInstallment?: number;
    launchDate?: any;
    value?: number;
    categoryId?: string;
    categoryName?: string;
    userId?: string;
    userName?: string;
    planId?: string;
    createdAt?: any;
    updatedAt?: any;
    valueFormated?: string;
}

export interface launchInput {
    id?: string;
    walletId?: string;
    description?: string;
    isInstallment?: boolean;
    timesInstallment?: number;
    launchDate?: any;
    value?: number;
    categoryId?: string;
    planId?: string;
}