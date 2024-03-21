export interface Debt {
    launchId: string;
    walletId: string;
    description: string;
    isInstallment: boolean;
    timesInstallment: number;
    launchDate: Date;
    value: number;
    categoryId: string;
    userId: string;
    planId?: string;
    createdAt: Date;
    updatedAt: Date;
}