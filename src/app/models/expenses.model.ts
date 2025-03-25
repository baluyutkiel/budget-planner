import { Account } from "./account.model";

export interface Expense {
    name: string,
    date: Date,
    category: ExpenseCategory,
    account?: Account | null,
    expenseType: ExpenseType
    cost: number
}

export enum ExpenseType {
    NV = 'Non-Variable Expense',
    V = 'Variable Expense'
}

export interface ExpenseCategory {
    name: string;
}