import { Account } from "./account.model";

// todo change account to accountID
// todo add another one for bankName
export interface Expense {
    _id?: string,
    name: string,
    date: Date,
    category: ExpenseCategory,
    bankID: string,
    bankName: string,
    userID?: string,
    expenseType: ExpenseType
    cost: number,
    selected: boolean
}

export enum ExpenseType {
    NV = 'Non-Variable Expense',
    V = 'Variable Expense'
}

export interface ExpenseCategory {
    _id?: string,
    userId?: string,
    accountId?: string,
    name: string;
}