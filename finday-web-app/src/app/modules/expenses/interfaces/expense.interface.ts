import { ExpenseTypeEnum, ForecastEnum } from '../enums/expense-type.enum';

export interface Expense {
    id: string;
    name: string;
    description: string;
    type: ExpenseTypeEnum;
    value: number;
    isRecurrence: boolean;
    forecast: ForecastEnum;
    userId: string;
    createdAt: Date;
    updatedAt?: Date;
    recurrencePeriods: RecurrencePeriod[];
}

export interface RecurrencePeriod {
    id: string;
    expenseId?: string;
    startRecurrence: Date;
    endRecurrence: Date;
    createdAt: Date;
    updatedAt?: Date;
}